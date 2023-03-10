var tiendaprueba;
var KeyO;
import * as NivelPacifico from './NivelPacifico.js'
export default class tienda extends Phaser.Scene{
	constructor(){
		super({key: "tienda"});
	}
  
	preload()
	{
		load.call(this);

	}
	create()
	{
		KeyO=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
		tiendaprueba = this.physics.add.sprite(NivelPacifico.goblin.x,NivelPacifico.goblin.y,'tiendaprueba');
	}
	update()
	{
		if (KeyO.isDown)
		{
			volver.call(this);
		}
	}
}

function load()
{
	this.load.image('tiendaprueba','assets/images/tienda.png');
}

function volver()
{
	this.scene.start("NivelPacifico");
}