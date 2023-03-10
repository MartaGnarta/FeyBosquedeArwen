import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
export var enemigoAzul;
var t;
var stalk = 0;
var enemigoGolpeado = 0;
var dx;
var dy;
var dir;
var enemigoVivo = true;

export function loadEnemigo()
{
	this.load.spritesheet('enemigoAzul', 'assets/sprites/spritesheet2.png', {frameWidth:56, frameHeight:64});
}
export function cargarEnemigo()
{
	if(enemigoVivo)
	{
		enemigoAzul = this.physics.add.sprite(550,280,'enemigoAzul');

		ajustesEnemigo.call(this);

		this.physics.add.overlap(personaje.hitboxPrueba, enemigoAzul, activarStalk, null, this);
	}

}

function ajustesEnemigo()
{
	enemigoAzul.setOrigin(0.5,0.5);
	enemigoAzul.setScale(0.8,0.8);
	enemigoAzul.setDepth(6)
	enemigoAzul.health = 2;
	enemigoAzul.setCollideWorldBounds(true);
	enemigoAzul.velocidad = 40;
}

function activarStalk()
{
	stalk = 1;
}

export function stalkEnemigo()
{
	if(stalk && enemigoGolpeado == 0 && enemigoVivo == true && personaje.ani.health > 0)
	{
		t= new Phaser.Math.Vector2(personaje.ani.x - enemigoAzul.x, personaje.ani.y - enemigoAzul.y);
		t.normalize();
		enemigoAzul.direccion = t;

		enemigoAzul.setVelocityX(enemigoAzul.velocidad * enemigoAzul.direccion.x);
		enemigoAzul.setVelocityY(enemigoAzul.velocidad * enemigoAzul.direccion.y);
	}
}

export function noStalk()
{
	if(enemigoAzul.health < 2)
	{
		stalk = 1;
		enemigoAzul.velocidad = 80;
	}
}

export function enemyHit()
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
}
/*function animacionesEnemigo()
{

}*/