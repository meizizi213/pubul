function GuMove(obj,attribute,target,cFn){//obj是让什么物体运动,属性名,目标值(最好传入纯数字),链式运动的方法
	 clearInterval(obj.GuTimer); //清除定时器
	 obj .GuTimer=setInterval(function(){
	 	//开一个定时器
	  //opacity:0-1   css设置透明度的两个方法
	  //filter:alpha(opacity=0-100)
	  //width height left right bottom top line-height 这些用px的属性可以改
	  //var currentValue=obj.style[attribute]//这个东西无法获取不在内联标签中的属性
	  //外界传的是字符串的话是不能用"."的方式,要用"[]"
	  var currentValue=getStyle(obj,attribute);//获取当前的属性值
	  var speed=(target-currentValue)/8;
	  speed=speed>0?Math.ceil(speed):Math.floor(speed);//如果speed大于0,则执行ceil,若<0则执行floor
	  if(attribute=="opacity"||attribute=="filter"){//判断是不是透明度
          // getStyle(obj,attribute);    //透明度的
	  if(target<=1&&target>0){
	  	target*=100;
	  }
	  speed=(target-currentValue)/8;
	  obj.style[attribute]=(currentValue+speed)/100;
	  obj.style[attribute]="alpha(opacity="+(currentValue+speed)+")";
	  	if(currentValue==target){
	  		clearInterval(obj.GuTimer);
	  	}
	  }else{//不是透明度,则
            if(speed<0){
            	if(currentValue<=target){
            		clearInterval(obj.GuTimer);
                }else{
            	    obj.style[attribute]=currentValue+speed+"px";
                }
            }else{
            	if(currentValue>=target){
            		clearInterval(obj.GuTimer);
                }else{
            	    obj.style[attribute]=currentValue+speed+"px";
                }
            }
	  }
	 },30)
}
function getStyle(obj,attribute){  //要获取什么对象的什么属性
	// window.getComputedStyle(obj,null
	//浏览器获取对象的方法,2个参数分别是获取哪个对象,哪个伪类
	// obj.currentStyle(attribute);  //IE自己的获取对象的方法
	var a="";
// if判断是兼容性处理
	if(obj.currentStyle){//如果调用到了IE自己的这个currentStyle方法,
		a=obj.currentStyle(attribute);//则执行
	}else{//其他浏览器
		a=window.getComputedStyle(obj,null)[attribute];
	} //null是没有伪类,如果有的话,就写伪类	
	if (attribute=="opacity"||attribute=="filter"){
		a*=100;
	};//如果是透明度,得到的则是一个0-100的数
	return parseInt(a); 
}