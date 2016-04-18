'use strict';

/*Настройки игры
Значение некоторых параметров пересчитываются в зависимости от типа данных:
- Integer (кол-во пикселей),
- Float (в процентах от ширины для X и высоты для Y экрана)
- Array {x:[min,max],y:[min,max]} - rand(min,max)
при этом min и max так же могут быть Integer и Float
*/

var Settings = Object.create(null);

//Player
Settings.player = {
	width:.1
	,height:.06
	,speed:{x:0.7,y:0.7}
	,marginBottom:.01
	,sprite:{width:39,height:25,top:0,len:1}
}

//Bullet
Settings.bullet = {
	width:2 //px
	,height:7 //px
	,speed:{x:0,y:1.6}
	,color:"yellow"
	,sound:'sounds/laser.mp3'
}

//Star
Settings.star = {
	width:1 //px
	,height:1 //px
	,speed:{x:10,y:[0.1,4.1]}
	,color:"white"
	,limit:50
}


//Armada - cетка для объектов enemy
Settings.armada = {
	inrow:7
	,rows:3
	,width:.8
	,height:.2
	,marginTop:.2
}

//Enemies
//если заполнен параметр wave и скорость объектов
//различается (при указании min и max), объекты ломают строй
//и начинают перемещаться хаотично
Settings.enemy = {
	horisontalMargin:.4
	,verticalMargin:.6
	,wave:{x:0.4,y:1.2}
	,speed:{x:30,y:40}
	,sprite:{width:38,height:28,top:78,len:1}
}

//Explosions
Settings.explosion = {
	speed:{x:0,y:0}
	,sprite:{width:512/13,height:38,top:32,len:12}
	,sound:'sounds/boom2.mp3'
}




