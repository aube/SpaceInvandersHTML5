
function Explosion(x,y,width,height)
{
	
	this.type = 'explosion';
	
	this.destroyOnEndAnimation = true;
	
	this.width = width;
	this.height = height;
	this.pos = {x:x, y:y};
	
	
	this.moveto = {
		y:-this.height,
		x:false
	}
	
	this.speed = this.getXY('speed');
	
	this.sprite = Settings.explosion.sprite;
	this.frame = 0;
	
	
	this.draw();
	
	
}
Explosion.prototype = Entity;
