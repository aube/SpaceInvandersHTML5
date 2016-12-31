
function Bullet(x, y, targets)
{
	
	this.type = 'bullet';
	
	this.destroyOnOutOfScreen = true;
	this.targets = targets;
	
	
	this.width = Settings.bullet.width;
	this.height = Settings.bullet.height;
	this.pos = {x:x, y:y};
	
	
	this.moveto = {
		y:-this.height*2,
		x:false
	}
	
	this.speed = this.getXY('speed');
	
	this.color = Settings.bullet.color;
	this.power = Settings.bullet.power;

	this.draw();
	
	
}
Bullet.prototype = Entity;

