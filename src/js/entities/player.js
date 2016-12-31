
function Player()
{
	
	this.type = 'player';
	
	//this.cantOutOfScreen = true;
	
	
	this.width = Settings.player.width;
	this.height = Settings.player.height;
	this.pos = {x:canvas.width/2, y:canvas.height - Settings.player.height - canvas.height*Settings.player.marginBottom};
	
	
	this.moveto = {
		y:false,
		x:false
	}
	
	this.speed = this.getXY('speed');
	
	this.color = Settings.player.color;
	this.sprite = Settings.player.sprite;
	this.frame = 0;
	this.power = Settings.player.power;
	
	this.draw();
	
	
}
Player.prototype = Entity;
