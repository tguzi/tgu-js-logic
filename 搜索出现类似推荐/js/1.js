//获取淘宝输入框元素
var taobao = document.getElementById('taobao');
//获取相似内容区域
var more = document.getElementById('more');
var like = document.getElementById('like');
//获取提交按钮
var tb = document.getElementById('tb');
//模拟数据库数据
var arry = ['1','2123','sadjkas','asdaiusd','zxmznxhk','aqwo','asjxc','asjdk','asdkjas','asdkl','asdlk','qwiu1','asdoi','asdk','asoieq','2943','0934','093214'];


//获取表单输入值
taobao.onchange = function(){
	var str = 0;
	//调用搜索函数
	search(str.value,arry,more);
};
//搜索是否存在相同商品
// 在一个数组中搜索所有带有关键字的值
// 格式：search(关键字，数组，显示结果的元素);
function search(str,arry,obj){
	//获取当前输入值
	str = taobao.value;
	var search = '';
	// 遍历数组中所有的元素
	for (var i = 0; i < arry.length; i++) {
		//声明正则表达式
		var pattern = new RegExp(str,'i');
		var result = pattern.exec(arry[i]);
		//如果搜索到了指定的内容，则在HTML中输出
		if (result!=null) {
			obj.style.display = 'block';
			//创建一个新的li节点
			var newLi = document.createElement('li');
			//为li赋值
			newLi.innerHTML = result.input;
			//把值加入到元素中
			obj.appendChild(newLi);
			newLi.onclick = function(){
				obj.style.display = 'none';
			}	
		}else{
			continue;
		}
	}
};
//跳转页面函数
// function Assign(){
// 	window.location.assign('http://www.baidu.com');
// }
 // function search(){
 //     var a=document.getElementsByTagName("a");
 //     var keywords=document.getElementById("text").value;
 //     for(var i in a){
 //         if(a[i].innerHTML.search(keywords)!=-1){
 //             location.href=a[i].href;
 //             break;
 //         }
 //     }
 // }
