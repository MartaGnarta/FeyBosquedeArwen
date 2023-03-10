import * as personaje from './personaje.js'
export var verdeList;
var magiascale = 0.4;
export var tmagic = -1;
export var v;
var absorber = true;
export var cargaElementalVerde = 5;
import * as estadisticas from './estadisticas.js';
  

export function loadSprite()
{
	this.load.image('magiaVerde','assets/images/magia.png');
}

export function crearMagiaVerde()
{
	verdeList = this.physics.add.group();
}
export function tiempoVerde()
{
	tmagic -=1;
}
export function disparoMagiaVerde()
{
	if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 2 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityX(100);
		v.setDepth(20);
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
	else if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 4 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityX(-100);
		v.setDepth(20);
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
	else if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 1 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityY(-100);
		v.setDepth(20);
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
	else if(tmagic < 0 && cargaElementalVerde && personaje.direccion == 3 && estadisticas.gemas == 2)
	{
		v=verdeList.create(personaje.ani.x, personaje.ani.y,'magiaVerde');
		v.setScale(magiascale,magiascale);
		v.setVelocityY(100);
		v.setDepth(20);
		tmagic = 100;
		cargaElementalVerde -= 1;
		estadisticas.restarEnergiaVerde.call(this);
	}
}

export function recargaElementalVerde()
{
	if (absorber == true) 
	{
		console.log("RATATATATATA")
		cargaElementalVerde += 1;
		estadisticas.calculoVerde.call(this, 1)
	}
}

export function absorcion()
{
	if (cargaElementalVerde < 5) 
	{
		absorber = true;
	}
	else
	{
		absorber = false;
	}
}

/*function pelotaMagica()
{
	if(tmagic < 0)
	{
		magia = this.physics.add.sprite(ani.x,ani.y,'playerMagia');
		magia.setScale(magiascale, magiascale)
		magia.setVelocityX(100);
		tmagic = 230;
	}
}*/