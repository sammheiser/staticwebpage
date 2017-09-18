var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var cox = canvas.width/2;
var coy = canvas.height/2;

var radius=30;

var lvalues = [10,40,30,20];
var rvalues = [20,20,10];
var lstrokes = [10,40,30,20];
var rstrokes = [20,20,10];

var grd = ctx.createLinearGradient(0,0,canvas.width,0);
grd.addColorStop(0,"grey");
grd.addColorStop(1,"#eee");

function Node (x,y,radius,style) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.style = style;
	this.plot = function() {
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.strokeStyle='rgba(0,0,0,0)';
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
		ctx.fillStyle=this.style;
		ctx.fill();
		ctx.stroke(); 
	};
}

function Path (x,y,density,grd) {
	this.x = x;
	this.y = y;
	this.density = density;
	this.grd = grd;
	this.plot = function() {
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.bezierCurveTo((x+cox)/2,y,(x+cox)/2,coy,cox,coy);
		ctx.strokeStyle=this.grd;
		ctx.lineWidth=this.density;
		ctx.stroke();
	};
}

var n = new Node(cox,coy,radius,'#BF7E72');
var leftnodes = [];
var leftpaths = [];
for(var i=1; i<=lvalues.length;i++) {
	leftnodes[i] = new Node(cox*2/5,(i/(lvalues.length+1))*canvas.height,lvalues[i-1],'#7ECEC4');
	leftpaths[i] = new Path(leftnodes[i].x,leftnodes[i].y,lstrokes[i-1]);
	leftpaths[i].plot();
	leftnodes[i].plot();
}

var rightnodes = [];
var rightpaths = [];
for(var i=1; i<=rvalues.length;i++) {
	rightnodes[i] = new Node(2*cox*4/5,(i/(rvalues.length+1))*canvas.height,rvalues[i-1],'#F4D02A');
	rightpaths[i] = new Path(rightnodes[i].x,rightnodes[i].y,rstrokes[i-1]);
	rightpaths[i].plot();
	rightnodes[i].plot();
}

n.plot();

function drawScreen() {
		var gradient = context.createLinearGradient( 0,0,mw,0);
		for (var i=0; i < colorStops.length; i++) {
			var tempColorStop = colorStops[i];
			var tempColor = tempColorStop.color;
			var tempStopPercent = tempColorStop.stopPercent;
			gradient.addColorStop(tempStopPercent,tempColor);
			tempStopPercent += .015;
			if (tempStopPercent > 1) {
				tempStopPercent = 0;
			}
			tempColorStop.stopPercent = tempStopPercent;;
			colorStops[i] = tempColorStop;
		}
		
		
		context.fillStyle    = gradient;
		context.fillText  ( message,  xPosition ,yPosition);	
	
}


function gameLoop() {
	window.setTimeout(gameLoop, 20);
	drawScreen();
}

gameLoop();
