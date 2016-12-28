//获取所有可以点击的图片
var chose = document.getElementsByClassName('chose')[0];
//获取所有用于选择的图片
var cImg = chose.getElementsByTagName('img');
//获取展示区域的img
var show = document.getElementsByClassName('show')[0]
var sImg = show.getElementsByTagName('img')[0];

//获取变化区域的外层宽高
var showW = parseInt(getStyle(show,'width'))+10;
var showH = parseInt(getStyle(show,'height'))+10;

//定义全局定时变量
var bigImgTime = null;
var smallImgTime = null;

//遍历所有的可以选择的图片
for (var i = 0; i < cImg.length; i++) {
	//计数变量
	cImg[i].count = i;
	//鼠标经过的样式
	cImg[i].onmouseover = function(){
		clearInterval(bigImgTime);
		clearInterval(smallImgTime);
		//选择区域边框变色
		cImg[this.count].setAttribute('class','on');
		//接收this.count的值
		var num = this.count;
		//让图片逐渐变小
		smallImgTime = setInterval(ImgChange,1);	
		clearInterval(bigImgTime);
		//图片变小函数
		function ImgChange(){
			//获取当前图片的宽高
			var imgW = parseInt(getStyle(sImg,'width'));
			var imgH = parseInt(getStyle(sImg,'height'));
			//定义新的宽高值
			var newW = imgW - 10;
			var newH = imgH -10;

			//判断是否缩小到指定大小时切换图片，并且时图片变大
			if (newW<=showW/2||newH<=showH/2) {
				clearInterval(smallImgTime);
				sImg.src='../images/s'+(num+1)+'.jpg';
				//建立循环，把图片变大
				bigImgTime = setInterval(bigImg,1);
			}else{
				//把新值赋值给元素
				sImg.style.width = newW+'px';
				sImg.style.height = newH+'px';
			}	
		};

		//图片变大函数
		function bigImg(){
			//获取当前图片的宽高
			var imgW = parseInt(getStyle(sImg,'width'));
			var imgH = parseInt(getStyle(sImg,'height'));
			//定义新的宽高值
			var newW = imgW + 10;
			var newH = imgH +10;
			// 判断图片是否变为原来的大小
			if (newH>=showH||newW>=showW) {
				clearInterval(bigImgTime);
				bigImgTime = null;
			}else{
				//把新值赋值给元素
				sImg.style.width = newW+'px';
				sImg.style.height = newH+'px';
			}
		};
	};
	//鼠标离开时的
	cImg[i].onmouseout = function(){
		cImg[this.count].removeAttribute('class');
	};
}
// 调用格式，parseInt(getStyle(要寻找的对象,'需要改变的属性值'));
function getStyle(obj,attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
};

