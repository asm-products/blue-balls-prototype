/*
 * jQuery prototypal inheritance plugin boilerplate
 * Author: Alex Sexton, Scott Gonzalez
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */
 
//todo: touchable elem is not necessarily the canvas elem
 
 
// myObject - an object representing a concept that you want 
// to model (e.g. a car)


/***enclose the plugin***/




;(function($){

var myObject = {
  
  init: function( options, elem ) {
    // Mix in the passed-in options with the default options
    
	this.options = $.extend( {},  this.options, options );
	
    // Save the element reference, both as a jQuery
    // reference and a normal reference
    this.elem  = elem;
	
    this.$elem = $(elem);
	
    // Build the DOM's initial structure
    this._build();

    // return this so that we can chain and use the bridge with less code.
    return this;
  },
  
  options: {
    pointer: true,
    clear: false,
    ctx: null,
	touchable: null,
    lineWidth: 2,
	strokeStyle: "red",
	debug: true,
	touchStart: function(e){},
    touchMove: function(e){},
    touchEnd: function(e){},
  },
  
  _build: function(){
       
   //this.$elem.html('<h1>'+this.options.name+'</h1>');
  
  },
  
  
  allTouchesX: [],
  allTouchesY: [],
  
  trackTouches: function(that,x,y){
  
    that.lastTouchesX = x;
	that.lastTouchesY = y;
    var allX = that.allTouchesX;
	var allY = that.allTouchesY;
	allX.push([]);
	allY.push([]);
	var i = allX.length;
	allX[i-1][0] = x;
	allY[i-1][0] = y;
	
  },
  
  stop: function(){
    
    this.$elem.off('touchstart');
	this.$elem.off('touchmove');
	this.$elem.off('touchend');
  
  },
  
  //fineTune: function(){ myMethod.apply(obj, function(){ alert('hi') }) },
  
  start: function( msg ){
    
	this.ctx = this.options.ctx;
	this.clear = this.options.clear;
	this.debug = this.options.debug;
	ctx = this.ctx;
	this.touchable = this.options.touchable;
	this.touchStart = this.options.touchStart,
	    this.touchMove = this.options.touchMove,
	    this.touchEnd = this.options.touchEnd;

	
	var off = this.$elem.offset(),
	    width = this.$elem.width(),
		height = this.$elem.height(),
	    touchesX = [],
	    touchesY = [],
		startX,
		startY;
		
    	
	ctx.lineWidth = this.options.lineWidth;
	ctx.strokeStyle = this.options.strokeStyle;
	ctx.lineCap = "round";
	
	function draw(x,y){
		
	  ctx.beginPath(); 
          
	  ctx.moveTo( x[x.length-1], y[y.length-1] );
      ctx.lineTo( x[x.length-6], y[y.length-6] ); 
      ctx.stroke();
	  ctx.closePath();
	}
	
	function emptyDraw(){
	
	  touchesX = [], touchesY = [];
	
	}
	
	//create debugger if true
	if(this.debug){
	  var debugging = $("<div><p>0</p><p>0</p></div>");
	  debugging.css({'position': 'fixed', 'left': '0px', 'top': '0px', 'background': 'rgba(30,30,30,0.95)', 'width': '20%', 'color': 'ghostwhite' })
	    .appendTo('body');
	}
	
	var self = this;
	
	if(!this.options.pointer){
   
      this.touchable.on('touchstart', function(e){
	  
        e.preventDefault();
	    if(self.clear){
	      ctx.clearRect(0,0, width, height );
	    }
        var touches = e.originalEvent.touches[0];
	    emptyDraw();
		ctx.beginPath();
        self.touchStart(e);
	  
      });

      this.touchable.on('touchmove', function(e){
      
	    var touches = e.originalEvent.touches[0];
        touchesX.push(touches.pageX-off.left);
	    touchesY.push(touches.pageY-off.top);
	  
	    draw(touchesX,touchesY);
	  
	    if(self.debug){
	    
		  debugging.find('p').eq(0).text(touches.pageX-off.left);
          debugging.find('p').eq(1).text(touches.pageY-off.top);
	       
		}
	    self.touchMove(e);
	
      });

      this.touchable.on('touchend', function(e){
      
	    ctx.closePath();
	    self.trackTouches(self,touchesX,touchesY);
	    self.$elem.trigger('drawable', [touchesX, touchesY]);
	  
	    self.touchEnd(e);
	  
      });
	
	}
	
	else{
	
	  var isActive = false;
	  this.touchable.on('pointerdown', function(e){
	  
        e.preventDefault();
		isActive = true;
	    if(self.clear){
	      ctx.clearRect(0,0, width, height );
	    }
        var touches = e.originalEvent;
	    emptyDraw();
		ctx.beginPath();
        self.touchStart(e);
	  
      });

      this.touchable.on('pointermove', function(e){
      
	    if(isActive){
	    var touches = e.originalEvent;
        touchesX.push(touches.pageX-off.left);
	    touchesY.push(touches.pageY-off.top);
	  
	    draw(touchesX,touchesY);
	  
	    if(self.debug){
	    
		  debugging.find('p').eq(0).text(touches.pageX-off.left);
          debugging.find('p').eq(1).text(touches.pageY-off.top);
	       
		}
	    self.touchMove(e);
		}
	
      });

      this.touchable.on('pointerup', function(){
      
	    isActive = false;
	    ctx.closePath();
	    self.trackTouches(self,touchesX,touchesY);
	    self.$elem.trigger('drawable', [touchesX, touchesY]);
	  
	    self.touchEnd();
	  
      });
	
	}
	  
	
	
  }
};


// Object.create support test, and fallback for browsers without it
if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}


// Create a plugin based on a defined object
$.plugin = function( name, object ) {
  $.fn[name] = function( options ) {
    return this.each(function() { 
      if ( ! $.data( this, name ) ) { 
        $.data( this, name, Object.create(object).init( 
        options, this ) );
      }
    });
  };
};


$.plugin('drawable', myObject);

}($));

