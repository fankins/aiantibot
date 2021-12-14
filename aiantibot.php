<?php
/*
Plugin Name: AI Antibot
Plugin URI:
Description: Защита от ботов на основе нейронных сетей
Version: 0.1
Author: Константин
*/

define('ANTIBOT_PLUGIN_URL', WP_PLUGIN_URL . '/' . dirname(plugin_basename(__FILE__)) . '/');
define( 'ANTIBOT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
require_once( ANTIBOT_PLUGIN_DIR . 'getparams.php' );
add_action('init', 'antibot_init');
function antibot_init() {
    define( 'WP_DEBUG', true );
    define( 'WP_DEBUG_DISPLAY', true );
    wp_debug_mode() ;
    $action=$_REQUEST['a'];
    
    if (preg_match("#antibot_#",$action)) { if (function_exists($action)) {$action();exit;}}
    
    wp_enqueue_script( 'detectrtc',  ANTIBOT_PLUGIN_URL. 'detectrtc.js' );
    wp_enqueue_script( 'userparams',  ANTIBOT_PLUGIN_URL. 'userparams.js' );
    
  
   
}

function file_post_contents2($url, $data, $username = null, $password = null)
{
    $postdata = http_build_query($data);
   
    $opts = array('http' =>
        array(
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => $postdata
        ),
        "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    )
    );

    if($username && $password)
    {
        $opts['http']['header'] = ("Authorization: Basic " . base64_encode("$username:$password"));
    }

    $context = stream_context_create($opts);
    return file_get_contents($url, false, $context);
}


function antibot_recreate_tables() {
    global $wpdb;
    $wpdb->get_results("DROP TABLE antibot_stat");
    $wpdb->get_results("CREATE TABLE IF NOT EXISTS antibot_stat (
        id int auto_increment primary key,domain varchar(64) not null,
        hit_id int not null,
              ip varchar(32) not null,t int not null,
              page varchar(255) not null,
              referer text not null,canvashash bigint default 0,
              alldata mediumtext not null,
              index(hit_id),
              unique(t,ip,domain),index(ip),index(t),index(page),index(referer(255)),index(canvashash)
             )");
    $wpdb->get_results("DROP TABLE antibot_eventstat");
    $wpdb->get_results("CREATE TABLE IF NOT EXISTS antibot_eventstat 
          (id int auto_increment primary key,hit_id int not null,t int not null,
            event varchar(16),
            jsondata mediumtext not null,
            index(hit_id),index(event)
             )");
    
}


function antibot_save() {
    global $wpdb;
    #antibot_recreate_tables();
	$ip=$_SERVER['REMOTE_ADDR'];
	$data=$_POST['data'];
    $data=urldecode($data);
    $data=stripslashes($data);
    $json=json_decode($data,1);
    $json['HTTP_ACCEPT_LANGUAGE']=$_SERVER['HTTP_ACCEPT_LANGUAGE'];
    $json['HTTP_USER_AGENT']=$_SERVER['HTTP_USER_AGENT'];
    $hit_id=$json['hit_id'];
    echo "hit_id=$hit_id;\n";
    $page=$json['page'];
    $referer=$json['referer'];
    $data=json_encode($json,1);
    $t=time();
    $data=addslashes($data);
    $domain=$_SERVER['HTTP_HOST'];
    
    if (!$canvasHash) {$canvasHash=0;}
    if (!$ip) {exit;}

    $wpdb->get_results("DELETE from antibot_stat where ($t-t)>86400");
    $wpdb->get_results("DELETE from antibot_eventstat where ($t-t)>86400");

    $wpdb->get_results("INSERT IGNORE antibot_stat set hit_id=$hit_id,t=$t,domain='$domain',
          ip='$ip',page='$page',referer='$referer',canvashash=$canvasHash,
          alldata='$data'");
        
    
    echo "ip(antibot)=$ip\n";
      #$res=$wpdb->get_results("SELECT * from antibot_stat where hit_id=$hit_id");
      #print_r($res);
    exit;
}


function antibot_event_save() {
    global $wpdb;
    #antibot_recreate_tables();
    $data=$_POST['data'];
    $hit_id=$_REQUEST['hit_id'];
    echo "hit_id=$hit_id;\n";
    $event=$_REQUEST['event'];
    $data=urldecode($data);
    $data=stripslashes($data);
    $t=time();
     $wpdb->get_results("INSERT IGNORE antibot_eventstat set t=$t,hit_id=$hit_id,event='$event',
         jsondata='$data'");
       // $res=$wpdb->get_results("SELECT * from antibot_eventstat");
       // print_r($res);
    exit;
}

function antibot_get_params_by_hit_id() {
    global $wpdb;
    $hit_id=$_REQUEST['hit_id'];
    $res=$wpdb->get_results("SELECT * from antibot_stat where hit_id=$hit_id limit 1");
    $row=(array)$res[0];
    $rows[0]=$row;

    showDataAntiBot($rows);
    exit;
}

function antibot_get_events_by_hit_id() {
    global $wpdb;
    $maxEvents=200;
    $hit_id=$_REQUEST['hit_id'];

    $maxEvents=200;
    $htagent=$row['HTTP_USER_AGENT'];

    $header="id\thit_id\tplatform\tisbot\t";
    for ($i=1;$i<=$maxEvents;$i++) {$header=$header."event_$i\t";}
    $header=preg_replace("#\t$#",'',$header);
    echo $header,"\n";
    $res=$wpdb->get_results("SELECT * from antibot_stat where hit_id=$hit_id limit 1");
    $row=(array)$res[0];
    $json=json_decode($row['alldata'],1);
    $bdata=getUserAgentDataFromRow($json['HTTP_USER_AGENT']);
    $b=explode("\t",$bdata[1]);
    $platform=$b[2];
    $line=antibot_get_events($hit_id,$maxEvents);
    $id=1;
    $isbot=-1;
    echo "$id\t$hit_id\t$platform\t$isbot\t$line\n";
   
    exit;
}

function antibot_isbot() {
    global $wpdb;
    #1
    $res=$wpdb->get_results("SELECT * from antibot_stat  ");
    print_r($res);
}
#https://colab.research.google.com/drive/1nuFxwCfSwTiZzVsKwyJsz6Le4bHbvfkb#scrollTo=_S88HtCOARCC
?>