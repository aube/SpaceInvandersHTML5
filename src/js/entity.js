//прототип для всех объектов в игре

var Entity = {
	
	/*
	 * Дополнительные параметры поведения объектов
	 * 
	destroyOnOutOfScreen - уничтожение объекта при выходе за границу экрана (true/false)
	cantOutOfScreen - запрет выхода за пределы экрана (true/false)
	destroyOnEndAnimation - уничтожение объекта по завершении анимации (true/false)
	targets - уничтожение при столкновении (тип объекта),
	*/
	
	destroyOnOutOfScreen:false,
	cantOutOfScreen:false,
	destroyOnEndAnimation:false,
	targets:false,
	
	
	//пересчет координат,
	//вызов методов для контроля столкновений и выхода за границу экрана
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
				this.frame++;
			
			if (this.frame >= this.sprite.len)
				if (this.destroyOnEndAnimation)
					return false;
				else
					this.frame = 0;
			
		}
		
		this.draw();
		return true;
	}
	
	//рассчет волнообразного движения объекта (применяется в enemy)
	,waveCalculate: function()
	{
		
		var offsetX = (Math.round((Math.random()) * 10) % 2 == 0 ? -1 : 1);
		var offsetY = (Math.round((Math.random()) * 10) % 2 == 0 ? -1 : 1);
		
		
		if (this.wave.x && this.moveto.x === false)
			this.moveto.x = offsetX * this.wave.x + this.pos0.x;
		
		if (this.wave.y && this.moveto.y === false)
			this.moveto.y = offsetY * this.wave.y + this.pos0.y;
		
	}
	
	//проверка столкновения с указанным в настройках типом объекта
	,checkCollision: function(targetName)
	{
		targetName = targetName || this.targets;

		if (targetName)
		{
			if (targetName instanceof Array) {
				var n = 0;
				var result = true;
				while(targetName[n])
					result *= this.checkCollision(targetName[n++]);
				return result;
			}
			var targets = Game.Objects[targetName];
			if (targets && targets.length)
				for(var n=0; n < targets.length; n++)
				{
					if (!(this.pos.x+this.width <= targets[n].pos.x
						|| this.pos.x > targets[n].pos.x+targets[n].width
						|| this.pos.y+this.height <= targets[n].pos.y
						|| this.pos.y > targets[n].pos.y+targets[n].height))
					{
						if (targets[n].power <= this.power) {
							targets[n].onDestroy();
							targets.splice(n,1);
						} else {
							targets[n].power -= this.power;
						}
						return false;
					}
				}
		}
		
		return true;
	}
	
	
	//столкновение
	//создание взрыва
	,onDestroy: function()
	{
		Game.registerObject(new Explosion(this.pos.x,this.pos.y, this.width,this.height));
		
	}
	
	//проверка выхода за границы экрана
	//уничтожение объекта "star" или запрет выхода "player"
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
	
	//отрисовка объекта
	//drawImage если указан спрайт
	//fillRect в остальных случаях
	,draw: function(){
		ctx.save();
		
		if (typeof this.sprite == 'object')
		{
			ctx.drawImage(spritesImage,
				this.sprite.width * this.frame,
				this.sprite.top,
				this.sprite.width, this.sprite.height,
				this.pos.x, this.pos.y, this.width, this.height);
		}
		else
		{
			ctx.fillStyle = this.color;
			ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
		}
		ctx.restore();
	}
	
	//получение числовых параметров из настроек
	,getXY: function(paramName){
		
		var x, y;
		var param = Settings[this.type][paramName];
		
		function getX(x)
		{
			return (''+x).indexOf('.') < 0 ? +x : canvas.width * x;
		}
		
		function getY(y)
		{
			return (''+y).indexOf('.') < 0 ? +y : canvas.height * y;
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


