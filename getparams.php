<?php  
function setHashCounts() {

	getmysql("CREATE TABLE IF NOT EXISTS canvashashcounts (
		canvashash bigint primary key,
		count int
	)");
	$rows=getmysql("SELECT canvashash,count(canvashash) as count from deepstat group by canvashash 
		having count>=2");
	echo count($rows),"<br>";
	foreach ($rows as $num=>$row) {
		$count=$row['count'];
		$canvashash=$row['canvashash'];
		 
		$rows1=getmysql("SELECT count(distinct ip) as count from deepstat where canvashash='$canvashash' ");
		
		$ipcount=$rows1[0]['count'];
		if ($ipcount<=1) {continue;}
		#echo "$canvashash $count $ipcount<br>";
		getmysql("INSERT IGNORE canvashashcounts set canvashash='$canvashash',count='$count'");
		getmysql("UPDATE canvashashcounts set count='$count' where canvashash='$canvashash' limit 1");
		$allcount++;
	}
	echo "хэшей: $allcount<br>";
}

function setBots() {
	$rows=getmysql("UPDATE deepstat set isbot=1 where score<0.6 

		&& not canvashash in (select canvashash from canvashashcounts where count>=2)

		&& not  jsondata->'$.params.logged' like '%VK%'
		&& not jsondata->'$.params.logged' like '%Google%'
		");
 echo "Боты установлены<br>";
}

function setRealUsers() {
	$rows=getmysql("UPDATE deepstat set isbot=0 where score>0.8
		&& canvashash in (select canvashash from canvashashcounts where count>=10)
		&& (jsondata->'$.params.logged' like '%VK%' ||
			   jsondata->'$.params.logged' like '%Gmail%' )
		
		");

	
}

function isBotOrNone() {
	setHashCounts();
	setBots();
	setRealUsers();
}


function getFirstDataFromRow($row) {
 	$header="isbot\thit_id\thtagent\thtlang\tremote_ip_present\tlocal_ip_present\trt_ip_eq_ip\tchromestring\tfonts_count\t";
 	$json=json_decode($row['alldata'],1);
	$htagent=$json['HTTP_USER_AGENT'];
	$htlang=$json['HTTP_ACCEPT_LANGUAGE'];
	$ip=$row['ip'];
	$hit_id=$row['id'];
	$rip=$json['rtcremote'];
	$rip=preg_replace("#Public: #",'',$rip);
	$fonts=$json['fonts'];
	$fontsCount=count(explode(",",$fonts));
	$isbot=$row['isbot'];
	if ($json['rtcremote'] && $json['rtcremote']!='n/a') {$remote_ip_present=1;} else {$remote_ip_present=0;}
	if ($json['rtclocal'] && $json['rtclocal']!='n/a') {$local_ip_present=1;} else {$local_ip_present=0;}
	if ($ip==$rip) {$rt_ip_eq_ip=1;} else {$rt_ip_eq_ip=0;}
	$chromestringPresent=0;
	if ($json['chromestring']) {$chromestringPresent=1;}
	$csv="$isbot\t$hit_id\t$htagent\t$htlang\t$remote_ip_present\t$local_ip_present\t$rt_ip_eq_ip\t$chromestringPresent\t$fontsCount\t";
	return [$header,$csv];
}

function getValFromJson($json,$param,$param1='') {
	$ret=$json[$param];
	if ($param1) {$ret=$json[$param][$param1];}
	if (!$ret) {$ret=0;}
	if ($ret=='null') {$ret=0;}
	return $ret;
}



function getNavStringDataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$nav=json_decode($json['navstring'],1);
    $params=['vendor','productSub','maxTouchPoints',
    'connection_effectiveType','connection_rtt','connection_downlink','connection_saveData','connection_type','connection_downlinkMax',
    'userActivation_hasBeenActive','userActivation_isActive',
    'plugins_length','mimeTypes_length',
    'hardwareConcurrency','deviceMemory','cookieEnabled','platform','language','languages','userAgent'
	];
    foreach ($params as $param) {
    	list($param1,$param2)=explode("_",$param);
    	$val=getValFromJson($nav,$param1,$param2);
    	if ($param=='languages') {
    		$ll=$nav['languages'];
    		if (gettype($ll)=='array') {$val=join(",",$ll);}
    	}
    	$header=$header."$param\t";
    	if ($param=='userAgent' && $val==$json['HTTP_USER_AGENT']) {
    		$val='same_as_ht';
    	}
    	$csv=$csv."$val\t";
    }

    #echo $csv,"\n";
    return [$header,$csv];
}

function getUserAgentDataFromRow($htagent) {
	$header="browser_name\tbrowser_version\tos_name\tos_version\tmodel\t";
	
	if (preg_match("#Safari/(\d+)#",$htagent,$d)) {
		$browser_name='Safari';
		
		$browser_version=$d[1];
	}

	if (preg_match("#Chrome/(\d+)#",$htagent,$d)) {
		$browser_name='Chrome';
		
		$browser_version=$d[1];
	} 

	if (preg_match("#Firefox/(\d+)#",$htagent,$d)) {
		$browser_name='Firefox';
		$browser_version=$d[1];
	}

	if (preg_match("#YaBrowser/(\d+)#",$htagent,$d)) {
		$browser_name='YaBrowser';
		$browser_version=$d[1];
	}

	if (preg_match("#YaSearchBrowser/(\d+)#",$htagent,$d)) {
		$browser_name='YaSearchBrowser';
		$browser_version=$d[1];
	}

	if (preg_match("#SamsungBrowser/(\d+)#",$htagent,$d)) {
		$browser_name='SamsungBrowser';
		$browser_version=$d[1];
	}

	if (!$browser_name) {$browser='other';}
	if (!$browser_version) {$browser_version=0;}
	$os_name='other';
	$os_version=0;
	$model='undefined';
	if (preg_match("#Android (\d+)[^;]*; ([^;/\)]+)#",$htagent,$d)) {
		$os_name='Android';
		$os_version=$d[1];
		$model=$d[2];
		if (preg_match("#^ru#",$model)) {$model='undefined';}
	}

	if (preg_match("#Windows NT (\d+)#",$htagent,$d)) {
		$os_name='Windows';
		$os_version=$d[1];
		
	}

	if (preg_match("#Linux x86_64#",$htagent,$d)) {
		$os_name='Linux';
		$os_version=0;
	}

	if (preg_match("#CPU iPhone OS (\d+)#",$htagent,$d)) {
		$os_name='iphoneOS';
		$os_version=$d[1];
		$model='iphone';
	}

	if (preg_match("#iPad; CPU OS (\d+)#",$htagent,$d)) {
		$os_name='iphoneOS';
		$os_version=$d[1];
		$model='ipad';
	}

	
	$csv="$browser_name\t$browser_version\t$os_name\t$os_version\t$model\t";
	#print "$htagent $csv\n";
	return [$header,$csv];
}

function getScreenDataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$sc=json_decode($json['screenstring'],1);

    $params=['availWidth','availHeight','width','height',
    'orientation_angle','orientation_type'
	];
    foreach ($params as $param) {
    	list($param1,$param2)=explode("_",$param);
    	$val=getValFromJson($sc,$param1,$param2);
    	
    	$header=$header."$param\t";
    	$csv=$csv."$val\t";
    }

    #echo $csv,"\n";
    return [$header,$csv];
}


function getWindowparamsDataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$sc=json_decode($json['windowparams'],1);
	
    $params=['devicePixelRatio','innerWidth','innerHeight','outerWidth','outerHeight',
    'clientWidth','clientHeight','scrollWidth'
	];
    foreach ($params as $param) {
    	list($param1,$param2)=explode("_",$param);
    	$val=getValFromJson($sc,$param1,$param2);
    	
    	$header=$header."$param\t";
    	$csv=$csv."$val\t";
    }

    #echo $csv,"\n";
    return [$header,$csv];
}


