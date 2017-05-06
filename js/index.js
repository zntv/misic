

(function(){
	var mymusic=document.getElementById('myMusic')

	var btn=document.getElementsByClassName('play')[0];//找到play的div
	var con=document.getElementsByClassName('content')[0];//找到play的div
	var Txt=document.getElementById('txt');
	var onoff=true;
	
	btn.onclick=function(){
		
		
		if(onoff){
			this.className+=" rotate"/*前面必须有空格，否则叠加到属性会失效*/
			mymusic.play();
			onoff=false;
		}else{
			this.className='play';
			mymusic.pause();
			onoff=true;
		}	
	}
	
	//获取歌词
	var lrc=Txt.value;
	
	var lrcarr=lrc.split("[");/*切割*/
	
	var html="";//添加歌词
	
	for(var i=0; i<lrcarr.length;i++){
		var arr=lrcarr[i].split(']');
		var text=arr[1];
		//获取时间
		var timer=arr[0].split('.');
		var time=timer[0].split(':');
		var ms=time[0]*60+time[1]*1;
		console.log(ms)
		if(text){
		    html+="<p id='"+ms+"'>"+text+"</p>";
		}
	}
	
		con.innerHTML=html;
	
	//歌词同步,当音乐播放位置发生改变的时候触发的事件timeupdate。
	var op=document.getElementsByTagName('p');
	
	var num=0;
	mymusic.addEventListener('timeupdate',function(){
		var curtime=parseInt(this.currentTime);//获取当前播放的时间
		if(document.getElementById(curtime)){
			for(var i=0;i<op.length;i++){
				op[i].style.cssText="color:#ccc;font-size:12px;"//把所有p标签改回原来的样式
			}
			document.getElementById(curtime).style.cssText="color: red ;font-size: 18px;"//当前播放特写
			
			if(op[7+num].id==curtime){
				con.style.top=-20*num+"px";
				num++;
			}	
		}
	})
	mymusic.addEventListener('ended',function(){
		btn.className="play";
		onoff=true;
		this.currentTime=0; con.style.top=0;
		num=0;
	})
	
	
})()
