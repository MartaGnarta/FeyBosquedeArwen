import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as enemigo from './enemigo.js'
import * as estadisticas from './estadisticas.js';
import * as enemigoEmbestida from './enemigoEmbestida.js';
var fuegoMalo;
var fuegos;
var teleport;
var rEsmeralda;
var elemental;
var xuclar;
export var arbolMaloGordo;
var tiempodanyo = -1;
export var tpN = 0;
export default class NivelPedro extends Phaser.Scene{
	constructor(){
		super({key: "NivelPedro"})	;
	}

	preload()
	{
		load.call(this);
	}
	create()
	{
		personaje.crearPersonaje.call(this);
		magiaVerde.crearMagiaVerde.call(this);
		magiaAzul.preparaEscudos.call(this);
		enemigoEmbestida.cargarEnemigo.call(this);
		personaje.ani.x = 915;
		personaje.ani.y = 1240;

		cargarCamara.call(this);

		fuegos = this.physics.add.group();

		this.anims.create({
			key:'prender',
			frames:this.anims.generateFrameNames('fuegoMalo',{start:0, end:6}),
			frameRate: 15,
			repeat: -1,
		});

			this.anims.create({
		key: "tp",
		frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
		repeat: -1,
		frameRate: 10,
		});

			this.anims.create({
		key: "corrupto",
		frames: this.anims.generateFrameNumbers("arbolMaloGordo", {start: 0, end:2}),
		repeat: -1,
		frameRate: 3,
		});
		elemental = this.physics.add.group();

		cargarMapa.call(this);

		xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

	}

	update()
	{
		//PERSONAJE//
		magiaVerde.tiempoVerde.call(this);
		magiaVerde.absorcion.call(this);
		
		personaje.controlesPersonaje.call(this);
		personaje.tBonk.call(this);
		personaje.cBonk.call(this);

		//EMBESTIDA//
		enemigoEmbestida.traiz.call(this);
		enemigoEmbestida.stalkEnemigo.call(this);
		enemigoEmbestida.rush.call(this);
		enemigoEmbestida.noStalk.call(this);
		//enemigoEmbestida.enredar.call(this);
		tiempodanyo --;

		//MECANICA ADRI//
		mecanicaAdri.call(this);
	}
}

function load()
{

		personaje.loadSprite.call(this);
		magiaVerde.loadSprite.call(this);
		magiaAzul.cargaSprites.call(this);
		enemigoEmbestida.loadEnemigo.call(this);

		this.load.image('prueba','assets/mapas/mapaPedro/prueba.png');
		this.load.image('Overworld','assets/mapas/mapaPedro/Overworld.png');
		this.load.image('objects','assets/mapas/mapaPedro/objects.png');
		this.load.image('hierba','assets/images/hierba.png');
		this.load.spritesheet('fuegoMalo','assets/sprites/fuego.png',{frameWidth:16, frameHeight:16});
		this.load.spritesheet('arbolMaloGordo','assets/sprites/arbolMaloGordo.png',{frameWidth:34, frameHeight:42});
		this.load.tilemapTiledJSON('NivelPedro','assets/mapas/mapaPedro/mapa_Pedro.json');
		this.physics.world.setBounds(0,0,1820,1295);
}

