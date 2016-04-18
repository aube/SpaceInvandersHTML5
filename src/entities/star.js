function Star()
{
	
	this.type = 'star';
	
	this.destroyOnOutOfScreen = true;
	
	this.moveto = {
		x:false,
		y: canvas.height+1
	};
	//console.log(this.moveto);
	this.pos = {
		x:Math.floor((Math.random() * (canvas.width-1)) + 1),
		y:0
	};
	
	this.width = Settings.star.width;
	this.height = Settings.star.height;
	
	this.speed = this.getXY('speed');
	this.color = Settings.star.color;
	
	this.draw();
}
Star.prototype = Entity;
