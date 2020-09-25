var game = new Phaser.Game(1024, 768, Phaser.Auto, "game");


game.state.add('Home', Home, true);
game.state.add('GamePlay', GamePlay, true)


game.state.start('Home');