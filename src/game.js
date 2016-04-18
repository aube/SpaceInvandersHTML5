
var SpaceInvandersHTML5 = function(canvas)
{
	

	
	//loop parameters
	var lastTime = Date.now();
	var lastFpsUpdateTime = Date.now();
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;
	
	var fpsEl = document.getElementById('fps');
	var fps = 0;
	
	//collections {star:[],enemy:[],...}
	var self = this;
	
	this.Objects = Object.create(null);
	this.sounds = Object.create(null);
	
	this.level = 0;
	this.gameOver = false;
	this.pause = false;
	
	
	this.gameStates = function()
	{
		
		if (now - lastFpsUpdateTime > 1000) {
			lastFpsUpdateTime = now;
			fpsEl.innerHTML = fps.toFixed(0) + 'fps';
		}
		
		
		//all enemies destroed, new level begin
		if (self.Objects['enemy'].length == 0)
		{
			self.startNewLevel();
		}
		
		//player destroed, game over
		if (self.Objects['player'].length == 0)
		{
			self.gameOver = true;
			self.onGameOver();
		}
		
	}
	
	
	this.startNewLevel = function()
	{
		self.level++;
		
		Settings.enemy.wave={x:0.1,y:0.2};
		Settings.enemy.speed={x:0.05,y:0.05};
		
		if (self.level%2 == 0)
		{
			Settings.enemy.speed = {x:[0.01,0.4],y:[0.01,0.4]};
		}
		
		if (self.level%3 == 0)
		{
			Settings.enemy.speed = {x:[0.01,0.4],y:[0.01,0.4]};
			Settings.enemy.wave = {x:0.3,y:0.5};
		}
		
		
		self.generateEnemies();
		
		var el = document.getElementById('level');
		el.innerHTML = 'level '+self.level;
	}
	
	
	this.onGameOver = function()
	{
		var el = document.getElementById('gameOver');
		el.style.display = 'block';
		self.Objects.player = [];
	}
	
	
	this.loop = function()
	{
		now = Date.now();
		dt = (now - lastTime) / 1000.0;
		fps = 1000 / (now - lastTime);
		lastTime = now;
		
		self.gameStates();
		self.update(dt);
		
		if (!self.pause)
			requestAnimationFrame(self.loop);
	}
	

	
	this.update = function(dt)
	{
		//each update generate new star
		if (self.Objects.star.length < Settings.star.limit)
			self.registerObject(new Star());
		
		
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		for (var type in self.Objects)
		{
			var entType = self.Objects[type];
			for (var n = 0; n < entType.length; n++)
			{
				if (!entType[n].update(dt))
				{
					//entType[n].onDestroy();
					//entType[n].onDestroy();
					entType.splice(n--,1);
				}
			}
		}
	}
	
	
	this.start = function()
	{
		
		
		self.gameOver = false;
		self.pause = false;
		self.level = 0;
		
		var el = document.getElementById('gameOver');
		el.style.display = 'none';
		
		self.Objects = Object.create(null);
		
		self.registerObject(new Star());
		
		//create player ship
		self.registerObject(new Player());
		
		//create enemies armada
		self.startNewLevel();
		
		self.loop();
		
		
		
	}
	
	
	
	this.generateEnemies = function(Entity)
	{
		for (var r = 0; r < Settings.armada.rows; r++)
		{
			for (var e = 0; e < Settings.armada.inrow; e++)
			{
				var x = Settings.armada.cellwidth * e + Settings.armada.pos.x + Settings.enemy.margin.x;
				var y = Settings.armada.cellheight * r + Settings.armada.pos.y + Settings.enemy.margin.y;
				self.registerObject(new Enemy(x,y));
			}
		}
	}
	
	
	this.registerObject = function(Entity)
	{
		
		if (undefined == this.Objects[Entity.type])
			self.Objects[Entity.type] = [];
		
		self.Objects[Entity.type].push(Entity);
		
		if (typeof Settings[Entity.type].sound == 'object')
			Settings[Entity.type].sound.play();
		
	}
	
	
	
	this.pauseToggle = function()
	{
		self.pause = !self.pause;
		var el = document.getElementById('pause');
		el.style.display = self.pause?'block':'none';
		
	}
	
	
	
	
	
	this.init = function()
	{
		//player
		Settings.player.width = Math.floor(canvas.width * Settings.player.width);
		Settings.player.height = Math.floor(canvas.height * Settings.player.height);

		//cells
		Settings.armada.cellwidth = Math.floor(canvas.width * Settings.armada.width / Settings.armada.inrow);
		Settings.armada.cellheight = Math.floor(canvas.height * Settings.armada.height / Settings.armada.rows);
		Settings.armada.pos = {x:canvas.width * (1-Settings.armada.width) / 2, y:canvas.height * Settings.armada.marginTop};

		//enemies
		Settings.enemy.margin = {x:Settings.armada.cellwidth * Settings.enemy.horisontalMargin / 2, y:Settings.armada.cellheight * Settings.enemy.verticalMargin / 2};
		Settings.enemy.width = Math.floor(Settings.armada.cellwidth - Settings.enemy.margin.x * 2);
		Settings.enemy.height = Math.floor(Settings.armada.cellheight - Settings.enemy.margin.y * 2);
		
		
		//sounds bind
		for (var n in Settings)
		{
			if (Settings[n].sound)
			{
				Settings[n].sound = new SoundPool(Settings[n].sound);
			}
		}
		
		
		//actions
		document.querySelector('#gameOver > a').addEventListener("click", function(event){
			self.start();
			event.preventDefault();
			});
		
		document.addEventListener("click", function(event){
			
			if (Game.gameOver) return;
			if (event.target != canvas) return;
			
			var player = self.Objects.player[0];
			
			player.moveto.x = event.clientX - player.width/2;
			player.moveto.y = event.clientY - player.height/2;
			self.registerObject(new Bullet(player.pos.x + player.width/2 , player.pos.y, 'enemy'));
		});
		
		
		//poehali!
		self.start();
		
	}
	

};




