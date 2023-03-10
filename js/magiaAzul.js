export var shield_group;
export var shield;
export var cargaElementalAzul = 5;
var timer = -1;
var absorber = true;
var i;
var prueba;

import * as personaje from './personaje.js'
import * as estadisticas from './estadisticas.js'

export function cargaSprites()
{
	this.load.image('derecha', 'assets/sprites/escudo_der.png');
	this.load.image('izquierda', 'assets/sprites/escudo_izq.png');
	this.load.image('arriba', 'assets/sprites/escudo_up.png');
	this.load.image('abajo', 'assets/sprites/escudo_down.png');
}

export function preparaEscudos()
{
	shield_group = this.physics.add.group();
}

export function proteccion()
{
	if(timer < 0 && cargaElementalAzul && personaje.direccion == 2 && estadisticas.gemas == 1)
	{
		shield = shield_group.create(personaje.ani.x + 20, personaje.ani.y,'derecha');
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
	else if(timer < 0 && cargaElementalAzul && personaje.direccion == 4 && estadisticas.gemas == 1)
	{
		shield = shield_group.create(personaje.ani.x - 20, personaje.ani.y,'izquierda');
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
	else if(timer < 0 && cargaElementalAzul && personaje.direccion == 1 && estadisticas.gemas == 1)
	{
		shield = shield_group.create(personaje.ani.x, personaje.ani.y - 20,'arriba');
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
	else if(timer < 0 && cargaElementalAzul && personaje.direccion == 3 && estadisticas.gemas == 1)
	{
		shield = shield_group.create(personaje.ani.x, personaje.ani.y + 20,'abajo');
		timer = 100;
		cargaElementalAzul -= 1;
		estadisticas.restarEnergiaAzul.call(this);
	}
}

export function recargaElementalAzul()
{
	if (absorber == true) 
	{
		cargaElementalAzul += 1;
		estadisticas.calculoAzul.call(this, 1);
	}
}

export function absorcion()
{
	if (cargaElementalAzul < 5) 
	{
		absorber = true;
	}
	else
	{
		absorber = false;
	}
}

export function restaTiempo()
{
	timer--;
}

export function gestionEscudos()
{
	if(timer < 0)
	{
		for(i = 0; i < shield_group.getChildren().length; i++)
		{
			shield_group.getChildren()[i].destroy();
		}
	}
}