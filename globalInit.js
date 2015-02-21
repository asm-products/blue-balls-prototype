'use strict';

var canvas = document.getElementById('canvas'),
    canvasFooter = document.getElementById('canvasFooter'),
    canvasHeader = document.getElementById('canvasHeader');

var ctx = canvas.getContext('2d'),
    ctx2 = canvasFooter.getContext('2d'),
    ctx3 = canvasHeader.getContext('2d')
    
ctx3.strokeStyle = 'white';
ctx3.font = "14pt Arial";
	
		
var BlueGame = {} || 'BlueGame';

