import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as NivelPedro from './NivelPedro.js'
export var cajaEmbestida;
var c;
var stalk = 0;
var enemigoGolpeado = 0;
var dx;
var dy;
var dir;
var embestida = 0;
var esencia;
var enemigoVivo = true;
var playerCerca;
var INTERACTUE;
export var tenredado = -1;
export var hitboxInteractuar;
var enredado = 0;
var planta;
export var tembestida = -1;
export var tcargaembestida = 10;

export function loadEnemigo()
{
	this.load.image('cajaEmbestida','assets/images/badbox.png');
	this.load.image('planta', 'assets/images/planta.png');
	this.load.image('esencia', 'assets/images/esencia.png');
	this.load.image('hitboxPrueba','assets/hitbox/hitboxPrueba.png');
}
export function cargarEnemigo()
{
	cajaEmbestida = this.physics.add.sprite(915,840,'cajaEmbestida');

	INTERACTUE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

	this.physics.add.overlap(magiaVerde.verdeList, cajaEmbestida, raiz, null, this);
	this.physics.add.overlap(personaje.hitboxPrueba, cajaEmbestida, activarStalk, null, this);
	this.physics.add.overlap(cajaEmbestida, personaje.hitboxBonkList, enemigoColisionVida, null, this);

	ajustesEnemigo.call(this);
}

function ajustesEnemigo()
{
	cajaEmbestida.setOrigin(0.5,0.5);
	cajaEmbestida.setScale(0.1, 0.1);
	cajaEmbestida.setDepth(13);
	cajaEmbestida.health = 2;
	cajaEmbestida.velocidad = 40;
	cajaEmbestida.direccion = new Phaser.Math.Vector2(1,1);
	cajaEmbestida.direccion.normalize();
	cajaEmbestida.vivo = 1;
}

function activarStalk()
{
	stalk = 1;
}

export function stalkEnemigo()
{
	if(!enredado && cajaEmbestida.vivo == 1)
	{
		if(stalk && embestida == 0)
		{
			c= new Phaser.Math.Vector2(personaje.ani.x - cajaEmbestida.x, personaje.ani.y - cajaEmbestida.y);
			c.normalize();
			cajaEmbestida.direccion = c;
		}

		if(stalk)
		{
			cajaEmbestida.setVelocityX(cajaEmbestida.velocidad * cajaEmbestida.direccion.x);
			cajaEmbestida.setVelocityY(cajaEmbestida.velocidad * cajaEmbestida.direccion.y);
		}
	}
	else if(enredado && cajaEmbestida.vivo == 1)
	{
		cajaEmbestida.setVelocityY(0);
		cajaEmbestida.setVelocityX(0);
	}
}

export function rush()
{
	tembestida --;

	if(tembestida < 0)
	{
		tcargaembestida --;
		cajaEmbestida.velocidad = 0;
		if(tcargaembestida < 0)
		{
			cajaEmbestida.velocidad = 140;
			tcargaembestida = 10;
			tembestida = 200;
			embestida = 1;
		}
	}
	else if(tembestida == 100)
	{
		cajaEmbestida.velocidad = 40;
		embestida = 0;
	}
}

export function noStalk()
{
	if(cajaEmbestida.health < 2)
	{
		stalk = 1;
		cajaEmbestida.velocidad = 80;
	}
}

function raiz(c,v)
{
	if (!enredado)
	{
		planta = this.physics.add.sprite(cajaEmbestida.x,cajaEmbestida.y,'planta');
		planta.setDepth(14);
		planta.setScale(0.05,0.05);
		enredado= 1;
		tenredado = 100;
		v.disableBody(true,true);
		magiaVerde.verdeList.remove(v);
		v.destroy();
	}
}

export function traiz()
{
	tenredado --;

	if (tenredado == 0)
	{
		enredado = 0;
		planta.destroy();
	}
}

function enemigoColisionVida()
{
	cajaEmbestida.health --;
	if(cajaEmbestida.health == 0)
	{
		esencia = this.physics.add.sprite(cajaEmbestida.x,cajaEmbestida.y,'esencia');
		esencia.setScale(0.7,0.7);
		esencia.setDepth(20);
		esencia.setSize(100,100);
		this.physics.add.overlap(esencia, NivelPedro.arbolMaloGordo, sanar, null, this);
		this.physics.add.overlap(esencia, personaje.hitboxInteractuar, enemigoColisionVida, null, this);
		cajaEmbestida.vivo = 0;
		cajaEmbestida.destroy();
	}
}
function sanar()
{
	if (INTERACTUE.isDown)
	{
		console.log("Adri matao");
		NivelPedro.purificar.call(this);
		esencia.destroy();
	}
}
/*export function enemyHit()
{	
	if(enemigoGolpeado > 0)
		{
			enemigoGolpeado += 1;
			if (enemigoGolpeado > 30)
			{
				enemigoAzul.clearTint()
				enemigoGolpeado = 0
			}
		}
}
export function enemyHitted()
{
	dx = enemigoAzul.x - personaje.ani.x;
	dy = enemigoAzul.y - personaje.ani.y;
	dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
	enemigoAzul.setVelocity(dir.x, dir.y);
	enemigoAzul.setTintFill(0xFF0000);
	if (enemigoAzul.health > 1) 
	{
		enemigoAzul.health -=1;
	}
	else
	{
		enemigoVivo = false;
		enemigoAzul.destroy();
	}
	enemigoGolpeado = 1;
}*/