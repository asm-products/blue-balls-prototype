BlueGame.Footer = function(){
  this.leftSide = function(isActive){
    ctx2.strokeStyle = '#eee';
	ctx2.lineWidth = isActive ? 4 : .01;
    ctx2.fillStyle = 'blue';
	ctx2.beginPath();
	ctx2.arc(140,24, 22,0,Math.PI*2,false);
	ctx2.fill();
	ctx2.stroke();
  }
  this.rightSide = function(isActive){
    ctx2.strokeStyle = '#eee';
	ctx2.lineWidth = isActive ? .01 : 4;
    ctx2.fillStyle = 'teal';
	ctx2.beginPath();
	ctx2.arc(210,24, 22,0,Math.PI*2,false);
	ctx2.fill();
	ctx2.stroke();
  }
}

BlueGame.Header = function(){
  this.level = function(lvl){
    ctx3.strokeText("Level: " + lvl,20,20);	
  }
}

BlueGame.BlueBalls = function(){
  this.ballGroup = function(n,fillColors,x,y){
    ctx.strokeStyle = '#eee';
	ctx.lineWidth = 3;
    for(var i=1;i<n;i++){
	  ctx.lineWidth = fillColors[i-1] != 'rgba(10,10,10,0)' ? 3 : 0.1;
	  ctx.fillStyle = fillColors[i-1];
	  ctx.beginPath();
      ctx.arc(x,y-(i*50),10,0,Math.PI*2,false);
      ctx.fill();
      ctx.stroke();
    }
  }
  
  this.target = function(fillColor,x,y,radi,spin){
    ctx.lineWidth = '0.1';
 	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(x+spin,y,radi,0,Math.PI*2,false);
	ctx.fill();
	ctx.stroke();	
  }
}
