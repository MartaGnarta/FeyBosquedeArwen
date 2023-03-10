export var ani;
var golpeado = 0;
var codigo = 0;
var KeyW;
var KeyS;
var KeyD;
var KeyA;
var BONK;
var MAGIC;
var DEFENSE;
var espada;
var dir1;
var dir2;
var dx;
var dy;
var dir;  
var tiempozoom = -1;
var tiempo
export var direccion = 3;
export var hitboxPrueba;
export var hitboxDanyo;
export var hitboxInteractuar;
export var hitboxBonkList;
export var tiempoBonk = -1;
export var cooldownBonk = -1;
var hitboxsize = 4;
var h;
var i;
var KeyONE;

import * as enemigo from './enemigo.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as game from './game.js'
import * as inventario from './inventario.js'
import * as estadisticas from './estadisticas.js'
import * as gameOver from './gameOver.js'
export function loadSprite()
{
	this.load.spritesheet('playerAni', 'assets/sprites/Fey.png', {frameWidth:52, frameHeight:90});
	this.load.spritesheet('playerAniAtaque', 'assets/sprites/FeyAtaque.png', {frameWidth:105, frameHeight:116});
	this.load.spritesheet('espada','assets/sprites/SwordAttack.png',{frameWidth:64, frameHeight:64});
	this.load.image('playerMagia','assets/images/magia.png');
	this.load.image('hitboxPrueba','assets/hitbox/hitboxPrueba.png');
	this.load.image('hitboxDanyo','assets/hitbox/hitboxDanyo.png');
	this.load.image('hitboxBonk','assets/hitbox/hitboxBonk.png');

}
export function crearPersonaje()
{
	
	ani = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'playerAni');
	
	////HITBOXES///
	hitboxInteractuar = this.physics.add.sprite(ani.x,ani.y, 'hitboxPrueba');
	//hitboxInteractuar.setSize(1, hitboxInteractuar.height/2);

	hitboxPrueba = this.physics.add.sprite(ani.x,ani.y, 'hitboxPrueba');
	hitboxPrueba.setScale(hitboxsize,hitboxsize);

	hitboxDanyo = this.physics.add.sprite(ani.x,ani.y, 'hitboxDanyo');
	hitboxDanyo.setScale(0.3,0.3);

	hitboxBonkList = this.physics.add.group();

	ajustesPersonaje.call(this);

	teclasPersonaje.call(this);

	animacionesPersonaje.call(this);

}

function ajustesPersonaje()
{
	ani.setOrigin(0.5,0.5);
	ani.setScale(0.3, 0.3);
	ani.setDepth(6);
	ani.velocity = 1.5;
	ani.health = 4;
	ani.setCollideWorldBounds(true);

	dir1=new Phaser.Math.Vector2(1,0);
	dir1.normalize();

	dir2=new Phaser.Math.Vector2(0,1);
	dir2.normalize();

	ani.setSize(ani.width / 2, ani.height / 3)
	ani.setOffset(4.5+ani.width / 2 * ani.scale , ani.height / 1.5)
}

function teclasPersonaje()
{
	KeyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	KeyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	KeyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	KeyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	BONK=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	MAGIC=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
	DEFENSE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
	KeyONE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
}

function animacionesPersonaje()
{
	this.anims.create({
		key: "frontIdle",
		frameRate: 2,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 0, end:2}),
		repeat: -1
	});
	this.anims.create({
       key: "down",
       frameRate: 3,
       frames: this.anims.generateFrameNumbers("playerAni", {start: 3, end:4}),
       repeat: -1
    });
	this.anims.create({
		key: "up",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 11, end:12}),
		repeat: -1
	});
	this.anims.create({
		key: "right",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 5, end:7}),
		repeat: -1
	});
	this.anims.create({
		key: "left",
		frameRate: 3,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 8, end:10}),
		repeat: -1
	});
	this.anims.create({
		key: "backIdle",
		frameRate: 2,
		frames: this.anims.generateFrameNumbers("playerAni", {start: 13, end:14}),
		repeat: -1
	});

	this.anims.create({
		key:'bonkRight',
		frameRate: 525,
		frames:this.anims.generateFrameNames('playerAniAtaque',{start:0, end:1}),
	});
	this.anims.create({
		key:'bonkLeft',
		frameRate: 5,
		frames:this.anims.generateFrameNames('playerAniAtaque',{start:2, end:3}),
	});
}

