var teleport;
var KeyO;
var xuclar;
var elemental;
var rZafiro;
var tiempodanyo = -1;
export var tpO = 0;

import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as enemigo from './enemigo.js'
import * as pulpo from './pulpo.js'
import * as inventario from './inventario.js'
import * as estadisticas from './estadisticas.js';
import * as game from './game.js'

export default class NivelAdri extends Phaser.Scene{
	constructor(){
		super({key: "NivelAdri"});
	}
  
	preload()
	{
		load.call(this);
		personaje.loadSprite.call(this);
		pulpo.loadEnemigo.call(this);
		magiaAzul.cargaSprites.call(this);
	}
	create()
	{
		personaje.crearPersonaje.call(this);
		personaje.ani.x = 2000;
		personaje.ani.y = 800;
		personaje.ani.setDepth(9);

		
		

		magiaAzul.preparaEscudos.call(this);
		magiaVerde.crearMagiaVerde.call(this);

		pulpo.cargarEnemigo.call(this);

		elemental = this.physics.add.group();

		animaciones.call(this);

		cargarMapa.call(this);

		this.physics.add.collider(pulpo.lanzaRocas, magiaAzul.shieldGroup, colisionador);
		this.physics.add.overlap(pulpo.lanzaRocas, personaje.ani, quitaVida, null ,this);

		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
		xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
	}
	update()
	{
		tiempodanyo--;

		personaje.controlesPersonaje.call(this);
		if(KeyO.isDown)
		{
			this.scene.start("NivelPacifico");
		}	
		personaje.tBonk.call(this);
		personaje.cBonk.call(this);

		pulpo.stalkEnemigo.call(this);
		magiaAzul.absorcion.call(this);
		magiaAzul.restaTiempo.call(this);
		magiaAzul.gestionEscudos.call(this);

		magiaVerde.tiempoVerde.call(this);

		pulpo.moverRocas.call(this);
		personaje.hit.call(this);
	}
}

function load()
{
	this.load.image('prueba','assets/mapas/mapaPacifico/prueba.png');
	this.load.image('Overworld','assets/mapas/mapaPedro/Overworld.png');
	this.load.image('remolino','assets/sprites/remolino.png');
	this.load.tilemapTiledJSON('mapaAdri','assets/mapas/mapaAdri/mapaAdri.json');
	this.load.spritesheet('portal','assets/sprites/portal.png',{frameWidth:21, frameHeight:16});
	this.load.spritesheet('pulpo','assets/sprites/pulpo_1.png',{frameWidth:32, frameHeight:32});
}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 2050,1280);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);
}

function cargarMapa()
{
	let mapaAdri = this.add.tilemap('mapaAdri');

	let Overworld = mapaAdri.addTilesetImage('Overworld');
	let prueba = mapaAdri.addTilesetImage('prueba');

	let Suelo = mapaAdri.createLayer("Suelo",[prueba], 0, 0).setDepth(0);
	let Arena = mapaAdri.createLayer("Arena",[prueba], 0, 0).setDepth(1);
	let Agua = mapaAdri.createLayer("Agua",[prueba], 0, 0).setDepth(2);
	let Hielo = mapaAdri.createLayer("Hielo",[prueba], 0, 0).setDepth(3);
	let Elevacion_1 = mapaAdri.createLayer("Elevacion_1",[prueba], 0, 0).setDepth(4);
	let Elevacion = mapaAdri.createLayer("Elevacion",[prueba], 0, 0).setDepth(5);
	let Elevacion2 = mapaAdri.createLayer("Elevacion2",[prueba], 0, 0).setDepth(6);
	let Charcos = mapaAdri.createLayer("Charcos",[prueba], 0, 0).setDepth(7);
	let Deco = mapaAdri.createLayer("Deco",[prueba], 0, 0).setDepth(8);
	let Arboles = mapaAdri.createLayer("Arboles",[prueba], 0, 0).setDepth(9);
	let Arboles2 = mapaAdri.createLayer("Arboles2",[prueba], 0, 0).setDepth(10);
	let Arboles3 = mapaAdri.createLayer("Arboles3",[prueba], 0, 0).setDepth(11);
	let Colisiones = mapaAdri.createLayer("Colisiones",[prueba], 0, 0).setDepth(-1);
	let ColisionesRoca = mapaAdri.createLayer("ColisionesRoca",[prueba], 0, 0).setDepth(-1);
	let Eventos = mapaAdri.createLayer("Eventos",[prueba, Overworld], 0, 0).setDepth(8);
	let Teleportadores = mapaAdri.getObjectLayer("Teleportadores");
	let Puzle = mapaAdri.getObjectLayer("Puzle");
	let Pulpos = mapaAdri.getObjectLayer("Pulpos");
	let Elemento = mapaAdri.getObjectLayer("Elemento");
	let PuzleResuelto = mapaAdri.getObjectLayer("PuzleResuelto");

	cargarCamara.call(this);
	this.physics.world.setBounds(0,0,2050,1280);

	////Colisiones Mapa////
	this.physics.add.collider(personaje.ani,Colisiones);
	Colisiones.setCollisionByProperty({collides:true});

	Teleportadores.objects.forEach(tp =>{
	teleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
	teleport.play('tp');
	teleport.setDepth(10);
	})

	Pulpos.objects.forEach(pul =>{
		pulpo.creacionEnemigo.call(this, pul.x, pul.y);
	})

	Elemento.objects.forEach(rem =>{
	rZafiro = elemental.create(rem.x, rem.y, 'remolino');
	rZafiro.setDepth(7);
	})

	this.physics.add.overlap(personaje.ani,teleport, pasarNivel, null, this);
	this.physics.add.overlap(personaje.hitboxInteractuar, elemental, absorberElementoAzul, null, this);
}

function animaciones()
{
	this.anims.create({
		key: "tp",
		frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
		repeat: -1,
		frameRate: 10,
	});
}

function absorberElementoAzul(p,e)
{
	if (xuclar.isDown && estadisticas.gemas == 1)
	{
		magiaAzul.recargaElementalAzul.call(this);
		e.disableBody(true,true);
		e.destroy();
	}
}

function recogerManzana(p,m)
{
	if (xuclar.isDown)
	{
		m.disableBody(true,true);
		m.destroy();
		inventario.anyadirManzana.call(this);
  }
}

function quitaVida(r, p)
{
	p.destroy();
	if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
		personaje.hitted2.call(this, p.x , p.y);
		estadisticas.quitarVida.call(this);
	}
	
}

function colisionador(r, e)
{
	console.log("probando")
}

function pasarNivel()
{
	tpO = 1;
	this.scene.start("NivelPacifico");
}

export function cambiarTp()
{
	tpO = 0;
}