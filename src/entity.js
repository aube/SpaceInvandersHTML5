//prototipe for all objects in game

var Entity = {
	
	update:function(dt)
	{
		
		if (!this.checkOutOfScreen())
			return false;
		
		if (!this.checkCollision())
			return false;
		
		
		if (this.moveto.x !== false)
		{
			if (this.moveto.x == this.pos.x)
				this.moveto.x = false;
			else if (this.moveto.x < this.pos.x)
				this.pos.x -= Math.min(this.speed.x * dt, this.pos.x - this.moveto.x);
			else
				this.pos.x += Math.min(this.speed.x * dt, this.moveto.x - this.pos.x);
		}
		
		if (this.moveto.y !== false)
		{
			if (this.moveto.y == this.pos.y)
				this.moveto.y = false;
			else if (this.moveto.y < this.pos.y)
				this.pos.y -= Math.min(this.speed.y * dt, this.pos.y - this.moveto.y);
			else
				this.pos.y += Math.min(this.speed.y * dt, this.moveto.y - this.pos.y);
		}
		
		
		if (typeof this.wave == 'object')
			this.waveCalculate();
		
		if (typeof this.sprite == 'object')
		{
			if (this.sprite.len > 1)
			{
				this.frame++;
				//console.log(this.frame);
			}
			if (this.frame >= this.sprite.len)
				if (this.destroyOnEndAnimation)
					return false;
				else
					this.frame = 0;
			
		}
		
		this.draw();
		return true;
	}
	
	,waveCalculate: function()
	{
		
		var offsetX = this.pos0.x - this.pos.x;
		var offsetY = this.pos0.y - this.pos.y;
		
		
		if (this.wave.x && this.moveto.x === false)
			this.moveto.x = (offsetX >= 0 ? 1:-1) * this.wave.x + this.pos0.x;
		
		if (this.wave.y && this.moveto.y === false)
			this.moveto.y = (offsetY >= 0 ? 1:-1) * this.wave.y + this.pos0.y;
		
	}
	
	,checkCollision: function()
	{
		
		if (typeof this.targets !== 'undefined')
		{
			var targets = Game.Objects[this.targets];
			for(var n=0; n < targets.length; n++)
			{
				if (!(this.pos.x+this.width <= targets[n].pos.x
					|| this.pos.x > targets[n].pos.x+targets[n].width
					|| this.pos.y+this.height <= targets[n].pos.y
					|| this.pos.y > targets[n].pos.y+targets[n].height))
				{
					targets[n].onCollision();
					targets.splice(n,1);
					return false;
				}
			}
		}
		
		return true;
	}
	
	
	,onCollision: function()
	{
		Game.registerObject(new Explosion(this.pos.x,this.pos.y, this.width,this.height));
		
	}
	
	,checkOutOfScreen: function()
	{
		if (this.destroyOnOutOfScreen)
		{
			if (this.pos.x > canvas.width
				|| this.pos.x + this.width < 0
				|| this.pos.y > canvas.height
				|| this.pos.y + this.height < 0)
				return false;
		}
		
		if (this.cantOutOfScreen)
		{
			if (this.pos.x + this.width > canvas.width)
				this.pos.x = canvas.width - this.width;
			
			if (this.pos.x < 0 )
				this.pos.x = 0;
			
			if (this.pos.y + this.height > canvas.height)
				this.pos.y = canvas.height - this.width;
			
			if (this.pos.y < 0)
				this.pos.y = 0;
			
		}
		return true;
	}
	
	,draw: function(){
		ctx.save();
		
		if (typeof this.sprite == 'object')
		{
			ctx.drawImage(spritesImage,
						this.sprite.width * this.frame,
						this.sprite.top,
						this.sprite.width, this.sprite.height,
						this.pos.x,this.pos.y,this.width,this.height)
		}
		else
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height);
		}
		ctx.restore();
	}
	
	//получение числовых параметров из настроек
	,getXY: function(paramName){
		
		var x,y;
		var param = Settings[this.type][paramName];
		
		function getX(x)
		{
			return (''+x).indexOf('.')<0 ? 1*x : canvas.width * x;
		}
		
		function getY(y)
		{
			return (''+y).indexOf('.')<0 ? 1*y : canvas.height * y;
		}
		
		if (typeof param.x === 'object')
			x = Math.floor((Math.random() * getX(param.x[1])) + getX(param.x[0]));
		else
			x = getX(param.x);
		
		if (typeof param.y === 'object')
			y = Math.floor((Math.random() * getY(param.y[1])) + getY(param.y[0]));
		else
			y = getY(param.y);
		
		return {
			x:x,
			y:y
		}
		
	}
	
	
}


