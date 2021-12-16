function detectIpAddresses(stream) {
                        DetectRTC.DetectLocalIPAddress(function(ipAddress, isPublic, isIpv4) {
                            if(!ipAddress) return;

                            // console.log(ipAddress, isPublic, isIpv4);
                            if (ipAddress.indexOf('Local') !== -1) {
                               rtclocal=ipAddress;
                              
                            } else {
                                rtcremote=ipAddress;
                              
                            }

                            if(!stream) return;

                            stream.getTracks().forEach(function(track) {
                                track.stop();
                            });

                            stream = null;
                        }, stream);
                    }
                    
var rtclocal;var rtcremote;                    
detectIpAddresses();

var leakSocialMediaAccounts = function(callback) {
    var platforms = [ {
        domain: "https://twitter.com",
        redirect: "/login?redirect_after_login=%2f..%2ffavicon.ico",
        name: "Twitter"
    }, {
        domain: "https://www.facebook.com",
        redirect: "/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
        name: "Facebook"
    }, {
        domain: "https://accounts.google.com",
        redirect: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=en&service=mail",
        name: "Gmail"
    },   {
        domain: "https://accounts.google.com",
        redirect: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Ffavicon.ico&uilel=3&hl=en&service=youtube",
        name: "Youtube"
    },      {
        domain: "https://vk.com",
        redirect: "/login?u=2&to=ZmF2aWNvbi5pY28-",
        name: "VK"
    },   {
        domain: "https://m.vk.com",
        redirect: "/login?u=2&to=ZmF2aWNvbi5pY28-",
        name: "VK-MOBILE"
    }
    ,
     {domain: "https://mail.yandex.ru/",
        redirect: "?retpath=https://mail.yandex.ru/favicon.ico?123",
        name: "Yandex"
    }
    ];

    platforms.forEach(function(network) {
        var img = document.createElement('img');
        img.referrerPolicy = 'no-referrer';
        img.src = network.domain + network.redirect;
        img.onload = function() {
            callback(network, true);
        };
        img.onerror = function() {
            callback(network, false);
        };
    });
};

  var isFirstLoggedIn = true;

    function displayResult(network, loggedIn) {
        var id = loggedIn ? 'loggedIn' : 'notLoggedIn';
       
        var url = network.domain + network.redirect;
        //console.log(url);
      
        if (loggedIn) {
            isFirstLoggedIn = false;
             
             logged_sites=logged_sites+" "+network['name'];
             
        }
     
       
    }
    var  logged_sites='';
    leakSocialMediaAccounts(displayResult);
                   
function saveparams() {
	var url='/count.php?rtclocal='+rtclocal+'&rtcremote='+rtcremote;
	//console.log(url);
jQuery.get(url,function(data) {});
}

  function recur(obj) {
  var result = {}, _tmp;
  for (var i in obj) {
    // enabledPlugin is too nested, also skip functions
    if (i === 'enabledPlugin' || typeof obj[i] === 'function') {
        continue;
    } else if (typeof obj[i] === 'object') {
        // get props recursively
        _tmp = recur(obj[i]);
        // if object is not {}
        if (Object.keys(_tmp).length) {
            result[i] = _tmp;
        }
    } else {
        // string, number or boolean
        result[i] = obj[i];
    }
  }
  return result;
}

