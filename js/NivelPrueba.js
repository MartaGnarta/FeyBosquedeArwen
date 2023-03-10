import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
var setorigin = 0.5;
var cajascale= 0.8;
var cajamala;
var colisiones;
var KeyO;
var TopLayer;
var enredado;
var planta;
var tenredado;
export var tpE = 0;
export default class NivelPrueba extends Phaser.Scene{
	constructor(){
		super({key: "NivelPrueba"});
	}
  
	preload()
	{
		load.call(this);
		personaje.loadSprite.call(this);
		this.load.image('planta','assets/images/planta.png');
	}

	create()
	{
		personaje.crearPersonaje.call(this);
		magiaVerde.crearMagiaVerde.call(this);
		personaje.ani.x = 160;
		personaje.ani.y = 300;

		cargarMapa.call(this);

		cargarCaja.call(this);

		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

		this.physics.add.overlap(magiaVerde.verdeList, cajamala, raiz, null, this);
		this.physics.add.overlap(personaje.ani, cajamala, pasarNivel, null, this);
	}
	update()
	{
		tenredado -=1;
		personaje.controlesPersonaje.call(this);
		magiaVerde.tiempoVerde.call(this);
		if(KeyO.isDown)
		{
			this.scene.start("NivelPacifico");
		}	
	}
}
function load()
{
	this.load.image('cajamala','assets/images/badbox.png');
	this.load.image('planta','assets/images/planta.png');
	this.load.spritesheet('espada','assets/sprites/SwordAttack.png',{frameWidth:64, frameHeight:64});
	this.load.image('Overworld','assets/mapas/mapaPrueba/Overworld.png');
	this.load.tilemapTiledJSON('mapaPrueba','assets/mapas/mapaPrueba/sinNombre.json');
}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 320, 320);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);
}

function cargarMapa()
{
	let mapaPrueba = this.add.tilemap('mapaPrueba');
	let Overworld = mapaPrueba.addTilesetImage('Overworld');
	let BottomLayer = mapaPrueba.createLayer("BottomLayer",[Overworld], 0, 0).setDepth(0);
	TopLayer = mapaPrueba.createLayer("TopLayer",[Overworld], 0, 0).setDepth(1);

	cargarCamara.call(this);

	fisicas.call(this);
}

function fisicas()
{
	////Colisiones Mapa////
	this.physics.add.collider(personaje.ani,TopLayer);
	TopLayer.setCollisionByProperty({collides:true});

	//fisicas
	this.physics.add.collider(magiaVerde.verdeList, colisiones, balaMuro, null, this);
}

function cargarCaja()
{	
	cajamala = this.physics.add.sprite(160,160,'cajamala');
	cajamala.setOrigin(setorigin,setorigin);
	cajamala.setScale(0.1, 0.1);
}

function raiz(c,v)
{
	if(!enredado)
	{
		planta = this.physics.add.sprite(cajamala.x,cajamala.y,'planta');
		planta.setDepth(7);
		planta.setScale(0.05,0.05)
		enredado= 1;
		tenredado = 250;
		v.disableBody(true,true);
		magiaVerde.verdeList.remove(v);
	}
}

function balaMuro(v)
{
		v.disableBody(true,true);
		magiaVerde.verdeList.remove(v);
}

function pasarNivel()
{
	tpE = 1;
	this.scene.start("NivelPacifico");
}

export function cambiarTp()
{
	tpE = 0;
}