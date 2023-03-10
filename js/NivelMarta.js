import * as game from './game.js'
import * as personaje from './personaje.js'
import * as enemigo from './enemigo.js'
import * as inventario from './inventario.js'
import * as estadisticas from './estadisticas.js';

var KeyO;
var teleport;
var tpE;

export default class NivelMarta extends Phaser.Scene{
	constructor(){
		super({key: "NivelMarta"});
	}

    preload()
	{
        load.call(this);
		personaje.loadSprite.call(this);
    }

    create()
	{
        personaje.crearPersonaje.call(this);
		personaje.ani.x = 40;
		personaje.ani.y = 160;
		personaje.ani.setDepth(9);

        animaciones.call(this);

		cargarMapa.call(this);

        KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    }

    update()
	{
		personaje.controlesPersonaje.call(this);
		if (KeyO.isDown)
		{
			this.scene.start("NivelPacifico");
		}	
	}
}

function load()
{
    this.load.image('prueba','assets/mapas/mapaMarta/prueba.png');
    this.load.image('arboles','assets/mapas/mapaMarta/arboles.png');
    this.load.tilemapTiledJSON('mapaMarta', 'assets/mapas/mapaMarta/mapaMarta.json');
    this.load.spritesheet('portal','assets/sprites/portal.png',{frameWidth:21, frameHeight:16});
}

function cargarCamara()
{
	this.cameras.main.setBounds(0, 0, 2050,1280);
	this.cameras.main.setZoom(2);     
	this.cameras.main.centerOn(0, 0);
}

function cargarMapa()
{
    let mapaMarta = this.add.tilemap('mapaMarta');

    let prueba = mapaMarta.addTilesetImage('prueba');
    let arboles = mapaMarta.addTilesetImage('arboles');

    let suelo = mapaMarta.createLayer("suelo", [prueba], 0, 0).setDepth(0);
    let hierba = mapaMarta.createLayer("hierba", [prueba, arboles], 0, 0).setDepth(1);
    let caminito = mapaMarta.createLayer("caminito", [prueba], 0, 0).setDepth(2);
    let murito2 = mapaMarta.createLayer("murito2", [prueba], 0, 0).setDepth(3);
    let murito = mapaMarta.createLayer("murito", [prueba], 0, 0).setDepth(4);
    let tronquitos = mapaMarta.createLayer("tronquitos", [prueba, arboles], 0, 0).setDepth(4);
    let arboles1 = mapaMarta.createLayer("arboles1", [prueba, arboles], 0, 0).setDepth(5);
    let arboles2 = mapaMarta.createLayer("arboles2", [prueba, arboles], 0, 0).setDepth(6);
    let piedruscos2 = mapaMarta.createLayer("piedruscos2", [prueba], 0, 0).setDepth(7);
    let piedruscos = mapaMarta.createLayer("piedruscos", [prueba], 0, 0).setDepth(8);
    let agua = mapaMarta.createLayer("agua", [prueba], 0, 0).setDepth(9);
    let arboles3 = mapaMarta.createLayer("arboles3", [prueba, arboles], 0, 0).setDepth(10);
    let arboles4 = mapaMarta.createLayer("arboles4", [prueba, arboles], 0, 0).setDepth(11);
    let floretes = mapaMarta.createLayer("floretes", [prueba, arboles], 0, 0).setDepth(12);
    let colisiones = mapaMarta.createLayer("colisiones", [prueba], 0, 0).setDepth(-1);
    let setas = mapaMarta.getObjectLayer("setas");
    let portal = mapaMarta.getObjectLayer("portal");

    cargarCamara.call(this);

    this.physics.add.collider(personaje.ani,colisiones);
	colisiones.setCollisionByProperty({collides:true});

    portal.objects.forEach(tp =>{
    teleport = this.physics.add.sprite(tp.x, tp.y, 'portal');
    teleport.play('tp');
    teleport.setDepth(10);
    })

    this.physics.add.overlap(personaje.ani, teleport, pasarNivel, null, this)
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

function pasarNivel()
{
    tpE = 1;
    this.scene.start("NivelPacifico");
}

export function cambiarTp()
{
    tpE = 0;
}