function getWindowparams1DataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$sc=json_decode($json['windowparams1'],1);
    $params=['visualViewport_offsetLeft','visualViewport_offsetTop',
    'visualViewport_pageLeft','visualViewport_pageTop',
    'visualViewport_width',
    'visualViewport_height','visualViewport_scale','locationbar_visible'
	];
    foreach ($params as $param) {
    	list($param1,$param2)=explode("_",$param);
    	$val=getValFromJson($sc,$param1,$param2);
    	if ($param=='locationbar_visible' && $val) {$val=1;}
    	$header=$header."$param\t";
    	$csv=$csv."$val\t";
    }

    #echo $csv,"\n";
    return [$header,$csv];
}

function getWebGLDataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$sc=json_decode($json['webglParams'],1);
    $params=['3379','3410','3412','3413','3414','3415','34024','34047','34076','34921','34930',
     '35661','36347','36348','36349',
    '7936','7937','7938','35724','37445','37446'
	];
    foreach ($params as $param) {
    	list($param1,$param2)=explode("_",$param);
    	$val=getValFromJson($sc,$param1,$param2);
    	if ($param=='locationbar_visible' && $val) {$val=1;}
    	$header=$header."$param\t";
    	$csv=$csv."$val\t";
    }

    #echo $csv,"\n";
    return [$header,$csv];
}


function getCanPlayGLDataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$sc=json_decode($json['canplay'],1);
	$types=['application_ogg','application_mp4','application_octet-stream','audio_3gpp','audio_3gpp2','audio_aac','audio_x-aac','audio_aiff','audio_x-aiff','audio_ac3','audio_basic','audio_flac','audio_x-flac','audio_mid','audio_midi','audio_x-midi','audio_mpeg','audio_x-mpeg','audio_mpegurl','audio_x-mpegurl','audio_mp4','audio_ogg','audio_wav','audio_wave','audio_x-wav','audio_x-pn-wav','video_3gpp','video_3gpp2','video_avi','video_mp4','video_x-mpeg','video_ogg','video_x-matroska','audio_webm','video_webm'];


	foreach ($types as $type) {
		$type1=preg_replace("#_#",'/',$type);
		$canplay=$sc[$type1]['all'];
		$can=0;
		if ($canplay=='maybe') {$can=0.5;}
		if ($canplay=='probably') {$can=1;}
		if ($canplay=='none') {$can=-1;}
		#echo "$type1 $type $can\n";
		$header=$header."$type\t";
    	$csv=$csv."$can\t";
	}

	
	return [$header,$csv];
}

function getFontsDataFromRow($row) {
	$json=json_decode($row['alldata'],1);
	$sc=$json['fonts'];
	$fonts=['Times New Roman','arial','Arial','Courier New','georgia','Georgia','times','Times','Courier','verdana','Verdana','Tahoma','tahoma','Roboto','Helvetica','Arial Black','Arial Narrow','Lucida Console','MS Serif','Microsoft Sans Serif','MS Sans Serif','Palatino Linotype','Palatino','Monaco','Baskerville','Comic Sans MS','Lucida Sans Unicode','Trebuchet MS','symbol','Symbol','Segoe UI Symbol','Microsoft JhengHei','Microsoft JhengHei Light','Microsoft JhengHei Regular','impact','Impact','Wingdings','webdings','Webdings','MS Gothic','marlett','Segoe UI Semibold','Marlett','Corbel','corbel','Segoe UI Light','Segoe UI','Segoe Script','Sylfaen','sylfaen','MS PGothic','Segoe Print','Gabriola','Segoe UI Black','calibri','Calibri','Ebrima','ebrima','Cambria Math','Corbel Light','Franklin Gothic Medium','Consolas','Microsoft YaHei','Calibri Light','Candara','Cambria','cambria','Constantia','Microsoft YaHei Light','Franklin Gothic Heavy','MS UI Gothic','SimSun','Mongolian Baiti','Candara Light','Microsoft Yi Baiti','Microsoft Himalaya','Microsoft Tai Le','Microsoft New Tai Lue','Microsoft PhagsPa','MV Boli','NSimSun','Malgun Gothic','SimSun-ExtB','PMingLiU-ExtB','MingLiU-ExtB','MingLiU_HKSCS-ExtB','FontAwesome','Microsoft JhengHei UI','Microsoft JhengHei UI Light','Microsoft JhengHei UI Regular','Microsoft YaHei UI','Microsoft YaHei UI Light','Nirmala UI','Gadugi','GADUGI','Segoe UI Emoji','Leelawadee UI','Myanmar Text','Sitka Heading','Sitka Subheading','Sitka Small','Sitka Text','Sitka Banner','Yu Gothic Light','Sitka Display','Yu Gothic','Yu Gothic Medium','Javanese Text','Yu Gothic Regular','Segoe UI Historic','Yu Gothic UI Light','Yu Gothic UI','Yu Gothic UI Semibold','Yu Gothic UI Regular','Segoe MDL2 Assets','MS Reference Sans Serif','Garamond','Book Antiqua','Century Gothic','Bookman Old Style','Century','CENTURY','MS Reference Specialty','Monotype Corsiva','MT Extra','Ink Free','Bahnschrift Light','Bahnschrift SemiBold','Bahnschrift','Baskerville Old Face','Mistral','MISTRAL','Tempus Sans ITC','Lucida Handwriting','Freestyle Script','Kristen ITC','Juice ITC','Brush Script MT','Lucida Bright','Berlin Sans FB','Stencil','STENCIL','Bell MT','Playbill','PLAYBILL','Onyx','Harrington','ONYX','Colonna MT','Wide Latin','Matura MT Script Capitals','Lucida Fax','Lucida Calligraphy','Old English Text MT','Ravie','RAVIE','JOKERMAN','Poor Richard','Jokerman','Snap ITC','Vivaldi','Showcard Gothic','Niagara Solid','Niagara Engraved','Parchment','Kunstler Script','Vladimir Script','Magneto','Chiller','CHILLER','Centaur','Informal Roman','CENTAUR','Algerian','Viner Hand ITC','Californian FB','Broadway','High Tower Text','Cooper Black','Bernard MT Condensed','Footlight MT Light','HoloLens MDL2 Assets','MS Outlook','PAPYRUS','Papyrus','Haettenschweiler','Bradley Hand ITC','French Script MT','Pristina','PRISTINA','Papyrus Condensed','Rockwell','Lucida Sans','Franklin Gothic Book','Century Schoolbook','Lucida Sans Typewriter','Agency FB','Gill Sans MT','Copperplate Gothic Light','Perpetua','Edwardian Script ITC','Curlz MT','Tw Cen MT','Gill Sans MT Condensed','Engravers MT','Rockwell Condensed','Perpetua Titling MT','Imprint MT Shadow','Goudy Old Style','Calisto MT','Microsoft Uighur','Felix Titling','Tw Cen MT Condensed','Maiandra GD','Blackadder ITC','Copperplate Gothic','Palace Script MT','Elephant','Goudy Stout','Gigi','GIGI','Castellar','Bodoni MT','Bodoni MT Black','Bodoni MT Condensed','Forte','FORTE','Leelawadee','RAGE','Arial Unicode MS','MS Mincho','PMingLiU','Gulim','Dotum','GulimChe','DotumChe','MingLiU_HKSCS','MingLiU','meiryo','Meiryo','Meiryo UI','DUBAI','Plantagenet Cherokee','Latha','MS PMincho','Estrangelo Edessa','Batang','Vijaya','SimHei','Rod','Aharoni','Narkisim','Miriam','Levenim MT','Gisha','FrankRuehl','David','Miriam Fixed','Mangal','Tunga','Raavi','Gautami','Shruti','Vrinda','Andalus','Kartika','BrowalliaUPC','Angsana New','Traditional Arabic','Browallia New','Arabic Typesetting','Simplified Arabic','BatangChe','Gungsuh','GungsuhChe','CordiaUPC','Sakkal Majalla','AngsanaUPC','EucrosiaUPC','Kokila','Simplified Arabic Fixed','Utsaah','Nyala','Aparajita','JasmineUPC','FreesiaUPC','Cordia New','IrisUPC','DilleniaUPC','Lao UI','Kalinga','LilyUPC','Iskoola Pota','Khmer UI','DaunPenh','KodchiangUPC','Vani','DokChampa','Euphemia'];
	foreach ($fonts as $font) {
		$header=$header."$font\t";
		if (strpos($sc,"$font,")!=false) {
			$csv=$csv."1\t";
			
		} else {$csv=$csv."0\t";}
	}
	return [$header,$csv];
}	



