//获取所有元素
var mr = document.getElementsByClassName('mr')[0];
var chose = document.getElementsByClassName('chose')[0];

//获取地址
var place = chose.getElementsByClassName('place');

//点击事件
var num = 0;
mr.onclick = function(){
	if (num%2==0) {
		chose.style.display = 'block';
		mr.setAttribute('class','mr on');
	}else{
		chose.style.display = 'none';
		mr.setAttribute('class','mr off');
	}
	num++;
};


for (var i = 0; i < place.length; i++) {
	place[i].count = i;

	place[i].onclick = function(){
		mr.innerHTML = place[this.count].firstChild.nodeValue;
		chose.style.display = 'none';
		mr.setAttribute('class','mr off');
	};

}

