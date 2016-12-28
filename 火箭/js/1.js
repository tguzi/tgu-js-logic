//获取火箭元素
var fly = document.getElementsByClassName('fly')[0];
var fireplant = document.getElementById('fireplant');

//鼠标放上去时火箭变化
fly.onmouseover = function(){
	fireplant.src = '../images/gotopd.gif';
};
fly.onmouseout = function(){
	fireplant.src = '../images/gotop.png';
};

// 每毫秒扫描一次滚动高度
var time = setInterval(function(){
	//获取屏幕的滚动高度
	if (document.body.scrollTop>document.body.offsetHeight/20) {
		//显示火箭
		fly.setAttribute('class','fly on');
	}else{
		fly.setAttribute('class','fly');
	}
},1);

//点击火箭返回顶部
fireplant.onclick = function(){
	var time = setInterval(function(){
		document.body.scrollTop -= 10;
		if (document.body.scrollTop<=10) {
			clearInterval(time);
		}
	},1);
};

