//获取票数
var count = document.getElementsByClassName('count');
//获取投票按钮
var tpBtn = document.getElementsByClassName('tpBtn');
//获取每个征名显示区域
var zhengming = document.getElementsByClassName('zhengming');
//获取所有的box
var box = document.getElementsByClassName('box');


//遍历所有元素 start
for (var i = 0; i < tpBtn.length; i++) {
	//计数变量
	tpBtn[i].countNumber = i;
	zhengming[i].countNumber = i;
	box[i].countNumber = i;


	//每次点击投票时增加票数
	tpBtn[i].onclick = function(){
		//获取当前票数
		var num = parseInt(count[this.countNumber].firstChild.nodeValue);
		//票数增加
		var newNum = ++num;
		//用新票数替换原票数
		count[this.countNumber].innerHTML = newNum;
		//提示投票成功
		alert('亲,您为【\n征名'+(this.countNumber+1)+'\n】投了一票,谢谢您的投票!\n征名'+(this.countNumber+1)+'当前的票数为:'+newNum+'票');
	};


	//鼠标进入征名区域事件
	zhengming[i].onmouseenter = function(){
		//获取当前区域
		var area = box[this.countNumber].getElementsByClassName('shadow')[0];
		//获取当前区域的高度
		var areaH = area.offsetHeight;
		//建立循环，使内容浮现
		var time = setInterval(scrollArea,10);
		//区域滚动函数
		function scrollArea(){	
			//获取遮罩层的top值
			var shadowTop = parseInt(getStyle(area,'top'));
			// 将遮罩层的top值+1,变成新的top值
			var newTop = shadowTop +10;
			//如果到达指定位置,则清除循环
			if (newTop>=10) {
				//清除循环
				clearInterval(time);
				time = null;
			}else{
				//把新的高度值赋值给元素
				area.style.top = newTop+'px';
			}
		};
	};


	//鼠标离开征名区域事件
	zhengming[i].onmouseleave = function(){
		//获取当前区域
		var area = box[this.countNumber].getElementsByClassName('shadow')[0];
		//建立循环，使内容隐匿
		var time1 = setInterval(scrollArea,10);

		//区域滚动函数
		function scrollArea(){
			//获取遮罩层的top值
			var shadowTop = parseInt(getStyle(area,'top'));
			// 将遮罩层的top值+1,变成新的top值
			var newTop = shadowTop +10;
			//如果到达指定位置,则清除循环
			if (newTop>=220) {
				//清除循环
				clearInterval(time1);
				time1 = null;
				//回到初始位置
				area.style.top = -area.offsetHeight+'px';
			}else{
				//把新的高度值赋值给元素
				area.style.top = newTop+'px';
			}
		};
	};


}
//遍历所有元素 end

// 调用格式 parseInt(getStyle(要寻找的对象,'需要改变值的属性'));
function getStyle(obj, attr){
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj, false)[attr];
    }
};