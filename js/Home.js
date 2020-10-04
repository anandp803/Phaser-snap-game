
var Home= function (game) {
	// flipping speed in milliseconds
    this.flipSpeed= 200;
 
    // flipping zoom ratio. Simulates the card to be raised when flipping
    this.flipZoom= 1.2;
    this.startpoint;
    this.Endpoint;
	this.graphics;
	this.Lifes =[];
 };

function btnclickSound(){
		//btnclick.play();
};

Home.prototype = {

		init: function () {
       		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        	this.scale.pageAlignHorizontally = true;
        	this.scale.pageAlignVertically = true;

        	Phaser.Canvas.setImageRenderingCrisp(this.game.canvas); // full retro mode, i guess ;)
        	game.physics.startSystem(Phaser.Physics.ARCADE);
    	},

		preload: function ()
		{
			game.load.json('data','games_assets/database.json');
			game.load.image('bg','games_assets/bg.png');
			game.load.image('container','games_assets/container.png');
			game.load.image('Logo','games_assets/Logo.png');
			game.load.image('timerbg','games_assets/timerBg.png');
			game.load.spritesheet('card','games_assets/card.png',252,350);
			game.load.spritesheet('point','games_assets/moves.png',32,32);
			game.load.spritesheet('snap','games_assets/snapBtn.png',297,97);
			game.load.spritesheet('mute-unmute','games_assets/mute-unmute.png',40,36);
		},

		create:function () 
		{
			this.graphics=this.add.graphics();
			
			//var bg = game.add.sprite(0, 0, 'bg');
			let bg = this.add.sprite(0, 0, 'bg')
			let scaleX = this.game.world.width / bg.width;
			let scaleY = this.game.world.height / bg.height;
			let scale = Math.max(scaleX, scaleY);

			this.container = game.add.sprite(game.world.centerX, game.world.centerY, 'container');
			this.container.anchor.set(0.5);

			this.Logo = game.add.sprite(game.world.centerX, game.world.centerY-340, 'Logo');
			this.Logo.anchor.set(0.5);

			this.timerbg = game.add.sprite(game.world.centerX+350, game.world.centerY-340, 'timerbg');
			this.timerbg.anchor.set(0.5);
			this.timerbg.scale.setTo(1.1,1.3);

			this.snap = game.add.button(game.world.centerX, game.world.centerY+250, 'snap',this.OnSnapButtonClick,this,0,1);
			this.snap.anchor.set(0.5);
			this.snap.scale.setTo(0.7, 0.7);

			this.SountBtn=game.add.button(game.world.centerX+450, game.world.centerY-340,'mute-unmute',this.audio_setting, this);
			this.SountBtn.anchor.set(0.5);
			this.SountBtn.scale.setTo(1.2, 1.2);

			this.Firstcard = game.add.sprite(game.world.centerX-200, game.world.centerY-30, 'card');
			this.Firstcard.anchor.set(0.5);

			this.Scondcard = game.add.sprite(game.world.centerX+200, game.world.centerY-30, 'card');
			this.Scondcard.anchor.set(0.5);

			this.lifebtn1=game.add.sprite(800,game.world.centerY+250,'point');
			this.lifebtn1.anchor.set(0.5);			
			this.lifebtn2=game.add.sprite(840,game.world.centerY+250,'point');
			this.lifebtn2.anchor.set(0.5);
			this.lifebtn3=game.add.sprite(880,game.world.centerY+250,'point');
			this.lifebtn3.anchor.set(0.5);

			this.Lifes.push(this.lifebtn1,this.lifebtn2,this.lifebtn3);

			this.InitTimer();

			// custom property to tell us if the card is flipping. It's not, at the moment.
			this.Firstcard.isFlipping = false;
			this.Scondcard.isFlipping = false; 
       
		game.time.events.loop(Math.floor(Math.random() * (2000 - 1500 + 1) ) + 1500,this.flipStartFirst,this);
		game.time.events.loop(Math.floor(Math.random() * (2000 - 1500 + 1) ) + 1500,this.flipStartSec,this);
	   	//this.flipSecAnimation();
		this.flipFirstAnimation();
		this.flipSecAnimation();

		var phaserJSON = game.cache.getJSON('data');
		console.log(phaserJSON.Words[0]);
	},
	flipStartFirst:function()
	{
		//console.log(this.Firstcard.isFlipping);
		if(!this.Firstcard.isFlipping){

			// it's flipping now!
			this.Firstcard.isFlipping = true;
			// console.log(this.Firstcard.isFlipping);
			// start the first of the two flipping animations
			this.flipTween.start();
		}
	},
	flipStartSec:function()
	{
		//console.log(this.Scondcard.isFlipping);
		if(!this.Scondcard.isFlipping){

			// it's flipping now!
			this.Scondcard.isFlipping = true;
			 //console.log(this.Scondcard.isFlipping);
			// start the first of the two flipping animations
			this.SecflipTween.start();
		}
	},
	InitTimer:function()
	{
		this.startTime = new Date();
		this.totalTime = 100;
		this.timeElapsed = 0;
		this.createTimer();
		this.gameTimer = game.time.events.loop(100,this.updateTimer,this);
		//console.log(this.gameTimer);
		
	},
	createTimer:function()
	{
		this.timeLabel = this.game.add.text(this.game.world.centerX+350, this.game.world.centerY-340, "00:00", {font: "30px Arial", fill: "#f75607"}); 
        this.timeLabel.anchor.setTo(0.5, 0.5);
        this.timeLabel.align = 'center';

	},
	updateTimer:function(){

		var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);

        //Time remaining in seconds
        var timeRemaining = this.totalTime - this.timeElapsed; 

       // console.log(timeRemaining);

        if(timeRemaining>=0)
        {
        	//Convert seconds into minutes and seconds
	        var minutes = Math.floor(timeRemaining / 60);
	        var seconds = Math.floor(timeRemaining) - (60 * minutes);

	        //Display minutes, add a 0 to the start if less than 10
			var result = (minutes < 10) ? "0" + minutes : minutes; 
			
	        //Display seconds, add a 0 to the start if less than 10
	        result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 

	        this.timeLabel.text = result;
		}
		else
		{
        	game.time.events.loop=false;
        }      
	},
	flipFirstAnimation:function()
	{		
        // first tween: we raise and flip the card
        this.flipTween = game.add.tween(this.Firstcard.scale).to({
            x: 0,
            y: this.flipZoom
        }, this.flipSpeed / 2, Phaser.Easing.Linear.None);

 		
 		//console.log(this.Firstcard.x);
        // once the card is flipped, we change its frame and call the second tween
        this.flipTween.onComplete.add(function(){
            this.Firstcard.frame = 1 - this.Firstcard.frame;
            this.backFlipTween.start();
        }, this);
 
        // second tween: we complete the flip and lower the card
        this.backFlipTween = game.add.tween(this.Firstcard.scale).to({
            x: 1,
            y: 1
        }, this.flipSpeed / 2, Phaser.Easing.Linear.None);
 
        // once the card has been placed down on the table, we can flip it again
        this.backFlipTween.onComplete.add(function(){
            this.Firstcard.isFlipping = false;
         //   console.log(this.Firstcard.x);
        }, this);
	},
	flipSecAnimation:function()
	{		
        // first tween: we raise and flip the card
        this.SecflipTween = game.add.tween(this.Scondcard.scale).to({
            x: 0,
            y: this.flipZoom
        }, this.flipSpeed / 2, Phaser.Easing.Linear.None);

 		
 		//console.log(this.Scondcard.x);
        // once the card is flipped, we change its frame and call the second tween
        this.SecflipTween.onComplete.add(function(){
            this.Scondcard.frame = 1 - this.Scondcard.frame;
            this.backSecFlipTween.start();
        }, this);
 
        // second tween: we complete the flip and lower the card
        this.backSecFlipTween = game.add.tween(this.Scondcard.scale).to({
            x: 1,
            y: 1
        }, this.flipSpeed / 2, Phaser.Easing.Linear.None);
 
        // once the card has been placed down on the table, we can flip it again
        this.backSecFlipTween.onComplete.add(function(){
            this.Scondcard.isFlipping = false;
        //    console.log(this.Scondcard.x);
        }, this);
	},

	OnSnapButtonClick:function(){
		console.log("clicked");
	},
	
	audio_setting:function(){
        this.isAudioPaused=!this.isAudioPaused;
       // console.log(this.isAudioPaused);
        if(this.isAudioPaused)
        {
            this.SountBtn.frame=0;
            // if(this.pacman.sprite.body.velocity.x!==0 || this.pacman.sprite.body.velocity.y!==0)
            // {
            //    this.play_Audio(0);
            // }
        }
        else
        {
            this.SountBtn.frame=1;
            // for (var i =0; i < soundEffects.length; i++)
            // {
            //     soundEffects[i].stop();
            // }          
        }
         
    },	

};