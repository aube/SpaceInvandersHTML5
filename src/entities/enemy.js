function Enemy(x,y)
{
	
	this.destroyOnOutOfScreen = false;
	
	this.type = 'enemy';
	this.targets = 'player';
	this.pos0 = {x:x, y:y};
	this.pos = {x:x, y: y - Settings.armada.height*canvas.height - Settings.armada.marginTop*canvas.height};
	
	this.moveto = {x:x, y:y};
	
	this.width = Settings.enemy.width;
	this.height = Settings.enemy.height;
	
	this.speed = this.getXY('speed');
	this.wave = this.getXY('wave');
	console.log(this.wave);
	
	//this.wave = {
	//	x:Settings.armada.width * this.wave.x * canvas.width,
	//	y:Settings.armada.height * this.wave.y * canvas.height
	//}
	
	//console.log(this.wave);
	
	
	this.color = Settings.enemy.color;
	this.sprite = Settings.enemy.sprite;
	this.frame = 0;
	
	this.draw();
	
	this.getPosition = function()
	{
		
	}
	
}
Enemy.prototype = Entity;
