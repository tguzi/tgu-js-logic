//获取所有li的值
var uLi = document.getElementsByClassName('nav')[0].getElementsByTagName('li');
var imgA = document.getElementsByClassName('nav')[0].getElementsByTagName('a');
//获取购物成功提醒元素
var shopping = document.getElementsByClassName('shopping')[0];
//获取购物车栏目元素
var shoppingCar = document.getElementsByClassName('shoppingcar')[0];
//获取下单成功的运动元素
var moveImg = document.getElementById('moveImg');
//定义定时变量
var timer = null;

//获取添加购物车按钮
for (var i = 0; i < uLi.length; i++) {
	//计数变量
	uLi[i].count = i;
	//定义外部变量,判断是否已经点击加入购物车按钮,若已点击，则鼠标移动事件不执行
	var buy = 0;
	var num;
	//鼠标经过时改变边框颜色
	uLi[i].onmouseover = function(){
		uLi[this.count].style.borderColor = 'orange';
		num = this.count;
		//鼠标经过购物车下单按钮时改变颜色
		imgA[num].onmouseover = function(){
			//判断是否已经点击加入购物车
			if (buy>=1) {
				return false;
			}else{
				imgA[num].setAttribute('class','on');
			}
		};
		imgA[num].onmouseout = function(){
			//判断是否已经点击加入购物车
			if (buy>=1) {
				return false;
			}else{
				this.setAttribute('class','off');
			}
		};
		//点击加入购物车事件
		imgA[num].onclick = function(){
			if (timer!=null) {
				return false;
			}
			//改变属性，判断变量自增
			buy++;
			//获取当前元素的所有属性值
			var imgAttr = imgA[num].getAttribute('class');
			// 如果已经有这个属性，则不再执行操作
			if (imgAttr=='click') {
				return false;
			}else{
				// console.log(imgAttr);
				//设置元素运动的终点坐标位置
				var lastPosY =  document.documentElement.clientHeight/2-100;
				var lastPosX = document.documentElement.clientWidth-100;
				// 调用函数
				moveTo(moveImg,num,20,lastPosY,lastPosX);
			}
			
		};

	};
	// 鼠标移出时改变背景颜色
	uLi[i].onmouseout = function(){
		uLi[this.count].style.borderColor = '#ccc';
	};
};
// 购物车下单成功提醒函数
function successShop(obj,obj2,time){
	//循环变大
	var SuccessTime = setInterval(out,time);
	//显示提示消息函数
	function out(){
		obj.style.display = 'block';
		//获取提示栏的right值
		var R = parseInt(getStyle(obj,'right'));
		var H = parseInt(getStyle(obj,'hieght'));
		var W = parseInt(getStyle(obj,'width'));
		var shopW = parseInt(getStyle(obj2,'width'));
		//设置提示消息的高度
		obj.style.top = document.documentElement.clientHeight/2-H;
		//改变right值
		R = R + 2;
		if (R<=shopW) {
			obj.style.right = R +'px';
		}else{
			clearInterval(SuccessTime);
			//提示信息透明度变化，使之消失
			var Opacity = 1;
			//设置透明度变化趋势
			var opa = 0.1;
			// 按钮变色
			imgA[num].setAttribute('class','click');
			//循环变化透明度
			opacityToSmall(obj,Opacity,opa,W);	
		}
	}
};
//运动元素的运动轨迹函数--抛物线运动轨迹 （num = this.count）
// 调用格式：moveTo(运动元素，判断当前对象的接收值,运动的速度,固定经过点的纵坐标，固定经过点的横坐标,元素的大小);
function moveTo(obj,num,time,lastPosY,lastPosX){
	//获取起始位置的坐标，即触发事件的元素的坐标
	var firstPosX = event.layerX;
	var firstPosY = event.layerY;
	//获取移动元素的大小，在运动过程中改变元素大小
	var moveW = parseInt(getStyle(obj,'width'));
	//顶部距离根据当前触发元素的位置决定
	var C =  lastPosY+firstPosX*(num+2);
	//设置二次方程的变量
	var X,Y;
	//解得a的值
	var A = (firstPosX*lastPosY+C*lastPosX-firstPosY*lastPosX-C*firstPosX)/(lastPosX*lastPosX*firstPosX-firstPosX*firstPosX*lastPosX);
	//解得b的值
	var B = (firstPosY-C-A*firstPosX*firstPosX)/firstPosX;
	//初始X值
	X = firstPosX;
	//抛物线公式
	Y = A*X*X + B*X + C;
	//定义移动速度变量
	var v = 0;
	//循环 使X变大且<lastPosX
	var timer = setInterval(function(){
		obj.style.display = 'block';
		obj.src = '../images/'+(num+1)+'.jpg';
		//设置位置及速度
		v = v + 1;
		X = X + v;
		Y = A*X*X + B*X + C;
		//改变元素的大小
		moveW = moveW - 1;
		if (X>=lastPosX) {
			//清除循环
			clearInterval(timer);
			timer = null;
			//移动元素消失
			obj.style.display = 'none';
			// 返回原来大小
			obj.style.width = 80 + 'px';
			//购物车下单成功提醒函数
			successShop(shopping,shoppingCar);
		}else{
			//是元素减小
			obj.style.width = moveW + 'px';
			// 按抛物线曲线移动
			obj.style.left = X+'px';
			obj.style.top = Y +'px';
		}
	},time);
};
//减小当前元素透明度函数
//透明度减小函数 调用格式：opacityToSmall(改变透明度的对象,透明度初始值,透明度减小速度,元素的宽);
function opacityToSmall(obj,Opacity,opa,width){
	var delOpacityTime = setInterval(function(){
	Opacity = Opacity - opa;
	// 如果透明度为0时，则使其消失,并返回原来的位置
	if (Opacity<=0) {
		obj.style.display = 'none';
		obj.style.right = -width+'px';
		//清除循环，重置透明度
		clearInterval(delOpacityTime);
		obj.style.opacity = 1;
		}else{
			obj.style.opacity = Opacity;
		}
	},100);
};
// 调用格式 parseInt(getStyle(要寻找的对象,'需要改变值的属性'));
function getStyle(obj, attr){
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj, false)[attr];
    }
};
//添加事件方法和移除事件方法
// 调用格式:eventTools.addEvent(元素节点，事件类型，事件函数);
// 调用格式:eventTools.delEvent(元素节点，事件类型，事件函数);
var eventTool = {
	addEvent:function(element,type,func){
		//DOM 2非IE
		// 判断元素是否支持指定的添加事件
		if(element.addEventListener){//DOM2 非IE
			element.addEventListener(type,func,false);
		}else if(element.attachEvent){//DOM2 IE
			element.attachEvent('on'+type,func);
		}else{
			//DOM0
			element['on'+type] = func;
		}
	},
	delEvent:function(element,type,func){
		if (element.removeEventListener) {
			element.removeEventListener(type,func,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,func);
		}else{
			element['on'+type] = null;
		}
	}	
}
