function setAntiBotEnv() {
 if (!hit_id){console.log("can't set antibot params: no hit_id")}
 var vw = document.createElement('script');
 if (window.location.href.indexOf('debug=1')>0) {console.log("set antibot env");}
 vw.src ="/?a=antibot_isbot&output_type=js&hit_id="+hit_id;
 document.head.appendChild(vw);
}

setTimeout(setAntiBotEnv,2000);