function hashCode(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function canv() {
                        

var c=document.createElement('canvas');

var txt = "DeepStat <canvas> 1.0";
var ctx=c.getContext("2d");
ctx.textBaseline = "top";
ctx.font = "14px 'Arial'";
ctx.textBaseline = "alphabetic";
ctx.fillStyle = "#f60";
ctx.fillRect(125,1,62,20);
ctx.fillStyle = "#069";
ctx.fillText(txt, 2, 15);
ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
ctx.fillText(txt, 4, 17);
var dataURL = c.toDataURL();
canf=c.toDataURL.toString();

return dataURL;
}
var canf;
var can=canv();

// w=document.createElement('canvas');
// gl = w.getContext('webgl');
// gl.getParameter(37445);
//  gl.getSupportedExtensions().forEach(function(extName) {
//     console.log(extName);
//     var ext = gl.getExtension(extName);
//     for (var n in ext) {
//       console.log('  ' + n + ' = ' + ext[n]);
//     }
//   });
function webglParams(context,debuggl) {
    let w=document.createElement('canvas');
    let gl = w.getContext(context);
    if (debuggl) {let debugInfo =gl.getExtension('WEBGL_debug_renderer_info');}
    let ret={};
    
    let params=[3415,3414,36348,7936,37445,7937,3379,36347,34076,34024,3413,3412,3410,34047,34930,34921,35660,35661,36349,37446,7938,35724];
    for (let param of params) {
        let value=gl.getParameter(param);
        ret[param]=value;
        
    }
   
    return ret;
}

var webgl=1;
try {
webgl=webglParams('webgl',1);
}
catch(e) {console.log(e);}


function get_chrome() {
  var chrome=window.chrome;
 if (chrome)  {return JSON.stringify(chrome);} else {return '';}
}

function canPlay() {
    let obj = document.createElement('video');
    let ret={};
  let codecs={
        'application/ogg':['bogus'],
        'application/mp4':['bogus'],
        'application/octet-stream':['bogus'],
        'audio/3gpp':[],
        'audio/3gpp2':[],
        'audio/aac':[],
        'audio/x-aac':[],
        'audio/aiff':[],
        'audio/x-aiff':[],
        'audio/ac3':[],
        'audio/basic':[],
        'audio/flac':[],
        'audio/x-flac':[],
        'audio/mid':[],
        'audio/midi':[],
        'audio/x-midi':[],
        'audio/mpeg':[],
        'audio/x-mpeg':[],
        'audio/mpegurl':[],
        'audio/x-mpegurl':[],
        'audio/mp4':['bogus',
            'mp4a.40.2',
            'mp4a.40.02',
            'mp4a.40.5',
            'mp4a.40.05',
            'mp4a.40.29',
            'mp4a.40.42',
            'opus'
        ],
        'audio/ogg':['bogus','speex','flac','opus'],
        'audio/wav':['0','1','2'],
        'audio/wave':['0','1','2'],
        'audio/x-wav':['0','1','2'],
        'audio/x-pn-wav':['0','1','2'],
        'video/3gpp':['mp4v.20.8','mp4v.20.8, samr','samr'],
        'video/3gpp2':[],
        'video/avi':[],
        'video/mp4':['bogus',
        'mp4a.40.2',
           'avc1.42E01E',
           'avc1.58A01E',
           'avc1.4D401E',
            'mp4v.20.8',
           'mp4v.20.240',
           'avc1.64001E',
           'av01.0.04M.08',
            'mp4v.20.8, mp4a.40.2',
            'avc1.42E01E, mp4a.40.2',
            'avc1.58A01E, mp4a.40.2',
            'avc1.4D401E, mp4a.40.2',
            'mp4v.20.8, mp4a.40.2',
            'mp4v.20.240, mp4a.40.2',
            'avc1.64001E, mp4a.40.2',
            'av01.0.04M.08',
            'opus',
            'hev1','hev1.1.6.L93.B0','hvc1','hvc1.1.6.L93.B0','av01','av01.0.04M.08',
            'av01.0.04M.08, mp4a.40.2','av01.0.04M.08, opus'
       ],
        'video/x-mpeg':[],
        'video/ogg':['theora','vorbis','dirac','theora, vorbis','theora, speex','dirac, vorbis'],
        'video/x-matroska':['theora, vorbis'],
        'audio/webm':['vorbis'],
        'video/webm': ['vorbis','vp8','vp8.0','vp8, vorbis','vp9','vp9.0','vp09','vp09.00.10.08']
}
    for( let type in codecs) {
        let can=obj.canPlayType(type);
        if (!can) {can='none';}
        ret[type]={};
        ret[type]['all']=can;
        let codecsarr=codecs[type];
        for (codec of codecsarr) {
        let str=`${type}; codecs="${codec}"`;
        let can=obj.canPlayType(str);
        codec=codec.trim();
        codec=codec.replace(", ",",");
        if (!can) {can='none';}
        ret[type][codec]=can;
        }
    }
  return ret;
}

function GetTimeInfo() {
    var d=new Date();
    let r={};
    r.toLocaleString=d.toLocaleString();
    r.time=d.getTime();
    r.getTimezoneOffset=d.getTimezoneOffset();
    r.toLocaleDateString=d.toLocaleDateString();
    r.toString=d.toString();
    return JSON.stringify(r);
}






function sizesParams() {
    let ret={};
    ret.devicePixelRatio=window.devicePixelRatio;
    ret.innerWidth=window.innerWidth;
    ret.innerHeight=window.innerHeight;
    ret.outerWidth=window.outerWidth;
    ret.outerHeight=window.outerHeight;
    ret.clientWidth=document.documentElement.clientWidth;
    ret.clientHeight=document.documentElement.clientHeight;
    ret.scrollWidth = document.documentElement.scrollWidth;
    ret.scrollHeight = document.documentElement.scrollHeight;
    return ret;
}

function windowParams() {
    let ret={};
    if (window.visualViewport) {ret.visualViewport=window.visualViewport;}
    if (window.locationbar) {ret.locationbar=window.locationbar;}
    if (window.menubar) {ret.locationbar=window.menubar;}
     if (window.personalbar) {ret.locationbar=window.personalbar;}
    

    return ret;
}

function GetDeepSomeParams() {
    let ret={};
    ret.hasFocus=document.hasFocus();
    ret.documentHidden=document.hidden;
    if (BarProp) {ret.BarPropVisible=BarProp.visible;}
    ret.visibilityState=document.visibilityState;
  
    var s=Object.getOwnPropertyDescriptor(Screen.prototype, "availHeight").get.toString();
    
    ret.func1=s;
    return ret;
}

function detectFonts() {
var ret='';
var count=0;
var fontsstring='AGENCYB;AGENCYR;ALGER;ANTQUAB;ANTQUABI;ANTQUAI;ARIALN;ARIALNB;ARIALNBI;ARIALNI;ARLRDBD;Arimo;BASKVILL;BAUHS93;BELL;BELLB;BELLI;BERNHC;BKANT;BOD_B;BOD_BI;BOD_BLAI;BOD_BLAR;BOD_CB;BOD_CBI;BOD_CI;BOD_CR;BOD_I;BOD_PSTC;BOD_R;BOOKOS;BOOKOSB;BOOKOSBI;BOOKOSI;BRADHITC;BRITANIC;BRLNSB;BRLNSDB;BRLNSR;BROADW;BRUSHSCI;BSSYM7;CALIFB;CALIFI;CALIFR;CALIST;CALISTB;CALISTBI;CALISTI;CASTELAR;CENSCBK;CENTAUR;CENTURY;CHILLER;COLONNA;COOPBL;COPRGTB;COPRGTL;CURLZ___;Candara;Candarab;Candarai;Candaraz;DUBAI;DejaVuSans;DejaVuSansCondensed;DejaVuSansMono;DejaVuSerif;DejaVuSerifCondensed;ELEPHNT;ELEPHNTI;ENGR;ERASBD;ERASDEMI;ERASLGHT;ERASMD;FELIXTI;FORTE;FRABK;FRABKIT;FRADM;FRADMCN;FRADMIT;FRAHV;FRAHVIT;FRAMDCN;FREESCPT;FRSCRIPT;FTLTLT;FontAwesome;GADUGI;GADUGIB;GARA;GARABD;GARAIT;GIGI;GILBI___;GILB____;GILC____;GILI____;GILLUBCD;GILSANUB;GIL_____;GLECB;GLSNECB;GOTHIC;GOTHICB;GOTHICBI;GOTHICI;GOUDOS;GOUDOSB;GOUDOSI;GOUDYSTO;Gabriola;GenBasB;GenBasBI;GenBasI;GenBasR;GenBkBasB;GenBkBasBI;GenBkBasI;GenBkBasR;GlobalMonospace;GlobalSansSerif;GlobalSerif;GlobalUserInterface;HARLOWSI;HARNGTON;HATTEN;HTOWERT;HTOWERTI;IMPRISHA;INFROMAN;ITCBLKAD;ITCEDSCR;ITCKRIST;JOKERMAN;JUICE___;KUNSTLER;LATINWD;LBRITE;LBRITED;LBRITEDI;LBRITEI;LCALLIG;LEELAWAD;LEELAWDB;LFAX;LFAXD;LFAXDI;LFAXI;LHANDW;LSANS;LSANSD;LSANSDI;LSANSI;LTYPE;LTYPEB;LTYPEBO;LTYPEO;MAGNETOB;MAIAN;MATURASC;MISTRAL;MOD20;MSJH;MSJHBD;MSUIGHUB;MSUIGHUR;MSYH;MSYHBD;MTCORSVA;MTEXTRA;NIAGENG;NIAGSOL;NIRMALA;NIRMALAB;OCRAEXT;OLDENGL;ONYX;OUTLOOK;PALSCRI;PAPYRUS;PARCHM;PERBI___;PERB____;PERI____;PERTIBD;PERTILI;PER_____;PLAYBILL;POORICH;PRISTINA;RAGE;RAVIE;REFSAN;REFSPCL;ROCCB___;ROCC____;ROCK;ROCKB;ROCKBI;ROCKEB;ROCKI;RobotoCondensed;SCHLBKB;SCHLBKBI;SCHLBKI;SCRIPTBL;SEGOEUISL;SHOWG;SNAP____;STENCIL;StaticCache;TCBI____;TCB_____;TCCB____;TCCEB;TCCM____;TCMI____;TCM_____;TEMPSITC;VINERITC;VIVALDII;VLADIMIR;WINGDNG2;WINGDNG3;app775;app850;app852;app855;app857;app866;app932;app936;app949;app950;arial;arialbd;arialbi;ariali;ariblk;c8514fix;c8514oem;c8514sys;calibri;calibrib;calibrii;calibril;calibrili;calibriz;cambria;cambriab;cambriai;cambriaz;cga40737;cga40850;cga40852;cga40857;cga40866;cga40869;cga40woa;cga80737;cga80850;cga80852;cga80857;cga80866;cga80869;cga80woa;comic;comicbd;comici;comicz;consola;consolab;consolai;consolaz;constan;constanb;constani;constanz;corbel;corbelb;corbeli;corbelz;coue1255;coue1256;coue1257;couf1255;couf1256;couf1257;cour;courbd;courbi;coure;couree;coureg;courer;couret;courf;courfe;courfg;courfr;courft;couri;cvgafix;cvgasys;desktop;dos737;dos869;dosapp;ebrima;ebrimabd;ega40737;ega40850;ega40852;ega40857;ega40866;ega40869;ega40woa;ega80737;ega80850;ega80852;ega80857;ega80866;ega80869;ega80woa;fms_metadata;framd;framdit;georgia;georgiab;georgiai;georgiaz;h8514fix;h8514oem;h8514sys;hvgafix;hvgasys;impact;j8514fix;j8514oem;j8514sys;jsmalle;jsmallf;jvgafix;jvgasys;l_10646;lucon;marlett;meiryo;meiryob;micross;modern;msgothic;msjh;msjhbd;msyh;msyhbd;opens___;pala;palab;palabi;palai;plantc;roman;s8514fix;s8514oem;s8514sys;script;segoepr;segoeprb;segoesc;segoescb;segoeui;segoeuib;segoeuii;segoeuil;segoeuiz;seguisb;seguisym;sere1255;sere1256;sere1257;serf1255;serf1256;serf1257;serife;serifee;serifeg;serifer;serifet;seriff;seriffe;seriffg;seriffr;serifft;smae1255;smae1256;smae1257;smaf1255;smaf1256;smaf1257;smalle;smallee;smalleg;smaller;smallet;smallf;smallfe;smallfg;smallfr;smallft;ssee1255;ssee1256;ssee1257;ssee874;ssef1255;ssef1256;ssef1257;ssef874;sserife;sserifee;sserifeg;sserifer;sserifet;sseriff;sseriffe;sseriffg;sseriffr;sserifft;svgafix;svgasys;sylfaen;symbol;tahoma;tahomabd;teamviewer15;times;timesbd;timesbi;timesi;trebuc;trebucbd;trebucbi;trebucit;verdana;verdanab;verdanai;verdanaz;vga737;vga775;vga850;vga852;vga855;vga857;vga860;vga861;vga863;vga865;vga866;vga869;vga932;vga936;vga949;vga950;vgaf1255;vgaf1256;vgaf1257;vgaf874;vgafix;vgafixe;vgafixg;vgafixr;vgafixt;vgaoem;vgas1255;vgas1256;vgas1257;vgas874;vgasys;vgasyse;vgasysg;vgasysr;vgasyst;webdings;wingding;Apple Braille Outline 6 Dot;Apple Braille Outline 8 Dot;Apple Braille Pinpoint 6 Dot;Apple Braille Pinpoint 8 Dot;Apple Braille;Apple Color Emoji;Apple Symbols;AppleSDGothicNeo;AquaKana;ArabicUIDisplay;ArabicUIText;ArialHB;Avenir Next Condensed;Avenir Next;Avenir;Courier;GeezaPro;Geneva;HelveLTMM;Helvetica;HelveticaNeue;HelveticaNeueDeskInterface;Hiragino Sans GB;Keyboard;Kohinoor;KohinoorBangla;KohinoorTelugu;LastResort;LucidaGrande;MarkerFelt;Menlo;Monaco;Noteworthy;NotoNastaliq;Optima;Palatino;PingFang;SFCompactDisplay;SFCompactRounded;SFCompactText;SFNSDisplay;SFNSDisplayCondensed;SFNSSymbols;SFNSText;SFNSTextCondensed;SFNSTextItalic;STHeiti Light;STHeiti Medium;Symbol;Thonburi;Times;TimesLTMM;ZapfDingbats;AndroidClock;AndroidClock_Highlight;AndroidClock_Solid;AndroidEmoji;AnjaliNewLipi;CarroisGothicSC;Clock2016;Clock2017L;Clock2017R;Clockopia;ComingSoon;CutiveMono;DFP;DFP_Sc_Sans_Heue30_103;DancingScript;DefaultFont;DroidNaskh;DroidNaskhUI;DroidSans;DroidSansArmenian;DroidSansDevanagari;DroidSansEthiopic;DroidSansFallback;DroidSansGeorgian;DroidSansHebrew;DroidSansMono;DroidSansTamil;DroidSansThai;DroidSerif;FangZhengLTH;Lohit;MTLmr3m;NanumGothic;NokiaPureS40ARAB_Bd;NokiaPureS40ARAB_Rg;NokiaPureS40ARMN_Bd;NokiaPureS40ARMN_Rg;NokiaPureS40BENG_Bd;NokiaPureS40BENG_Rg;NokiaPureS40CYRL_Bd;NokiaPureS40CYRL_Rg;NokiaPureS40DEVA_Bd;NokiaPureS40DEVA_Rg;NokiaPureS40ETHI_Bd;NokiaPureS40ETHI_Rg;NokiaPureS40GEOR_Bd;NokiaPureS40GEOR_Rg;NokiaPureS40GREK_Bd;NokiaPureS40GREK_Rg;NokiaPureS40HANS_Bd;NokiaPureS40HANS_Rg;NokiaPureS40HANT_Bd;NokiaPureS40HANT_Rg;NokiaPureS40HEBR_Bd;NokiaPureS40HEBR_Rg;NokiaPureS40KHMR_Bd;NokiaPureS40KHMR_Rg;NokiaPureS40KNDA_Bd;NokiaPureS40KNDA_Rg;NokiaPureS40LATN_Bd;NokiaPureS40LATN_Lt;NokiaPureS40LATN_Rg;NokiaPureS40SINH_Bd;NokiaPureS40SINH_Rg;NokiaPureS40TAML_Bd;NokiaPureS40TAML_Rg;NokiaPureS40THAI_Bd;NokiaPureS40THAI_Rg;NotoColorEmoji;NotoNaskhArabic;NotoNaskhArabicUI;NotoSansArmenian;NotoSansBalinese;NotoSansBamum;NotoSansBatak;NotoSansBengali;NotoSansBengaliUI;NotoSansBuginese;NotoSansBuhid;NotoSansCJK;NotoSansCanadianAboriginal;NotoSansCham;NotoSansCherokee;NotoSansCoptic;NotoSansDevanagari;NotoSansDevanagariUI;NotoSansEthiopic;NotoSansGeorgian;NotoSansGlagolitic;NotoSansGujarati;NotoSansGujaratiUI;NotoSansGurmukhi;NotoSansGurmukhiUI;NotoSansHanunoo;NotoSansHebrew;NotoSansJavanese;NotoSansKannada;NotoSansKannadaUI;NotoSansKayahLi;NotoSansKhmer;NotoSansKhmerUI;NotoSansLao;NotoSansLaoUI;NotoSansLepcha;NotoSansLimbu;NotoSansLisu;NotoSansMalayalam;NotoSansMalayalamUI;NotoSansMandaic;NotoSansMeeteiMayek;NotoSansMongolian;NotoSansMyanmar;NotoSansMyanmarUI;NotoSansNKo;NotoSansNewTaiLue;NotoSansOlChiki;NotoSansOriya;NotoSansOriyaUI;NotoSansRejang;NotoSansSaurashtra;NotoSansSinhala;NotoSansSundanese;NotoSansSylotiNagri;NotoSansSymbols;NotoSansSyriacEstrangela;NotoSansTagbanwa;NotoSansTaiLe;NotoSansTaiTham;NotoSansTaiViet;NotoSansTamil;NotoSansTamilUI;NotoSansTelugu;NotoSansTeluguUI;NotoSansThaana;NotoSansThai;NotoSansThaiUI;NotoSansTibetan;NotoSansTifinagh;NotoSansVai;NotoSansYi;NotoSerif;Padauk;Quivira;Roboto;RobotoNum;SECCJK;SECCutiveMono;SECFallback;SECRobotoCondensed;SECRobotoLight;SST;SamsungColorEmoji;SamsungKhmerUI;SamsungKorean;SamsungMyanmarUI;SamsungMyanmarZawgyiUI;SamsungNeoNum;SamsungNeoNumCond;SamsungThaiUI;SoMCSans;Zawgyi;hkgcsh00d;lohit_or;lohit_pa;WenQuanYi Zen Hei Sharp;WenQuanYi Zen Hei Mono;WenQuanYi Zen Hei;WenQuanYi Micro Hei Mono;WenQuanYi Micro Hei;Waree;VL Gothic;URW Gothic;URW Bookman;Tinos;Times New Roman;STIX;PakType Naskh Basic;PT Sans Narrow;PT Sans;P052;Overpass;Nuosu SIL;Noto Color Emoji;Nimbus Sans Narrow;Nimbus Sans;Nimbus Roman;Nimbus Mono PS;NanumGothicExtraBold;Meera;Madan;Lohit Telugu;Lohit Tamil;Lohit Punjabi;Lohit Oriya;Lohit Nepali;Lohit Marathi;Lohit Malayalam;Lohit Kannada;Lohit Gujarati;Lohit Devanagari;Lohit Bengali;Lohit Assamese;Liberation Serif;Liberation Sans Narrow;Liberation Sans;Liberation Mono;LKLUG;Khmer OS System;Khmer OS Content;Khmer OS;Jomolhari;FreeSerif;FreeSans;FreeMono;DejaVu Serif Condensed;DejaVu Serif;DejaVu Sans Mono;DejaVu Sans Light;DejaVu Sans Condensed;DejaVu Sans;D050000L;Cousine;Courier New;Carlito;Cantarell;Cambria;Calibri;Caladea;C059;Arial;Abyssinica SIL;AR PL UMing TW MBE;AR PL UMing TW;AR PL UMing HK;AR PL UMing CN;;Yu Gothic UI Semibold;Yu Gothic UI Regular;Yu Gothic UI Light;Yu Gothic UI;Yu Gothic Regular;Yu Gothic Medium;Yu Gothic Light;Yu Gothic;Wingdings;Wide Latin;Webdings;Vladimir Script;Vivaldi;Viner Hand ITC;Verdana;Tw Cen MT Condensed;Tw Cen MT;Trebuchet MS;Tempus Sans ITC;Tahoma;Sylfaen;Stencil;Snap ITC;Sitka Text;Sitka Subheading;Sitka Small;Sitka Heading;Sitka Display;Sitka Banner;SimSun-ExtB;SimSun;Showcard Gothic;Segoe UI Symbol;Segoe UI Semibold;Segoe UI Light;Segoe UI Historic;Segoe UI Emoji;Segoe UI Black;Segoe UI;Segoe Script;Segoe Print;Segoe MDL2 Assets;Rockwell Condensed;Rockwell;Ravie;Pristina;Poor Richard;Playbill;Perpetua Titling MT;Perpetua;Parchment;Papyrus Condensed;Papyrus;Palatino Linotype;Palace Script MT;PMingLiU-ExtB;Onyx;Old English Text MT;Nirmala UI;Niagara Solid;Niagara Engraved;NSimSun;Myanmar Text;Monotype Corsiva;Mongolian Baiti;Mistral;MingLiU_HKSCS-ExtB;MingLiU-ExtB;Microsoft Yi Baiti;Microsoft YaHei UI Light;Microsoft YaHei UI;Microsoft YaHei Light;Microsoft YaHei;Microsoft Tai Le;Microsoft Sans Serif;Microsoft PhagsPa;Microsoft New Tai Lue;Microsoft JhengHei UI Regular;Microsoft JhengHei UI Light;Microsoft JhengHei UI;Microsoft JhengHei Regular;Microsoft JhengHei Light;Microsoft JhengHei;Microsoft Himalaya;Matura MT Script Capitals;Marlett;Malgun Gothic;Maiandra GD;Magneto;MV Boli;MT Extra;MS UI Gothic;MS Serif;MS Sans Serif;MS Reference Specialty;MS Reference Sans Serif;MS PGothic;MS Outlook;MS Gothic;Lucida Sans Unicode;Lucida Sans Typewriter;Lucida Sans;Lucida Handwriting;Lucida Fax;Lucida Console;Lucida Calligraphy;Lucida Bright;Leelawadee UI;Kunstler Script;Kristen ITC;Juice ITC;Jokerman;Javanese Text;Ink Free;Informal Roman;Imprint MT Shadow;Impact;HoloLens MDL2 Assets;High Tower Text;Harrington;Haettenschweiler;Goudy Stout;Goudy Old Style;Gill Sans MT Condensed;Gill Sans MT;Gigi;Georgia;Garamond;Gadugi;French Script MT;Freestyle Script;Franklin Gothic Medium;Franklin Gothic Heavy;Franklin Gothic Book;Forte;Footlight MT Light;Felix Titling;Engravers MT;Elephant;Edwardian Script ITC;Ebrima;Curlz MT;Corbel Light;Corbel;Copperplate Gothic Light;Copperplate Gothic;Cooper Black;Constantia;Consolas;Comic Sans MS;Colonna MT;Chiller;Century Schoolbook;Century Gothic;Century;Centaur;Castellar;Candara Light;Cambria Math;Calisto MT;Californian FB;Calibri Light;Brush Script MT;Broadway;Bradley Hand ITC;Bookman Old Style;Book Antiqua;Bodoni MT Condensed;Bodoni MT Black;Bodoni MT;Blackadder ITC;Bernard MT Condensed;Berlin Sans FB;Bell MT;Baskerville Old Face;Bahnschrift SemiBold;Bahnschrift Light;Bahnschrift;Arial Narrow;Arial Black;Algerian;Agency FB;Baskerville;Roboto Condensed;Plantagenet Cherokee;OpenSymbol;Microsoft Uighur;Meiryo UI;Meiryo;Leelawadee;Gentium Book Basic;Gentium Basic;MS Mincho;Arial Unicode MS;Vrinda;Vijaya;Vani;Utsaah;Tunga;Traditional Arabic;Simplified Arabic Fixed;Simplified Arabic;SimHei;Shruti;Shonar Bangla;Sakkal Majalla;Rod;Raavi;PMingLiU;Nyala;Narkisim;MoolBoran;Miriam Fixed;Miriam;MingLiU_HKSCS;MingLiU;Mangal;MS PMincho;LilyUPC;Levenim MT;Latha;Lao UI;Kokila;KodchiangUPC;Khmer UI;Kartika;Kalinga;KaiTi;JasmineUPC;Iskoola Pota;IrisUPC;GungsuhChe;Gungsuh;GulimChe;Gulim;Gisha;Gautami;FreesiaUPC;FrankRuehl;FangSong;Euphemia;EucrosiaUPC;Estrangelo Edessa;DotumChe;Dotum;DokChampa;DilleniaUPC;David;DaunPenh;DFKai-SB;CordiaUPC;Cordia New;BrowalliaUPC;Browallia New;BatangChe;Batang;Arabic Typesetting;Aparajita;AngsanaUPC;Angsana New;Andalus;Aharoni;Square721 BT;Lato;Trajan Pro;Tekton Pro;Stencil Std;Rosewood Std Regular;Prestige Elite Std;Poplar Std;Orator Std;OCR A Std;Nueva Std;Myriad Pro Light;Myriad Pro;Myriad Hebrew;Myriad Arabic Semibold;Myriad Arabic Light;Myriad Arabic Black;Myriad Arabic;Minion Pro;Mesquite Std;Lithos Pro Regular;Letter Gothic Std;Hobo Std;Giddyup Std;Cooper Std Black;Charlemagne Std;Chaparral Pro Light;Chaparral Pro;Brush Script Std;Blackoak Std;Birch Std;Adobe Naskh Medium;Adobe Hebrew;Adobe Garamond Pro;Adobe Devanagari;Adobe Caslon Pro;Adobe Arabic;PT Serif;Comfortaa Light;Comfortaa;Eurostile;WP MultinationalB Roman;WP MultinationalB Helve;WP MultinationalB Courier;WP MultinationalA Roman;WP MultinationalA Helve;WP MultinationalA Courier;WP Hebrew David;WP Greek Helve;WP Greek Courier;WP Greek Century;WP ArabicScript Sihafa;WP Arabic Sihafa;Swis721 Lt BT;Swis721 Hv BT;Swis721 Blk BT;Swis721 BT;OCR-A BT;Futura Md BT;Freehand521 BT;Calligraph;Vineta BT;UniversalMath1 BT;Txt;TechnicLite;TechnicBold;Technic;Symusic;Symeteo;Symath;Symap;Syastro;Swis721 LtEx BT;Swis721 LtCn BT;Swis721 Ex BT;Swis721 Cn BT;Swis721 BlkOul BT;Swis721 BlkEx BT;Swis721 BlkCn BT;Swis721 BdOul BT;SuperFrench;Stylus BT;Simplex;ScriptS;ScriptC;SansSerif;Romantic;RomanT;RomanS;RomanD;RomanC;PanRoman;Monotxt;Monospac821 BT;ItalicT;ItalicC;Italic;ISOCTEUR;ISOCT3;ISOCT2;ISOCT;ISOCPEUR;ISOCP3;ISOCP2;ISOCP;GreekS;GreekC;GothicI;GothicG;GothicE;GENISO;GDT;EuroRoman;Dutch801 XBd BT;Dutch801 Rm BT;CountryBlueprint;Complex;CommercialScript BT;CommercialPi BT;CityBlueprint;BankGothic Md BT;BankGothic Lt BT;AmdtSymbols;AcadEref;AMGDT;AIGDT;Noto Serif;Noto Sans;Montserrat Thin;Montserrat SemiBold;Montserrat Medium;Montserrat Light;Montserrat ExtraLight;Montserrat ExtraBold;Montserrat Black;Source Code Pro Semibold;Source Code Pro Medium;Source Code Pro Light;Source Code Pro ExtraLight;Source Code Pro Black;Source Code Pro;Scheherazade;Noto Serif Lao;Noto Serif Hebrew;Noto Serif Georgian;Noto Serif Armenian;Noto Sans Lisu;Noto Sans Lao;Noto Sans Hebrew;Noto Sans Georgian;Noto Sans Armenian;Noto Sans Arabic UI;Noto Sans Arabic;Noto Naskh Arabic UI;Noto Naskh Arabic;Noto Mono;Noto Kufi Arabic;Nachlieli CLM;Miriam Mono CLM;Miriam CLM;KacstOffice;KacstBook;Frank Ruehl CLM;DejaVu Math TeX Gyre;David CLM;Amiri Quran;Amiri;Yu Mincho Regular;Yu Mincho Light;Yu Mincho Demibold;Yu Mincho;Urdu Typesetting;Aldhabi;Optima Regular;Hoefler Text Ornaments;Hoefler Text Black;Hoefler Text;Helvetica Light;Droid Serif;Copyist;Bickham Script Two;Apple Chancery;Alexandra Script;Tw Cen MT Condensed Extra Bold;TeamViewer8;Script MT Bold;Rockwell Extra Bold;Rage Italic;OCR A Extended;Harlow Solid Italic;Gloucester MT Extra Condensed;Gill Sans Ultra Bold Condensed;Gill Sans Ultra Bold;Gill Sans MT Ext Condensed Bold;Franklin Gothic Medium Cond;Franklin Gothic Demi Cond;Franklin Gothic Demi;Eras Medium ITC;Eras Light ITC;Eras Demi ITC;Eras Bold ITC;Copperplate Gothic Bold;Britannic Bold;Bodoni MT Poster Compressed;Berlin Sans FB Demi;Arial Rounded MT Bold;News Gothic MT;WP CyrillicB;WP CyrillicA;Eccentric Std;Bickham Script Pro Semibold;Bickham Script Pro Regular;Bell Gothic Std Light;Bell Gothic Std Black;Arno Pro Subhead;Arno Pro SmText;Arno Pro Display;Arno Pro Caption;Arno Pro;Ubuntu Thin;Ubuntu Light;Ubuntu Condensed;Ubuntu;UD Digi Kyokasho NP-R;UD Digi Kyokasho NP-B;UD Digi Kyokasho NK-R;UD Digi Kyokasho NK-B;UD Digi Kyokasho N-R;UD Digi Kyokasho N-B;Montserrat;Clarendon Lt BT;Clarendon Blk BT;Clarendon BT;BIZ UDPMincho Medium;BIZ UDPMincho;BIZ UDPGothic;BIZ UDMincho Medium;BIZ UDMincho;BIZ UDGothic;Annabelle;Andika;Vemana2000;Uroob;Umpush;Ubuntu Mono;Tlwg Typo;Tlwg Typist;Tlwg Typewriter;Tlwg Mono;Tibetan Machine Uni;Suruma;Sawasdee;Sarai;Samyak Tamil;Samyak Malayalam;Samyak Gujarati;Samyak Devanagari;Samanata;Sahadeva;Saab;Rekha;RaghuMalayalam;Rachana;Purisa;Pothana2000;Phetsarath OT;Pagul;Padauk Book;Noto Serif CJK TC;Noto Serif CJK SC;Noto Serif CJK KR;Noto Serif CJK JP;Noto Sans Mono CJK TC;Noto Sans Mono CJK SC;Noto Sans Mono CJK KR;Noto Sans Mono CJK JP;Noto Sans Mono CJK HK;Noto Sans CJK TC;Noto Sans CJK SC;Noto Sans CJK KR;Noto Sans CJK JP;Noto Sans CJK HK;Norasi;Navilu;Nakula;Mukti Narrow Bold;Mukti Narrow;Mitra Mono;Manjari Thin;Manjari;Loma;Lohit Tamil Classical;Lohit Odia;Lohit Gurmukhi;Likhan;Laksaman;Kinnari;Keraleeyam;Karumbi;Kalimati;Kalapi;KacstTitleL;KacstTitle;KacstScreen;KacstQurn;KacstPoster;KacstPen;KacstOne;KacstNaskh;KacstLetter;KacstFarsi;KacstDigital;KacstDecorative;KacstArt;Jamrul;Gubbi;Garuda;Gargi;Dyuthi;Droid Sans Fallback;Chilanka;Chandas;AnjaliOldLipi;Ani;Ceremonious Two;Amadeus';
var fonts=fontsstring.split(";");
var all=fonts.length;
fonts.forEach(function(item) {
    var detected=false;
    try {detected=document.fonts.check('12px '+item);}catch (e) {}
    if (detected) {ret=ret+item+',';count++;}
})
if (count>all*0.5) return 'too much';
//console.log(count);
return ret;
}



 function saveparams2() {
    
    var _navigator = recur(navigator);
    var now = new Date();

    navstring=JSON.stringify(_navigator);
    plugins=JSON.stringify(recur(navigator.plugins));
    chromestring=get_chrome();
    var h=hashCode(can);
    var data={};
    if (!rtclocal) {rtclocal='n/a';}
    if (!rtcremote) {rtcremote='n/a';}
    data.canvasHash=h;
    data.rtclocal=rtclocal;
    data.rtcremote=rtcremote;
    data.page=window.location.href;
    data.referer=document.referrer;
    let debug=0;
    if (data.page.indexOf('debug=1')>0) {debug=1;}
    data.navstring=navstring;
    data.chromestring=chromestring;
    data.logged=logged_sites;
   
    var _screen = recur(screen);
    if (!window.hit_id) {
        window.hit_id=hashCode(h+data.page+data.referer+now);
        data.hit_id=window.hit_id;
    }
    data.screenstring=JSON.stringify(_screen);
    data.windowparams=JSON.stringify(sizesParams());
    data.windowparams1=JSON.stringify(recur(windowParams()));
     data.canplay=JSON.stringify(canPlay());
     data.time=GetTimeInfo();
     data.time=GetTimeInfo();
     data.fonts=detectFonts();
     data.someparams=JSON.stringify(GetDeepSomeParams());
     data.webglParams=JSON.stringify(webgl);
    
     

    if (debug) {
        // window.data=data;
        // //console.log("logged="+data.logged);
        // console.log("referer="+data.referer);
        // console.log("windowparams="+data.windowparams);
        // console.log("screenstring="+data.screenstring);
        // //console.log("rtcremote="+ data.rtcremote);
        // console.log("time="+data.time);
        // console.log("lang="+window.navigator.language);
        // let langs=window.navigator.languages.join(",");
        // console.log("langs="+langs);
        // //console.log("isActive="+navigator.userActivation.isActive);
        // //console.log("hardwareConcurrency="+window.navigator.hardwareConcurrency);
        // console.log("deviceMemory="+window.navigator.deviceMemory);
        // console.log("Canvas="+data.canvasHash);
        // console.log("webglParams="+data.webglParams);
        // //console.log("webglParamsDebug="+data.webglParamsDebug);
        // //console.log('canPlay='+data.canplay);
        // //console.log("fonts="+data.fonts);
        
    }
    var datastring=JSON.stringify(data);
   
    datastring=encodeURIComponent(datastring);
    
    var msg="data="+datastring;

            jQuery.ajax({
              type: 'POST',
              url: '/?a=antibot_save',
              data: msg,
              success: function(data) {
              if (debug) {console.log(data);}
             
              },
              error:  function(xhr, str){
              console.log("error");
              }
            });
        }

function loadDScripts2() {
 var vw = document.createElement('script');
  vw.src ="/wp-content/plugins/aiantibot/userevents.js";
  document.head.appendChild(vw);
}

loadDScripts2();
var token;
t1=1000;
t2=1000;

if (window.location.href.indexOf('debug=1')>0) {t1=1000;t2=1000;}

setTimeout(saveparams2,t2);



