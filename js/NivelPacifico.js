var setorigin = 0.5;
var cajascale = 0.8;
var cuadroscale = 0.3;
export var cajamala;//mirar
var colisiones;
var cajon;
var elemental;
var rEsmeralda;
var cajasMalas;
export var goblin;
var KeyO;
var KeyR; 
var KeyT;
var contador;
var dirR;
var pruebaRebote; //pruebas
var xuclar;
var DIAGOLO; //Hacer los dialogos en un módulo separado. (Dialogo nivel pacifico, dialogo noseque...)
var muchoTexto = false;
var cuadro;
var textocuadro;
var direccionCaja = 1;
var enredado = 0;
var planta;
var tenredado = -1;
var tTexto = -1;
var manzanas;
var manzana;
var portal;
var portales;
var tiempodanyo = -1;
var rana;
var prueba;
var tiendaprueba;

import * as personaje from './personaje.js'
import * as magiaVerde from './magiaVerde.js'
import * as magiaAzul from './magiaAzul.js'
import * as enemigo from './enemigo.js'
import * as nivelPrueba from './NivelPrueba.js'
import * as inventario from './inventario.js'
import * as NivelPedro from './NivelPedro.js'
import * as nivelAdri from './NivelAdri.js'
import * as nivelMarta from './NivelMarta.js'
import * as estadisticas from './estadisticas.js';
import * as tienda from './tienda.js'
import * as game from './game.js'

export default class NivelPacifico extends Phaser.Scene{
	constructor(){
		super({key: "NivelPacifico"})	;
	}

	preload()
	{
		load.call(this);
	}

	create()
	{
		///////PERSONAJE////////////
		personaje.crearPersonaje.call(this);
		magiaVerde.crearMagiaVerde.call(this);

		magiaAzul.preparaEscudos.call(this);

		personaje.ani.x = 300;
		personaje.ani.y = 300;

		if (NivelPedro.tpN)
		{
			personaje.ani.x = 495;
			personaje.ani.y = 40;
			nivelPrueba.cambiarTp.call(this);
		}
		if (nivelAdri.tpO)
		{
			personaje.ani.x = 50;
			personaje.ani.y = 460;
			nivelAdri.cambiarTp.call(this);
		}
		if (nivelMarta.tpE)
		{
			personaje.ani.x = 970;
			personaje.ani.y = 410;
			nivelPrueba.cambiarTp.call(this);
		}

		//////ENEMIGO////
		enemigo.cargarEnemigo.call(this);

		cargarCaja.call(this);

		////TECLA PARA TRANSICIÓN///////
		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);

		//Pruebas Adri
		KeyR=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		KeyT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

		//TECLA ABSROBER ELEMENTO////
		xuclar=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

		//////Dialogos/////
		DIAGOLO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

		///FISICAS////
		this.physics.add.overlap(magiaVerde.verdeList, cajamala, raiz, null, this);
		this.physics.add.overlap(enemigo.enemigoAzul, personaje.hitboxDanyo, colisionVida);
		this.physics.add.overlap(enemigo.enemigoAzul, personaje.hitboxBonkList, enemigoColisionVida);
		this.physics.add.overlap(enemigo.enemigoAzul, magiaAzul.shield_group);

		//CAMARA//
		cargarCamara.call(this);

		//GRUPOS//

		elemental = this.physics.add.group();
		cajasMalas = this.physics.add.group();
		manzanas = this.physics.add.group();
		portales = this.physics.add.group();
		/////PORTALES/////
		this.anims.create({
			key: "tp",
			frames: this.anims.generateFrameNumbers("portal", {start: 0, end:7}),
			repeat: -1,
			frameRate: 10,
		});

		///MAPEADO///
		cargarMapa.call(this);
		
		//Map events
		//by index
		colisiones.setTileIndexCallback([2255], ()=>{
		
		this.scene.start("NivelPrueba"); //Si haces la función fuera de la clase tienes que poner "this." delante. Si la haces dentro de la clase no hace falta
		//cajamala = this.physics.add.sprite(personaje.ani.x, personaje.ani.y,'cajamala');
		
		})
	}
	update()
	{
		tiempodanyo -=1;
		tenredado -=1;
		magiaVerde.tiempoVerde.call(this);

		personaje.controlesPersonaje.call(this);
		personaje.tBonk.call(this);
		personaje.cBonk.call(this);
		enemigo.stalkEnemigo.call(this);

		if (KeyO.isDown)
		{
			pasarEscena.call(this);
		}

		moverCaja.call(this);

		//mecanicaAdri.call(this);

		magiaVerde.absorcion.call(this);
		magiaAzul.absorcion.call(this);

		personaje.hit.call(this);

		enemigo.enemyHit.call(this);

		enemigo.noStalk.call(this);

		if (tenredado == 0)
		{
			enredado = 0;
			planta.destroy();
		}

		if (tTexto > 0 && tTexto < -1)
		{
			tTexto--;
		}
		else if (tTexto == 0)
		{
			cuadro.destroy();
			cuadrotexto.destroy();
		}

		funcionesEscudo.call(this);

		if(personaje.ani.health == 0)
		{
			this.scene.start("gameOver");
		}
		
		cajasMalas.setVelocityX(0)
		cajasMalas.setVelocityY(0)
	}
}
function pasarEscena()
{
		this.scene.start("gameOver");
}

