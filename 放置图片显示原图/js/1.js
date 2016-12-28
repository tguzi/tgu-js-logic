//获取所有包含图片的div
var picArea = document.getElementsByName('picArea');
var pic = document.getElementsByName('pic');
var outerPic = document.getElementsByClassName('pic');


for (var i = 0; i < pic.length; i++) {
	//定义计数变量
	pic[i].count = i;
	//鼠标移动到图片上的时候
	pic[i].onmouseover = function(){
		// 调用图片大小改变函数
		ChangeImgSize(pic,picArea,outerPic,this.count);
	};
	//鼠标移出事件
	pic[i].onmouseout = function(){
		pic[this.count].setAttribute('class','imgSize');
		picArea[this.count].removeAttribute('class');
	};	
}
// 改变图片大小函数
// 调用格式：ChangeImgSize(图片元素,第二个元素,第三个元素,计数变量);
function ChangeImgSize(obj1,obj2,obj3,count){
	//改变属性及属性值
	obj1[count].removeAttribute('class');
	obj2[count].setAttribute('class','picArea');
	//获取当前图片的宽高
	var picW = parseInt(getStyle(obj1[count],'width'));
	var picH = parseInt(getStyle(obj1[count],'height'));
	//获取外层盒子的宽高
	var outerW = parseInt(getStyle(obj3[count],'width'));
	var outerH = parseInt(getStyle(obj3[count],'height'));
	//调整图片的位置
	var newLeft = outerW/2-picW/2;
	var newTop = outerH/2-picH/2;
	//把位置信息赋值给元素
	obj2[count].style.left = newLeft+'px';
	obj2[count].style.top = newTop+'px';
};

// 调用格式 parseInt(getStyle(要寻找的对象,'需要改变值的属性'));
function getStyle(obj, attr){
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj, false)[attr];
    }
};