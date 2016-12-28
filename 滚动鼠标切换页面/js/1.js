//获取元素
var outer = document.getElementById('outer');
var main = document.getElementById('main');
var box = document.getElementsByName('box');
var inner = document.getElementsByClassName('inner');
//设置屏幕的高度为当前视窗高度
var divH = innerHeight;
var divW = innerWidth;
var outW = window.screen.width;
//遍历当前所有box
for (var i = 0; i < box.length; i++) {
	// 每个的高度都设置为可是高度
	box[i].style.height = divH+'px';
	box[i].style.width = divW+'px';
	// inner[i].style.width = divH*(outW/960) + 'px';
}
// 每毫秒扫描一次滚动高度
var time = setInterval(function(){
	//获取屏幕的滚动高度
	var scrollTop = document.body.scrollTop;
	if (scrollTop>0&&scrollTop<divH) {
		body.onscroll = function(){
			setInterval(function(){
				while(scrollTop<=divH){	
					scrollTop++;
				}
			},10);
		};
	}
},1);
//翻屏函数
function changeScroll(){
	//如果屏幕滚动高度小于第一个box的高度
	if (scrollTop<divH) {
		//当box1滚动时
		window.onscroll = function(){
			console.log(1);
			//循环增大滚动高度
			setInterval(function(){
				while(scrollTop<=divH){	
					scrollTop++;
				}
			},10);
		};
	}
};
