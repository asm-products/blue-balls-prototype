BlueGame.ActivateLevel = function(){ 
  //how many balls generated for each color
  this.ballNumber = function(n){
    return this.n = n;
  }
  this.n = 0;
  this.blueColorKey = [];
  this.offBlueColorKey = [];
  this.targetColorBlue = [];
  this.targetColorOffBlue = [];
  this.assignColors = function(){
	for(var i=0;i<this.n;i++){
      this.blueColorKey.push(200+i);
	  this.targetColorBlue.push('rgba(0,0,' + (200+i) + ',1)');
	}
	for(var i=0;i<this.n;i++){
	  this.offBlueColorKey.push(100+i);
	  this.targetColorOffBlue.push('rgba(0,99,' + (100+i) + ',1)');
	}
  }
}