var gameConfig=
{
	type: Phaser.AUTO,
    width: 800,
    height: 600,    
    scene: [Home,GamePlay]
};

var game=new Phaser.Game(gameConfig);