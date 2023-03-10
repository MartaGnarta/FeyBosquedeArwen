import NivelPacifico from './NivelPacifico.js'
import NivelPrueba from './NivelPrueba.js'
import NivelAdri from './NivelAdri.js'
import NivelPedro from './NivelPedro.js'
import NivelMarta from './NivelMarta.js'
import inventario from './inventario.js'
import estadisticas from './estadisticas.js'
import gameOver from './gameOver.js'
import tienda from './tienda.js'

export var config={ //Puedo hacer un export aquí y un import en personaje para hacer config.widht/2
	type:Phaser.AUTO,
	width:1024,
	height:1024,
	pixelArt: true,
	physics:{
		default:'arcade', //Ponerlo con "matter". Para implementar esto y hacerlo funcionar hay que cambiar el this.add.physics
		arcade:{ //ponerlo con "matter"
			gravity:{y:0},
			debug: true //Para ver el cuadradito de hitbox//
		}
	},
	scene:[NivelPacifico, NivelPrueba, NivelAdri, NivelPedro, NivelMarta, inventario, estadisticas, gameOver, tienda]
};
var game=new Phaser.Game(config);//dd