function load()
{
		this.load.image('cajamala','assets/images/badbox.png');
		this.load.image('hierba','assets/images/hierba.png');
		this.load.image('burbuja', 'assets/images/cuadrotexto.png');
		this.load.image('planta', 'assets/images/planta.png');
		this.load.image('hitbox', 'assets/hitbox/hitboxPrueba.png');
		this.load.image('manzana', 'assets/images/Manzana.png');
		this.load.image('ranita', 'assets/images/rana.png');
		this.load.spritesheet('portal','assets/sprites/portal.png',{frameWidth:21, frameHeight:16});

		personaje.loadSprite.call(this);
		magiaVerde.loadSprite.call(this);
		magiaAzul.cargaSprites.call(this);
		enemigo.loadEnemigo.call(this);

		this.load.image('prueba','assets/mapas/mapaPacifico/prueba.png');
		this.load.image('Overworld','assets/mapas/mapaPacifico/Overworld.png');
		this.load.image('Manzana','assets/mapas/mapaPacifico/Manzana.png');
		this.load.image('arboles','assets/mapas/mapaPacifico/arboles.png');
		this.load.image('objects','assets/mapas/mapaPacifico/objects.png');
		this.load.tilemapTiledJSON('mapaPacifico','assets/mapas/mapaPacifico/mapaPacifico.json')

		this.load.image('tiendaprueba','assets/images/tienda.png');
}

function cargarCamara()
{
		this.cameras.main.setBounds(0, 0, 1024, 1160);
		this.cameras.main.setZoom(2);     
		this.cameras.main.centerOn(0, 0);
}

function cargarMapa()
{
		let mapaPacifico = this.add.tilemap('mapaPacifico');

		let objects = mapaPacifico.addTilesetImage('objects');
		let Overworld = mapaPacifico.addTilesetImage('Overworld');
		let prueba = mapaPacifico.addTilesetImage('prueba');
		let Manzana = mapaPacifico.addTilesetImage('Manzana');
		let arboles = mapaPacifico.addTilesetImage('arboles');

		let Suelo = mapaPacifico.createLayer("Suelo",[prueba], 0, 0).setDepth(0);
		let Agua = mapaPacifico.createLayer("Agua",[prueba], 0, 0).setDepth(1);
		let Elevacion = mapaPacifico.createLayer("Elevacion",[prueba], 0, 0).setDepth(2);
		let Elevacion2 = mapaPacifico.createLayer("Elevacion2",[prueba], 0, 0).setDepth(3);
		let Veneno = mapaPacifico.createLayer("Veneno",[prueba,objects], 0, 0).setDepth(4);
		let Arboles = mapaPacifico.createLayer("Arboles",[prueba,arboles,objects], 0, 0).setDepth(7);
		let Deco = mapaPacifico.createLayer("Deco",[prueba,Manzana,Overworld,arboles,objects], 0, 0).setDepth(5);
		let ArbolesBajos = mapaPacifico.createLayer("ArbolesBajos", [prueba,arboles], 0, 0).setDepth(5);
		let Stop = mapaPacifico.createLayer("Stop",[prueba], 0, 0).setDepth(6);
		let Arboles2 = mapaPacifico.createLayer("Arboles2",[prueba], 0, 0).setDepth(8);
		let Arboles3 = mapaPacifico.createLayer("Arboles3",[prueba], 0, 0).setDepth(9);
		let Spawner = mapaPacifico.getObjectLayer("Spawner");
		let ElementosEsmeralda = mapaPacifico.getObjectLayer("ElementosEsmeralda");
		let Portales = mapaPacifico.getObjectLayer("Portales");
		let CapaNPC = mapaPacifico.getObjectLayer("CapaNPC");
		colisiones =  mapaPacifico.createLayer("Colisiones",[Overworld], 0, 0).setDepth(-20);

		////Colisiones con el mapa////
		this.physics.add.collider(personaje.ani,colisiones);
		this.physics.add.collider(magiaVerde.verdeList, colisiones, balaMuro, null, this);
		this.physics.add.overlap(personaje.ani,elemental, absorberElementoVerde, null, this);
		this.physics.add.overlap(personaje.ani,manzanas, recogerManzana, null, this);
		this.physics.add.collider(enemigo.enemigoAzul,colisiones);

		colisiones.setCollisionByProperty({collides:true});

		this.physics.add.overlap(personaje.ani,portales, teleport, null, this);
		//Colision arrastre
		//this.physics.add.collider(personaje.ani, cajasMalas);
		//this.physics.add.collider(cajasMalas, colisiones)

		//Portales
			Portales.objects.forEach(tp =>{
			portal = portales.create(tp.x, tp.y, 'portal');
			portal.play('tp');
			portal.setDepth(5);
			portal.numero=tp.properties[1].value; //Aquí creas una nueva propiedad del grupo, que tiene el valor del objeto de tiled que hemos puesto en el atributo
		})
		//Spawners
		Spawner.objects.forEach(spawn =>{
			manzana = manzanas.create(spawn.x, spawn.y, 'manzana');
			//cajon.setScale(0.1, 0.1);
		})

		//Elementos
			ElementosEsmeralda.objects.forEach(element =>{
			rEsmeralda = elemental.create(element.x, element.y, 'hierba');
			rEsmeralda.setScale(0.05, 0.05);
		})

		//NPC
		CapaNPC.objects.forEach(NPC =>{
		rana = this.physics.add.sprite(NPC.x, NPC.y - 8, 'ranita');
		rana.setScale(0.15, 0.15);
		rana.setDepth(5);
		goblin = this.physics.add.sprite(NPC.x, NPC.y, 'hitbox');
		goblin.setSize(40,10);
		goblin.setOffset(goblin.width / 4, goblin.height / 1.5);

		})

		//Interaccion dialogo
		this.physics.add.overlap(personaje.hitboxInteractuar, goblin, dialogo, null, this);
}

