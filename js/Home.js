class Home extends Phaser.Scene{
	
	constructor(){
		super({key:"Home"});
		var bg;
	}

	preload(){
		this.load.image("bg","assets/bg.jpg");
		this.load.image("bg1","assets/moves.png");
	}

	create(){
		this.bg=this.add.sprite(0, 0, 'bg');
		this.scene.start('GamePlay');
	}
}