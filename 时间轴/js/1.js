//获取所有年份
var allYear = document.getElementById('year');
var year = allYear.getElementsByTagName('li');
//获取事件
var action = document.getElementById('action');
var heppen = action.getElementsByTagName('div');

//遍历所有年份
for (var i = 0; i < year.length; i++) {
	// 计数变量
	year[i].count = i;
	//点击年份的事件
	year[i].onclick = function(){
		//改变当前元素的
		for (var j = 0; j < year.length; j++) {
			// 判断是否为当前元素样式
			if (this.count==j) {
				//改变当前年份的样式
				year[this.count].setAttribute('class','on');
				year[this.count].getElementsByTagName('span')[0].setAttribute('class','list');
			}else{
				//改变当前年份的样式
				year[j].removeAttribute('class');
				year[j].getElementsByTagName('span')[0].removeAttribute('class');
			};
		};
		//定义定时变量
		var timer = null;
		//表示当前点击元素
		var selfObj = this;
		// 当前点击元素之前的值全部变小
		for(var i= 0;i < heppen.length;i++){
			//判断，在此之前的所有都会变化
			heppen[i].index = i;
			if(i < this.count){
				move(heppen[i],-1,0,1);
			}else{
				move(heppen[i],1,heppen[i].scrollHeight,1);
			}
		}
	};
}
// 缩放函数 调用格式 move(要改变大小的的元素，改变的大小（可正可负），变化的范围,定时器执行时间);
function move(obj,n,bj,time){
	obj.timer = setInterval(function(){
		//获取当前所有元素的高度
		var H = parseInt(getStyle(obj,'height'));		
		H += n;
		// 判断当元素是增大或者缩小
		var judge = n < 0 ? H > bj : H < bj;
		if(judge){
			obj.style.height = H + 'px';
		}else{
			clearInterval(obj.timer);
		}
	},time);
}
// 调用格式 parseInt(getStyle(要寻找的对象,'需要改变值的属性'));
function getStyle(obj, attr){
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj, false)[attr];
    }
};