function cargarCaja()
{
	cajamala = this.physics.add.sprite(650,280,'cajamala');

	cajamala.setOrigin(0.5,0.5);
	cajamala.setScale(0.1, 0.1);
	cajamala.setDepth(6);
}

function moverCaja()
{
	if (!enredado)
	{
		if (direccionCaja == 1)
		{
			cajamala.setVelocityY(50);
			//cajamala.y +=1;
			if(cajamala.y >= 580)
			{
				direccionCaja = 0;
				cajamala.setVelocityY(0);
			}
		}
		else if (direccionCaja == 0)
		{
			cajamala.setVelocityY(-50);
			//cajamala.y -=1;
			if (cajamala.y <= 280)
			{
				direccionCaja = 1;
				cajamala.setVelocityY(0);
			}
		}
	}
	else
	{
		cajamala.setVelocityY(0);
	}
}
/*
function mecanicaAdri()
{
	if(KeyT.isDown)
	{
		pruebaRebote = this.physics.add.sprite(enemigo.enemigoAzul.x, enemigo.enemigoAzul.y, 'magiaVerde')
		dirR= new Phaser.Math.Vector2(personaje.ani.x - pruebaRebote.x, personaje.ani.y - pruebaRebote.y);
		dirR.normalize();
		pruebaRebote.direccion = dirR
		pruebaRebote.velocidad = 50;

		pruebaRebote.setVelocityX(pruebaRebote.velocidad * pruebaRebote.direccion.x);
		pruebaRebote.setVelocityY(pruebaRebote.velocidad * pruebaRebote.direccion.y);
	}
}*/

function raiz(c,v)
{
	if (!enredado)
	{
		planta = this.physics.add.sprite(cajamala.x,cajamala.y,'planta');
		planta.setDepth(7);
		planta.setScale(0.05,0.05);
		enredado= 1;
		tenredado = 100;
		v.disableBody(true,true);
		magiaVerde.verdeList.remove(v);
		v.destroy();
	}
}

function balaMuro(v)
{
	v.disableBody(true,true);
	magiaVerde.verdeList.remove(v);
	v.destroy();
}

function colisionVida()
{
	if(tiempodanyo < 0)
	{
		tiempodanyo = 40;
		personaje.hitted.call(this);
		estadisticas.quitarVida.call(this);
	}
}

function enemigoColisionVida(v,c)
{
	enemigo.enemyHitted.call(this);
	c.disableBody(true,true);
	magiaVerde.verdeList.remove(c);
	c.destroy();
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

function recogerManzana(p,m)
{
	if (xuclar.isDown)
	{
		m.disableBody(true,true);
		m.destroy();
		inventario.anyadirManzana.call(this);
  	}
}

function dialogo(p, c)
{
	if (DIAGOLO.isDown && muchoTexto == false)
	{
		////CUADRO DE DIALOGO////
		/*cuadro = this.add.sprite(goblin.x, goblin.y - 50, 'burbuja').setDepth(19);
		cuadro.setScale(cuadroscale, cuadroscale);
		textocuadro = this.add.text(cuadro.x, cuadro.y, 'Probando 1 2', {fontsize:'32px', fill:'#000'}).setDepth(20);
		muchoTexto = true;
		tTexto = 200;*/

		///PRUEBA DE TIENDA EN ESCENA///
		//this.scene.start("tienda");

		///PRUEBA DE TIENDA EN SPRITE///

		tiendaprueba = this.add.sprite(goblin.x, goblin.y - 50, 'tiendaprueba').setDepth(50);
		tiendaprueba.setScale(0.5,0.5);

	}
}

function funcionesEscudo()
{
	magiaAzul.restaTiempo.call(this);
	magiaAzul.gestionEscudos.call(this);
}

function rebote()
{
	pruebaRebote.direccion = - dirR
}

function teleport(p, t)
{
	if (t.numero == 1)
	{
		this.scene.start("NivelPedro");
	}
	else if (t.numero == 2)
	{
		this.scene.start("NivelAdri");
	}
	else if (t.numero == 3)
	{
		this.scene.start("NivelMarta");
	}
}