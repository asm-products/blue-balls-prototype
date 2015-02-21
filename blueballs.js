(function(BlueGame,ctx,ctx2){

var BlueBalls = BlueGame.BlueBalls,
    Footer = BlueGame.Footer;

var targetColors = [
  'rgba(100,100,100,0.99)',
  'rgba(100,200,200,0.8)',
  'rgba(200,200,190,0.5)'
  ];

var firstGroup = new BlueBalls,
    secondGroup = new BlueBalls,
    footer = new Footer;

//layoutFooter	
footer.leftSide();
footer.rightSide();

//animate
gameLoop(
  gameLoop.evt = function(multiplier,tick){
	secondGroup.target(4,targetColors,250,150, [80,40,20],20)
	firstGroup.ballGroup(4,'teal',tick,50+(Math.sin(multiplier/100)));
    secondGroup.ballGroup(4,'blue',tick,60+(Math.sin(multiplier/120)));
  }
);

}(BlueGame,ctx,ctx2));