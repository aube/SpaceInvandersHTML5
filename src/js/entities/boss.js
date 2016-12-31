function Boss()
{
	var x = canvas.width/2;
	var y = canvas.height/2;

	this.destroyOnOutOfScreen = false;
	
	this.type = 'boss';
	this.targets = 'player';
	this.pos0 = {x: 0, y: 0};
	this.pos0 = {x: x, y: y};
	this.pos = {x: x, y: y};
	this.moveto = {x: x, y: y};
	//this.pos = {x:10, y:10};
	
	this.speed = this.getXY('speed');
	this.wave = this.getXY('wave');
	
	
	//this.wave = {
	//	x:Settings.armada.width * this.wave.x * canvas.width,
	//	y:Settings.armada.height * this.wave.y * canvas.height
	//}
	
	//console.log(this.wave);
	
	this.width = Settings.boss.width;
	this.height = Settings.boss.height;

	//this.color = Settings.boss.color;
	this.sprite = Settings.boss.sprite;
	this.frame = 0;
	this.power = Settings.boss.power;

	this.draw();
	
	// this.getPosition = function()
	// {
		
	// }
	
}


Boss.prototype = Entity;