function getDataAntiBot($rows) {
	$no_header=1;
	$ret='';
	foreach ($rows as $num=>$row) {
		
		
		$json=json_decode($row['alldata'],1);
		
		$htagent=$json['HTTP_USER_AGENT'];
		if (preg_match("#bot#i",$htagent)) {continue;}
		list ($header,$csv_f)=getFirstDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getNavStringDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getUserAgentDataFromRow($htagent);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getScreenDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getWindowparamsDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getWindowparams1DataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getWebGLDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getCanPlayGLDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}

		list ($header,$csv_f)=getFontsDataFromRow($row);
		$csv=$csv.$csv_f;
		if ($no_header) {$header_all=$header_all.$header;}


		$csv=preg_replace("#\t$#","\n",$csv);
		if ($no_header) {
			$no_header=0;
			$header_all=preg_replace("#\t$#","\n",$header_all);
			$ret=$ret.$header_all;
		}

		$ret=$ret.$csv;
		
		$csv='';
		 
	

	}
	return $ret;
}


function showDataAntiBot($rows) {
	$data=getDataAntiBot($rows);
	echo $data;
}


function antibot_get_events($hit_id,$maxEvents) {
	global $wpdb;
	 $rows=$wpdb->get_results("SELECT * from antibot_eventstat where hit_id=$hit_id order by t");
	
    $offset=0;
    $eventCount=0;
    $nextPauseBegin=0;
    $allEvents='';
    foreach ($rows as $num=>$row) {
       
        $row=(array)$row;
        if ($eventCount>=$maxEvents) {break;}
        $eventCount++;
        $event=$row['event'];
        $json=json_decode($row['jsondata'],1);
        $params=['timeExec','count','dx','dy','dy_av','dt_av'];
        $eventParams="$event,";
        #echo "$event ",$json['timeBegin']-$t,"\n";
        $t=$json['timeBegin'];
        
        foreach ($params as $param) {
            $val=$json[$param];
            
            if ($param=='dy' && $event=='scroll') {

                $val=floor($json['pageYOffset']-$offset);
                $offset=$json['pageYOffset'];

            }
            if ($val>60000) {$val=60000;}
            if (!$val) {$val=0;}
            $eventParams=$eventParams."$val,";
        }
        $eventParams=preg_replace("#,$#",'',$eventParams);
        $dt=$json['timeBegin']-$nextPauseBegin;
        
        
        if ($eventCount<$maxEvents && $nextPauseBegin && $dt>3000) {
            $eventCount++;
            if ($dt>60000) {$dt=60000;}
            $allEvents=$allEvents."pause,$dt,0,0,0,0,0\t";
        }
        $allEvents=$allEvents."$eventParams\t";
        $nextPauseBegin=$json['timeBegin']+$json['timeExec'];
    }
    
    if ($eventCount<$maxEvents) {
        $need=$maxEvents-$eventCount;
        for ($i=1;$i<=$need;$i++) {
            $allEvents=$allEvents."zero,0,0,0,0,0,0\t";
        }
    }
   
    $allEvents=preg_replace("#\t$#",'',$allEvents);
    return $allEvents;
}



?>