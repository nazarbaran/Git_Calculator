function Calculator(id) {
	this.id=id;
	this.initProp();
	this.createDOM();
	this.createEvent();
	this.initProp();

}
Calculator.prototype.createDOM=function(){
	var calc=document.getElementById(this.id);
	if (calc==null){
		alert('No container with this ID')
		return;
	}
	calc.classList.add('calculator');
	var sqrt=String.fromCharCode(8730);
	var lineButtons2=[7,8,9,"/","C"];
	var lineButtons3=[4,5,6,"*",sqrt];
	var lineButton4=["="];
	var lineButtons5=[1,2,3,"-"];
	var lineButtons6=[0,".","+"];
	var lineButton=null;
	for (var i = 1; i <= 6; i++) {
		console.log(i);
		var divLine=document.createElement('div');
		divLine.classList.add('line');
		calc.appendChild(divLine);
	if (i==1) {
		for (var j = 1; j <= 2; j++) {
			var input=document.createElement('input')
			input.setAttribute("type","text");
			input.setAttribute('readonly','true');
			divLine.appendChild(input);
			if(j==1){
				input.classList.add('top');
			}
			else{
				input.classList.add('bottom');
				input.setAttribute('value','0');
			}
		}
	}
	else{
		switch(i){
			case 2: 
			lineButton=lineButtons2;
			break;
			case 3: 
			lineButton=lineButtons3;
			break;
			case 4: 
			lineButton=lineButton4;
			break;
			case 5: 
			lineButton=lineButtons5;
			break;
			case 6: 
			lineButton=lineButtons6;
		}
		for (var j = 0; j <lineButton.length; j++) {
			var input=document.createElement('input');
			input.setAttribute('type','button');
			divLine.appendChild(input);
			input.value=lineButton[j];
			if (input.value=='=')
				input.classList.add('equal')
			if (input.value=='0')
				input.classList.add('zero')
			}
		}
	}
}
Calculator.prototype.createEvent=function(){
	var calcSelector='#'+this.id+'.calculator';
	var calc=document.querySelector(calcSelector);
	var topSelector='#'+this.id+' .top';
	var bottomSelector='#'+this.id+' .bottom';
	var top=document.querySelector(topSelector);
	var bottom=document.querySelector(bottomSelector);
	console.log(top);
	console.log(bottom);
	console.log(calcSelector)
	var calc=document.querySelector(calcSelector);
	console.log(calc);
	calc.onmouseover=function(event){
		var target=event.target;
		if (target.tagName!=='INPUT') return;
		if (target.getAttribute('type')=='text') return;
		target.classList.add('select');
	}
	calc.onmouseout=function(event){
		var target=event.target;
		target.classList.remove('select')
	}
	var self=this;
	calc.onclick=function(event){
		var sqrt=String.fromCharCode(8730);
		var target=event.target;
		if (target.tagName!=='INPUT') return;
		if (target.getAttribute('type')=='text') return;
		var btnValue=target.value;
		if (!isNaN(btnValue)) {
			self.numberClick(btnValue,bottom)
			return;
		}
		if (btnValue=='+'||btnValue=='-'||btnValue=='*'||btnValue=='/') {
			self.operationClick(btnValue,top,bottom);
			return;
		}
		if (btnValue=='=') {
			self.equalClick(top,bottom);
			return;
		}
		if (btnValue=='C') {
			self.clearClick(top,bottom);
			return;
		}
		if (btnValue=='.') {
			self.pointClick(bottom);
			return;
		}
		if (btnValue==sqrt){
			self.sqrtClick(top,bottom)
			return;
		}
	}
}
Calculator.prototype.initProp=function(){
	this.replace=false;
	this.memory=0;
	this.repeatOperation=false;
	this.sqrt=false;
	this.operation='';
}
Calculator.prototype.numberClick=function (btnValue,bottom) { 
if (this.replace||bottom.value=="0"){
	bottom.value=btnValue;
	this.replace=false;
}
else 
	bottom.value+=btnValue;
}
Calculator.prototype.operationClick=function (btnValue,top,bottom) {
	if (this.sqrt==true) {
		top.value+=btnValue;
		this.sqrt=false;
	}
	else{
		top.value+=bottom.value+btnValue;
	}
	if (this.repeatOperation) return;
	this.repeatOperation=false;
	
	if (this.operation=='')
		this.memory=bottom.value;
	else{
		this.memory=eval(this.memory+this.operation+bottom.value)
	}
	bottom.value=this.memory;
		this.operation=btnValue;
		this.replace=true;
}

Calculator.prototype.equalClick=function(top,bottom){
	top.value=" ";
	bottom.value=eval(this.memory+this.operation+bottom.value);
	this.initProp();
}
Calculator.prototype.clearClick=function(top,bottom){
	top.value=" ";
	bottom.value=0;
	this.initProp();
}
Calculator.prototype.pointClick=function(bottom){
	if (this.replace) {
		bottom.value='0.';
		this.replace=false;
		return
	}
	var str=bottom.value;
	var pos=str.indexOf('.');
	if (pos!==-1) return;
	bottom.value+='.';
}
Calculator.prototype.sqrtClick=function(top,bottom){
	this.sqrt=true;
	var str=top.value;
	var last=str[str.length-1];
	if (last=='+'||last=='*'||last=='-'||last=='/'){
		top.value+='sqrt('+bottom.value+')';
	}
	else{
		if (top.value==" ")
			top.value='sqrt('+bottom.value+')';
		else{
			top.value='sqrt('+top.value+')';
		}
	}
	bottom.value=Math.sqrt(+bottom.value);
}