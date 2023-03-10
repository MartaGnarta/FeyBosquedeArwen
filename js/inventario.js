var inv;
var manz;
var anyadir = 0;
var prueba = 0;
var contador;
var contadorM = 0;
var numInv = 4;
import * as game from './game.js'
import * as personaje from './personaje.js'
import * as estadisticas from './estadisticas.js'
export default class inventario extends Phaser.Scene{
	constructor(){
		super({key: "inventario", active: true});
	}

	preload()
	{
		this.load.image('inventario','assets/images/inventario1.png');
		this.load.image('manz', 'assets/images/Manzana.png');
	}
  
	create()
	{
		//inv = this.add.sprite((game.config.width / 2) + 370, (game.config.height / 2) / 10,'inventario');
		inv = this.add.sprite((game.config.width / 2) + 390, (game.config.height / 2) / 10,'inventario');
		inv.setScale(1.5, 1.5);
	}
	update()
	{	
		if (anyadir == 1 && prueba == 0)
		{
			manz = this.add.sprite(825, 42,'manz');
			manz.setDepth(21);
			manz.setScale(2.5,2.5);
			contador = this.add.text(828, 46, 'x'+contadorM, {fontsize:'32px', fill:'#FFF'}).setDepth(21);
			prueba = 1;
		}
		else if (anyadir >= 1)
		{
			contador.setText('x'+ contadorM)
		}
	}

}
export function anyadirManzana()
{
	contadorM++;
	anyadir += 1;

    var secret = 'manzana';
    var usuario = 'usuario@';
    var funcion = 'guardarManzana';
    var contador = contadorM;
    var urlllamada = 'https://ServerPHP.lalegion05.repl.co/index1.php';

    var xhr = new XMLHttpRequest();

    xhr.open('POST', urlllamada);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Acciones a procesar tras recibir la respuesta
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Respuesta recibida: ' + xhr.responseText);
        }
        else if (xhr.status !== 200) {
            console.log('Algo ha fallado: ' + xhr.status);
        }
    };
    // Envia datos al servidor php
    var datos = 'secret=' + secret + '&usuario=' + usuario + '&funcion=' + funcion + '&contador=' + contador;
    // Debug
    console.log(datos);
    var datoscodificados = encodeURI(datos);
    console.log(datoscodificados);
    xhr.send(datoscodificados);
}

export function comerManzana()
{
	if (contadorM > 0) 
	{
		contadorM--;
		estadisticas.ponerVida.call(this);
	}
}