// 获取所有图片元素
var Img = document.getElementsByClassName('Img')[0];
var uImg = Img.getElementsByTagName('img');
//获取遮罩层元素及遮罩层展示图片
var shadow = document.getElementsByClassName('shadow')[0];
var show = document.getElementsByClassName('show')[0];
var showImg = show.getElementsByTagName('img')[0];
var close = document.getElementsByClassName('close')[0];

//点击图片关闭遮罩层
close.onclick = function(){
	shadow.style.display = 'none';
	show.style.display = 'none';
};

//遍历所有图片
for (var i = 0; i < uImg.length; i++) {
	// 计数变量
	uImg[i].count = i;
	var num ;
	//点击图片时显示遮罩层
	uImg[i].onclick = function(){
		showElement(show,shadow,close,'../images/b'+(this.count+1)+'.jpg');
	};	
	//鼠标经过时图片变大
	uImg[i].onmouseover = function(){
		//获取当前left top width 值
		var L = parseInt(getStyle(uImg[this.count].parentNode,'left'));
		var T = parseInt(getStyle(uImg[this.count].parentNode,'top'));
		var W = parseInt(getStyle(uImg[this.count].parentNode,'width'));
		//调用函数
		ChangeSize(uImg[this.count].parentNode,L,T,W,1,0.1,5,140);
	};
	// 鼠标移出时返回原值
	uImg[i].onmouseout = function(){
		var L = parseInt(getStyle(uImg[this.count].parentNode,'left'));
		var T = parseInt(getStyle(uImg[this.count].parentNode,'top'));
		var W = parseInt(getStyle(uImg[this.count].parentNode,'width'));
		ChangeSize(uImg[this.count].parentNode,L,T,W,1,-0.1,-5,140);
	};

}
// 调用格式 parseInt(getStyle(要寻找的对象,'需要改变值的属性'));
function getStyle(obj, attr){
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj, false)[attr];
    }
};

//显示某个元素和调整元素居中位置的函数
//调用格式 showElement(图片元素,遮罩层元素,关闭按钮元素,图片的地址字符串);
function showElement(obj,obj1,obj2,str){
	showImg.src = str;
	//调整图片位置
	//获取当前图片的宽高
	var picW = parseInt(getStyle(obj,'width'));
	var picH = parseInt(getStyle(obj,'height'));
	//获取屏幕的宽高
	var outerW = document.documentElement.clientWidth;
	var outerH = document.documentElement.clientHeight;
	//调整图片的位置
	var newLeft = outerW/2-picW/2;
	var newTop = outerH/4-picH/4;
	//把位置信息赋值给元素
	obj.style.left = newLeft+'px';
	obj.style.top = newTop+'px';
	// 显示元素
	obj1.style.display = 'block';
	obj.style.display = 'block';
	obj2.style.display = 'block';
};

// 改变元素大小的函数,位置不变
// 调用格式 ChangeSize(元素对象，left值，top值，width值，定时器时间，变化的速度，变化范围);
function ChangeSize(obj,left,top,width,time,vote,range,size){
	//定义初始值
	var a = 0;
	var timeout = null;
	var newL = 0
	var newT = 0;
	var W = size;
	//定时循环，使之循环变化
	timeout = setInterval(function(){
		a = a + vote;
		//获取新的 width left top值
		var newW = width + a*2;
		// 如果变化范围大于0，则使其left top值都变为二分之一的宽度值
		newL = left - a ;
		newT = top - a ;
		// var judge = a>0?a>range:a<range;
		//如果范围值大于0
		if(range>0){
			if (a>=range||newW>150) {
				clearInterval(timeout);
				timeout = null;
			}else{
				obj.style.width = newW + 'px';
				obj.style.left = newL+'px';
				obj.style.top = newT+'px';
			}
		}else{
			if (a<=range||newW>150) {
				obj.style.width = 140 + 'px';
				obj.style.left = 0+'px';
				obj.style.top = 0+'px';
				clearInterval(timeout);
			}else{
				obj.style.width = newW + 'px';
				obj.style.left = newL+'px';
				obj.style.top = newT+'px';
			}
		}
	},time);
};