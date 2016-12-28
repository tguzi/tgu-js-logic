//获取所有的外层li
var outerLi = document.getElementsByName('outLi');
var outer = document.getElementById('outer');
var more = document.getElementsByName('more');

//遍历所有li
for (var i = 0; i < outerLi.length; i++) {
	//技术变量
	outerLi[i].count = i;
	//鼠标进入事件
	outerLi[i].onmouseover = function(){
		for (var j = 0; j < outerLi.length; j++) {
			var num = this.count;
			if (this.count==j) {
				//当前菜单改变样式，并显示二级菜单
				outerLi[this.count].setAttribute('class','on');
				more[this.count].style.display = 'block';
				//获取原来的top left值
				var Top = parseInt(getStyle(more[this.count],'top'));
				var Left = parseInt(getStyle(more[this.count],'left'));
				// 改变位置
				var time = setInterval(function(){
					Top = Top+1;
					Left = Left+1;
					if (Top>=45) {
						clearInterval(time);
					}else{
						more[num].style.top = Top + 'px';
						more[num].style.left = Left + 'px';
					}
				},1);
			}else{
				//清空其他菜单样式且隐藏其二级菜单
				outerLi[j].removeAttribute('class');
				more[j].style.display = 'none';
				more[j].style.top = '0px';
				more[j].style.left = '0px';
			}
		}
		
	};
	//鼠标离开导航区域事件
	outer.onmouseout = function(){
		for (var j = 0; j < outerLi.length; j++) {
			more[j].style.display = 'none';
			if (j!=0) {
				outerLi[j].removeAttribute('class');

			}else{
				outerLi[0].setAttribute('class','on');
			}
		}
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