export function controlesPersonaje()
{
	tiempozoom -= 1;
	this.cameras.main.startFollow(ani);
	if(golpeado == 0 && cooldownBonk < 0)
	{
		if (KeyS.isDown)
		{
			direccion = 3;
			ani.setVelocityY(100);
			ani.setVelocityX(0);
			if (Phaser.Input.Keyboard.JustDown(KeyS))
			{
				ani.anims.play("down");
				ani.setVelocityX(0);
			}
		}
		else if (KeyW.isDown)
		{
			direccion = 1;
			ani.setVelocityY(-100);
			ani.setVelocityX(0);
			if (Phaser.Input.Keyboard.JustDown(KeyW))
			{
				ani.anims.play("up");
			}
		}
		else if (KeyD.isDown)
		{
			direccion = 2;
			ani.setVelocityX(100);
			ani.setVelocityY(0);
			if (Phaser.Input.Keyboard.JustDown(KeyD))
			{
				ani.anims.play("right");
			}
		}
		else if (KeyA.isDown)
		{
			direccion = 4;
			ani.setVelocityX(-100);
			ani.setVelocityY(0);
			if (Phaser.Input.Keyboard.JustDown(KeyA))
			{
				ani.anims.play("left");
			}
		}

		if(!KeyA.isDown && !KeyD.isDown && !KeyW.isDown && !KeyS.isDown)
		{
			ani.setVelocityX(0);
			ani.setVelocityY(0);
		}

		if (Phaser.Input.Keyboard.JustUp(KeyS) && direccion == 3) 
		{
			ani.anims.play("frontIdle");
			ani.setVelocityX(0);
		}
		if (Phaser.Input.Keyboard.JustUp(KeyW) && direccion == 1) // Faltara añadir animaciones de idle lados + espaldas
		{
			ani.anims.play("backIdle");
			ani.setVelocityX(0);
		}
		if (Phaser.Input.Keyboard.JustUp(KeyD) && direccion == 2) // Faltara añadir animaciones de idle lados + espaldas
		{
			ani.anims.play("frontIdle");
			ani.setVelocityY(0);
		}
		if (Phaser.Input.Keyboard.JustUp(KeyA) && direccion == 4) // Faltara añadir animaciones de idle lados + espaldas
		{
			ani.anims.play("frontIdle");
			ani.setVelocityY(0);
		}


		if (BONK.isDown)
		{
			ani.setVelocityY(0);
			ani.setVelocityX(0);
			bonk.call(this);
		}
		if (Phaser.Input.Keyboard.JustDown(KeyONE))
		{
			inventario.comerManzana.call(this);
		}
		if (MAGIC.isDown)
		{
			magiaVerde.disparoMagiaVerde.call(this);
		}
		if (DEFENSE.isDown)
		{
			magiaAzul.proteccion.call(this);
		}
		if (Phaser.Input.Keyboard.JustDown(KeyS))
		{
			ani.anims.play("down");
		}
	}

	movimientoHitbox.call(this);
	zoomCamara.call(this);
}

export function hit()
{	
	if(golpeado > 0)
		{
			golpeado += 1;

			if (golpeado > 20	)
			{
				ani.clearTint()
				golpeado = 0
			}
		}
}

export function hitted()
{
	dx = ani.x - enemigo.enemigoAzul.x
	dy = ani.y - enemigo.enemigoAzul.y

	dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

	ani.setVelocity(dir.x, dir.y)

	ani.setTintFill(0xFF0000)

	if (ani.health > 1) 
	{
		ani.health -=1;
	}
	else
	{
		ani.setTintFill(0xffffff)
	}

	golpeado = 1;
}

export function hitted2(r1, r2)
{
	dx = ani.x - r1
	dy = ani.y - r2

	dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

	ani.setVelocity(dir.x, dir.y)

	ani.setTintFill(0xFF0000)

	if (ani.health > 1) 
	{
		ani.health -=1;
	}
	else
	{
		ani.setTintFill(0xffffff)
	}

	golpeado = 1;
}

function zoomCamara()
{
	if(tiempozoom == 0)
	{
		this.cameras.main.setZoom(2);
		tiempozoom = -1;
	}
}

function bonk()
{
	if(direccion == 2)
	{
		cooldownBonk = 25;
		if (Phaser.Input.Keyboard.JustDown(BONK) && cooldownBonk == 25)
		{
			tiempoBonk = 25;
			ani.anims.play("bonkRight");
			h=hitboxBonkList.create(ani.x+12,ani.y, 'hitboxBonk');
		}
	}
	else if(direccion == 4)
	{
		cooldownBonk = 25;
		if (Phaser.Input.Keyboard.JustDown(BONK) && cooldownBonk == 25)
		{
			tiempoBonk = 25;
			ani.anims.play("bonkLeft");
			h=hitboxBonkList.create(ani.x-12,ani.y, 'hitboxBonk');
		}
	}
}

export function tBonk()
{
	tiempoBonk -=1;
	if(tiempoBonk == 0)
	{
		for(i = 0; i < hitboxBonkList.getChildren().length; i++)
		{
			hitboxBonkList.getChildren()[i].destroy();
		}

		if(KeyD.isDown)
		{
			ani.anims.play("right");
		}
		else if(KeyA.isDown)
		{
			ani.anims.play("left");
		}
		else
		{
			ani.anims.play("frontIdle");
		}
	}
}
	
export function cBonk()
{
	cooldownBonk -=1;
}

function corteEspada()
{
	espada=this.add.sprite(ani.x,ani.y,'espada');
	espada.play('slash');
	this.cameras.main.setZoom(3);
	tiempozoom = 150;
}

function movimientoHitbox()
{
	hitboxPrueba.x = ani.x;
	hitboxPrueba.y = ani.y;

	hitboxInteractuar.x = ani.x;
	hitboxInteractuar.y = ani.y;

	hitboxDanyo.x = ani.x;
	hitboxDanyo.y = ani.y;
}

export function curarVida()
{
	ani.health++;
	estadisticas.sumarVida.call(this);
}