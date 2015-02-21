'use strict';

function updateGame(){}

var tick = -10,
    speed = 0.8,
	endX = Math.ceil(Math.random()*350),
	startX = Math.ceil(Math.random()*350),
	endX2 = Math.ceil(Math.random()*350),
	startX2 = Math.ceil(Math.random()*350);
	
var gameLoop = function(e){
    
	ctx.clearRect(0,0,350,400);
    requestAnimationFrame(gameLoop);
    var evt = gameLoop.evt;
	var touchedX = gameLoop.touchedX;
	var touchedY = gameLoop.touchedY;
	var zap = gameLoop.zap;
	var snapshot = gameLoop.snapshot;
	var getData = gameLoop.getData;
	var touched = gameLoop.touched;
	var ticker = gameLoop.ticker;
	var active = gameLoop.activeColor;
	
	updateGame( (function(e){
	  
	  if(tick<550){
	    tick+=speed;
	  }
	  else{
	    tick=-10;
		startX = Math.ceil(Math.random()*350);
	    endX = Math.ceil(Math.random()*350);
		startX2 = Math.ceil(Math.random()*350);
	    endX2 = Math.ceil(Math.random()*350);
	  }
	  
	  if(startX<endX){
	    startX+=0.25;
	  }
	  else if(startX>endX){
	    startX-=0.25;
	  }
	  
	  if(startX2<endX2){
	    startX2+=0.25;
	  }
	  else if(startX2>endX2){
	    startX2-=0.25;
	  }
	  
	  evt(e,tick,startX,startX2);
	  
	  //start the target effect
	  if(gameLoop.touched && gameLoop.ticker<7){
	    gameLoop.ticker+=0.3;
		
		//offset 15 because half of diameter of 30
		zap(touchedX-15,touchedY-15,ticker);
      }
	  
	  //remove target effect
	  else{
	    gameLoop.ticker = 0;
		gameLoop.touched = false;
	  }
	 
	  
	}(e))
	);
	
}

