
function sendEventData1(eventType,data) {
	if (!window.hit_id) {
		if (window.debug) {console.log("no hit id");}
		return;
	}
	var datastring=JSON.stringify(data);
   
    datastring=encodeURIComponent(datastring);
    
    var msg="data="+datastring+'&event='+eventType+"&hit_id="+window.hit_id;
            jQuery.ajax({
              type: 'POST',
              url: '/?a=antibot_event_save',
              data: msg,
              success: function(data) {
              if (window.debug) console.log(data);
                
              },
              error:  function(xhr, str){
              
              }
    });
        
}

function saveEvents(event) {
	let isTrusted=event.isTrusted;
	if (event.type=='mousemove'){
		let now = new Date();
		if (!window.mouseTimeBegin) {window.mouseTimeBegin=Date.now();}
		let x=event.clientX;
		let y=event.clientY;
		let dt=now-window.lastTimeMove;
		window.lastTimeMove=now;
		//let dS=Math.floor(Math.sqrt((x-window.lastMouseX)*(x-window.lastMouseX)+(y-window.lastMouseY)*(y-window.lastMouseY)));
		let dx=Math.abs(x-window.lastMouseX);
		let dy=Math.abs(y-window.lastMouseY);
		window.lastMouseX=x;
		window.lastMouseY=y;
		//console.log(dt);
		if (!window.count) {window.count=0;window.beginX=0;window.beginY=0;}
		if (window.count>0 && dt>300) {
			let sum=Math.abs(window.beginX-x)+Math.abs(window.beginY-y);
			let steps=Math.floor(sum*0.5);
			let dbx=Math.abs(x-window.beginX);
			let dby=Math.abs(y-window.beginY);
			let dtsav=0;
			dtsav=Math.floor(window.dts/window.count);
			if (window.debug) {
				
				//console.log(`mouse: count - ${count} dx=${dbx},dy=${dby} dtsav=${dtsav} calc steps=${steps}`);
			}
			let data={};
			data.timeBegin=window.mouseTimeBegin;
			data.timeExec=window.dts;
			data.dt_av=dtsav;
			data.count=count;
			data.dx=dbx;
			data.dy=dby;
			
			data.trusted=isTrusted;
			sendEventData1('mousemove',data);
			window.beginX=x;
			window.beginY=y;
			window.mouseTimeBegin=Date.now();
			window.count=1;
			window.dts=1;
		} else {

			window.count=window.count+1;
			window.dts=window.dts+dt;
		}
		
	}

	if (event.type=='scroll') {
		let now = new Date();
		if (!window.scrollTimeBegin) {window.scrollTimeBegin=Date.now();}
		let dt=now-window.lastTimeScroll;
		
		if (!window.lastpageYOffset) {window.lastpageYOffset=0;}
		let dy=Math.abs(pageYOffset-window.lastpageYOffset);
		window.lastpageYOffset=pageYOffset;
		window.lastTimeScroll=now;
		//console.log(`scroll ${pageYOffset} dy=${dy} dt=${dt}`);
		if (!window.scrollCount) {window.scrollCount=0;window.scroll_dt=0;window.scroll_dy=0;}
		if (dt>300 && window.scrollCount>0) {
			if (window.scrollCount) {
				var scrolldt_av=Math.floor(window.scroll_dt/window.scrollCount);
				var scrolldy_av=Math.floor(window.scroll_dy/window.scrollCount);
			}
			if (window.debug) {
				//console.log(`scroll: count - ${window.scrollCount} scrolldy_av=${scrolldy_av} scrolldt_av=${scrolldt_av} `);
			}
			
			let data={};
			data.timeBegin=window.scrollTimeBegin;
			data.timeExec=window.scroll_dt;
			data.dt_av=scrolldt_av;
			data.count=window.scrollCount;
			data.dy_av=scrolldy_av;
			data.trusted=isTrusted;
			data.pageYOffset=pageYOffset;
			sendEventData1('scroll',data);
			window.scrollTimeBegin=Date.now();
			window.scrollCount=1;
			window.scroll_dt=1;
			window.scroll_dy=dy;

			
		} else {
			window.scrollCount=window.scrollCount+1;
			window.scroll_dt=window.scroll_dt+dt;
			window.scroll_dy=window.scroll_dy+dy;
			
		}

	}

	if (event.type=='wheel') {
		let now = new Date();
		
		if (!window.wheelTimeBegin) {window.wheelTimeBegin=Date.now();}
		let dt=now-window.lastTimeWheel;
		window.lastTimeWheel=now;
		let deltaY=Math.abs(event.deltaY);

		//console.log(`wheel ${pageYOffset} dy=${dy} dt=${dt}`);
		if (!window.wheelCount) {window.wheelCount=0;window.wheel_dt=0;window.wheel_dy=0;}
		if (dt>300 && window.wheelCount>0) {
			var wheeldt_av=Math.floor(window.wheel_dt/window.wheelCount);
			var wheeldy_av=Math.floor(window.wheel_dy/window.wheelCount);
			if (window.debug) {
				//console.log(`wheel: count - ${window.wheelCount} wheeldy_av=${wheeldy_av} wheeldt_av=${wheeldt_av} `);
			}
			
			let data={};
			data.timeBegin=window.wheelTimeBegin;
			data.timeExec=window.wheel_dt;
			data.dt_av=wheeldt_av;
			data.count=window.wheelCount;
			data.dy_av=wheeldy_av;
			data.trusted=isTrusted;
			sendEventData1('wheel',data);
			window.wheelTimeBegin=Date.now();
			window.wheelCount=1;
			window.wheel_dt=1;
			window.wheel_dy=deltaY;
			
		} else {
			window.wheelCount=window.wheelCount+1;
			window.wheel_dt=window.wheel_dt+dt;
			window.wheel_dy=window.wheel_dy+deltaY;
			
		}
	}
	
}