function cargarMapa()
{
		let NivelPedro = this.add.tilemap('NivelPedro');

		let objects = NivelPedro.addTilesetImage('objects');
		let Overworld = NivelPedro.addTilesetImage('Overworld');
		let prueba = NivelPedro.addTilesetImage('prueba');

		let Suelo = NivelPedro.createLayer("Suelo",[prueba,Overworld,objects], 0, 0).setDepth(0);
		let Suelomalo = NivelPedro.createLayer("Suelomalo",[prueba,Overworld,objects], 0, 0).setDepth(1);
		let Flores = NivelPedro.createLayer("Flores",[prueba,Overworld,objects], 0, 0).setDepth(2);
		let ArbolesEnfermos = NivelPedro.createLayer("ArbolesEnfermos",[prueba,Overworld,objects], 0, 0).setDepth(3);
		let Elemento = NivelPedro.getObjectLayer("Elemento")
		let ArbolesMalitos = NivelPedro.getObjectLayer("ArbolesMalitos")
		let ArbolPrueba = NivelPedro.getObjectLayer("ArbolPrueba")
		let Fuego = NivelPedro.getObjectLayer("Fuego")
		let Portal = NivelPedro.getObjectLayer("Portal");
		let Troncos = NivelPedro.createLayer("Troncos", [prueba,Overworld,objects], 0, 0).setDepth(5);
		let ArbolesDelimitar2 = NivelPedro.createLayer("ArbolesDelimitar2",[prueba,Overworld,objects], 0, 0).setDepth(6);
		let ArbolesDelimitar1 =NivelPedro.createLayer("ArbolesDelimitar1",[prueba,Overworld,objects], 0, 0).setDepth(7);
		let ArbolesDelimitar3 = NivelPedro.createLayer("ArbolesDelimitar3",[prueba,Overworld,objects], 0, 0).setDepth(8);
		let ArbolesIngame = NivelPedro.createLayer("ArbolesIngame",[prueba,Overworld,objects], 0, 0).setDepth(9);
		let ArbolesIngame2 = NivelPedro.createLayer("ArbolesIngame2",[prueba,Overworld,objects], 0, 0).setDepth(10);
		let Arbolitos = NivelPedro.createLayer("Arbolitos",[prueba,Overworld,objects], 0, 0).setDepth(11);
		

		////Colisiones con el mapa////
		this.physics.add.collider(personaje.ani,Arbolitos);
		this.physics.add.collider(personaje.ani,ArbolesIngame);
		this.physics.add.collider(personaje.ani,ArbolesIngame2);
		this.physics.add.collider(personaje.ani,ArbolesDelimitar3);
		this.physics.add.collider(personaje.ani,ArbolesDelimitar1);
		this.physics.add.collider(personaje.ani,ArbolesDelimitar2);
		this.physics.add.collider(personaje.ani,Troncos);
		this.physics.add.collider(personaje.ani,ArbolesEnfermos);
		this.physics.add.collider(enemigoEmbestida.cajaEmbestida,ArbolesEnfermos);
		this.physics.add.collider(personaje.ani,Flores);
		this.physics.add.collider(personaje.ani,Suelomalo);
		this.physics.add.overlap(personaje.ani,elemental, absorberElementoVerde, null, this);

		Arbolitos.setCollisionByProperty({collides:true});
		ArbolesIngame.setCollisionByProperty({collides:true});
		ArbolesIngame2.setCollisionByProperty({collides:true});
		ArbolesDelimitar3.setCollisionByProperty({collides:true});
		ArbolesDelimitar1.setCollisionByProperty({collides:true});
		ArbolesDelimitar2.setCollisionByProperty({collides:true});
		Troncos.setCollisionByProperty({collides:true});
		ArbolesEnfermos.setCollisionByProperty({collides:true});
		Flores.setCollisionByProperty({collides:true});
		Suelomalo.setCollisionByProperty({collides:true});

		this.physics.add.overlap(personaje.ani,fuegos, danyo, null, this);

		Fuego.objects.forEach(llama =>{
		fuegoMalo = fuegos.create(llama.x, llama.y, 'fuegoMalo');
		fuegoMalo.play('prender');
		fuegoMalo.setDepth(10);
		})

		Portal.objects.forEach(tp =>{
		teleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
		teleport.play('tp');
		teleport.setDepth(10);
		})

		Elemento.objects.forEach(element =>{
		rEsmeralda = elemental.create(element.x, element.y, 'hierba');
		rEsmeralda.setScale(0.05, 0.05);
		})

		ArbolPrueba.objects.forEach(corrupt =>{
		arbolMaloGordo = this.physics.add.sprite(corrupt.x, corrupt.y, 'arbolMaloGordo');
		arbolMaloGordo.play('corrupto');
		arbolMaloGordo.setScale(1.8,1.8);
		arbolMaloGordo.setDepth(15);
		})

		this.physics.add.overlap(personaje.ani,teleport, pasarNivel, null, this);
		//Colision arrastre
		//this.physics.add.collider(personaje.ani, cajasMalas);
		//this.physics.add.collider(cajasMalas, colisiones)


}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 1600,1560);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);

}
function danyo()
{
	if(tiempodanyo < 0)
	{
		tiempodanyo = 50;
	}
	else if(tiempodanyo == 49)
	{
		estadisticas.quitarVida.call(this);
		console.log(tiempodanyo);
	}
}

function pasarNivel()
{
	tpN = 1;
	this.scene.start("NivelPacifico");
}

export function cambiarTp()
{
	tpN = 0;
}

export function purificar()
{
	arbolMaloGordo.destroy();
	console.log("Adri matao");
}

function absorberElementoVerde(p,e)
{
	if (xuclar.isDown && estadisticas.gemas == 2)
	{
		magiaVerde.recargaElementalVerde.call(this);
		e.disableBody(true,true);
		e.destroy();
	}
}

function mecanicaAdri()
{
	magiaAzul.absorcion.call(this);
	magiaAzul.restaTiempo.call(this);
	magiaAzul.gestionEscudos.call(this);
}