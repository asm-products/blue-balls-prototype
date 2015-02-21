
var BlueBalls = BlueGame.BlueBalls,
    Footer = BlueGame.Footer,
	Header = BlueGame.Header;
	

//blue color is true
//off blue is false  
var activeColor = true; 
var level = 1; 
  
var firstGroup = new BlueBalls,
    secondGroup = new BlueBalls,
    footer = new Footer,
	header = new Header,
	activateLevel = new BlueGame.ActivateLevel;
	
//layoutFooter	
footer.leftSide(activeColor);
footer.rightSide(activeColor);
//layoutHeader
header.level(1);

activateLevel.ballNumber(level+6);
activateLevel.assignColors();
var blueColorKey = activateLevel.blueColorKey;
var offBlueColorKey = activateLevel.offBlueColorKey;
var targetColors = activateLevel.targetColorBlue;
var targetColors2 = activateLevel.targetColorOffBlue;


//animate
gameLoop(
  
  gameLoop.evt = function(multiplier,tick,randomizer,randomizer2){
  
	firstGroup.ballGroup(level+7,targetColors,randomizer,tick);
    secondGroup.ballGroup(level+7,targetColors2,randomizer2,tick);
  },
  
  gameLoop.zap = function(x,y,ticker,color){
    
	//todo: need to add a unique color to each ball in order to zap it
	//always do this before showing target circle
	secondGroup.target('rgba(150,150,150,0.8)',x,y,30+ticker,20);
	
  },
  
  gameLoop.snapshot = new Image(),
  
  gameLoop.touchedX = -20,
  
  gameLoop.touchedY = -20,
  
  gameLoop.touched = false,
  
  gameLoop.ticker = 0,
  
  gameLoop.activeColor = activeColor,
  
  
  canvas.addEventListener('touchstart', function(ev){
    var touch = ev.touches[0];
	gameLoop.snapshot = ctx.getImageData(touch.pageX-15,touch.pageY-15,30,30);
	
	//each ball has a slightly different color, so loop through each color
	//and in that loop loop through canvas data to test for match
	for(var i=0;i<blueColorKey.length;i++){
	  for(var ind=0;ind<gameLoop.snapshot.data.length;ind++){
	    //check current color
		if(activeColor){
		  //check blue balls
		  if(!gameLoop.touched && gameLoop.snapshot.data[ind] === blueColorKey[i]){
		    gameLoop.touched = true;
		    targetColors[i] = 'rgba(10,10,10,0)';
			console.log(blueColorKey[i]);
		  }
		}
		else{
		  //check offcolor blue balls
		  if(!gameLoop.touched && gameLoop.snapshot.data[ind] === offBlueColorKey[i]){
		    gameLoop.touched = true;
		    targetColors2[i] = 'rgba(10,10,10,0)';
			console.log(offBlueColorKey[i]);
		  }
		}
	  }
	}
	gameLoop.touchedX = touch.pageX;
	gameLoop.touchedY = touch.pageY;
	
  },false),
  
  canvasFooter.addEventListener('touchstart', function(ev){
    var touch = ev.touches[0];
	var x = touch.pageX,
	    y = touch.pageY;
	//blue button
	if(x>134 && x<168){
	  activeColor = true;
	}
	//offblue button
	else if(x>202 && x<240){
	  activeColor = false;
	}
	//apply
	footer.leftSide(activeColor);
    footer.rightSide(activeColor);
	
  },false)

);

