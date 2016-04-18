
function SoundPool(filename, size)
{
	var size = size || 10;
	var sounds = [];
	var current = 0;

	this.init = function(type) {
		for (var i = 0; i < size; i++)
		{
			var sound = new Audio(filename);
			sound.volume = .3;
			sound.load();
			sounds.push(sound);
		}
	}();

	this.play = function() {
		sounds[current].play();
		current = (current + 1) % size;
	};
}