function saveMobileEvents(event) {

	if (event.type=='touchstart') {
		
		window.touchstart=Date.now();
		window.touchCount=1;
		window.touchdt=1;
		window.lastTouchMoveTime=Date.now();
		window.touchStartX=event.changedTouches[0].clientX;
		window.touchStartY=event.changedTouches[0].clientY;

		window.touchPageX=event.changedTouches[0].pageX;
		window.touchPageY=event.changedTouches[0].pageY;

		window.touchScreenX=event.changedTouches[0].screenX;
		window.touchScreenY=event.changedTouches[0].screenY;
		//console.log(`start ${event.changedTouches[0].clientX},${event.changedTouches[0].clientY}`);
		
	}

	if (event.type=='touchmove') {
		window.touchCount=window.touchCount+1;
		let dt=Date.now()-window.lastTouchMoveTime;
		window.touchdt=window.touchdt+dt;

		window.lastTouchMoveTime=Date.now();
		//console.log(`move ${event.changedTouches[0].clientX},${event.changedTouches[0].clientY}`);
		
	}

	if (event.type=='touchend') {
		let data={};
		data.timeBegin=window.touchstart;
		data.timeExec=Date.now()-window.touchstart;
		data.dt_av=Math.floor(window.touchdt/window.touchCount);
		data.count=window.touchCount;
		let end_x=event.changedTouches[0].clientX;
		let end_y=event.changedTouches[0].clientY;
		data.startX=Math.floor(window.touchStartX);
		data.startY=Math.floor(window.touchStartY);
		data.pageX=Math.floor(window.touchPageX);
		data.pageY=Math.floor(window.touchPageY);
		data.screenX=Math.floor(window.touchScreenX);
		data.screenY=Math.floor(window.touchScreenY);
		data.dx=Math.floor(end_x-window.touchStartX);
		data.dy=Math.floor(end_y-window.touchStartY);
		data.trusted=event.isTrusted;
		//console.log(`end ${event.changedTouches[0].clientX},${event.changedTouches[0].clientY}`);
		sendEventData1('touch',data);
	}
}


function saveKeyEvents(event) {
	
	let now = new Date();
	let dt=now-window.lastTimekb;
	window.lastTimekb=now;
	//console.log(`${event.type} ${event.key} ${event.code} ${event.keyCode} dt=${dt}`);
}

function addEvents() {
	if (window.location.href.indexOf('debug=1')>0) {window.debug=1;}
	//let events=['mouseup','mousedown','mousemove','wheel','keydown','keyup'];
	let events=['wheel','scroll','mousemove','mouseup','mousedown'];
	
    for (evName of events) {
    	document.addEventListener(evName,saveEvents);
    }

    let mobileEvents=['touchstart','touchmove','touchend','touchcancel'];
    for (evName of mobileEvents) {
    	document.addEventListener(evName,saveMobileEvents);
    }

 let keyEvents=['keydown','keypress','keyup'];
     for (evName of keyEvents) {
     	document.addEventListener(evName,saveKeyEvents);
     }

}

window.scrollCount=1;
window.wheelCount=1;
window.scroll_dt=1;
window.wheel_dt=1;
addEvents();