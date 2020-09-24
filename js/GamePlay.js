class GamePlay extends Phaser.Scene{
	
	constructor(){
		super({key:"GamePlay"});
		var bg;
	}

	preload(){
		this.load.image("bg1","assets/moves.png");
	}

	create(){
		this.bg=this.add.sprite(0, 0, 'bg1');
	}
}