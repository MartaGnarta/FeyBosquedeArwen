var over;

import * as game from './game.js'
export default class gameOver extends Phaser.Scene{
    constructor(){
		super({key: "gameOver"});
	}

    preload()
    {
        this.load.image('gameOver', 'assets/images/GameOver.jpg');
    }

    create()
    {
        over = this.add.image(game.config.width / 2, game.config.height / 2, 'gameOver');
        over.setScale(2,2);
    }

    update()
    {

    }
}