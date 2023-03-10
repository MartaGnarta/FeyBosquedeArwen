import * as personaje from './personaje.js'
import * as magiaAzul from './magiaAzul.js'

var splatoon;
export var lanzaRocas;
var pulpito;
var roca;
var stalk = 0;
var t;
var i;
var b;
var dx;
var dy;
var dir;
var guardar1;
var guardar2;
var timer = 0;

var creada = 0;

export function loadEnemigo()
{
	this.load.spritesheet('pulpo','assets/sprites/pulpo_1.png',{frameWidth:32, frameHeight:32});
	this.load.image('roca','assets/images/roca.png');
}
export function cargarEnemigo()
{
	splatoon = this.physics.add.group();
	lanzaRocas = this.physics.add.group();

	this.anims.create({
	key: "pulping",
	frames: this.anims.generateFrameNumbers("pulpo", {start:0, end:1}),
	repeat: -1,
	frameRate: 1,
	});
}

export function creacionEnemigo(pulX, pulY)
{
	pulpito = splatoon.create(pulX, pulY, 'pulpo');
	pulpito.play('pulping');
	pulpito.setDepth(10);
	pulpito.direccion = 0;

	this.physics.add.overlap(personaje.hitboxPrueba, pulpito, activarStalk, null, this);
}

function activarStalk()
{
	t= new Phaser.Math.Vector2(personaje.ani.x - pulpito.x, personaje.ani.y - pulpito.y);
	t.normalize();
	pulpito.direccion = t;
	stalk = 1;
}

export function stalkEnemigo()
{
	if (timer > 0) {timer--;}

	if(stalk && pulpito.direccion != 0 && timer == 0)
	{
		roca = lanzaRocas.create(pulpito.x, pulpito.y ,'roca')
		roca.direccion = pulpito.direccion;
		roca.velocidad = 80;
		roca.setDepth(6)
		roca.setScale(0.6,0.6)
		timer = 180;
	}
}

export function moverRocas()
{
	for (i=0; i < lanzaRocas.getChildren().length; i++)
	{
		b=lanzaRocas.getChildren()[i];
		b.setVelocityX(b.velocidad * b.direccion.x)
		b.setVelocityY(b.velocidad * b.direccion.y)
	}
}