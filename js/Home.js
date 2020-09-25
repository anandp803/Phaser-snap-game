
var Home= function (game) {
	// flipping speed in milliseconds
    this.flipSpeed= 200;
 
    // flipping zoom ratio. Simulates the card to be raised when flipping
    this.flipZoom= 1.2;
    this.startpoint;
    this.Endpoint;
    this.graphics;
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
			game.load.image('bg','games_assets/bg.png');
			game.load.spritesheet('card','games_assets/card.png',252,350);
			game.load.spritesheet('point','games_assets/moves.png',32,32);
		},

		create:function () 
		{
			this.graphics=this.add.graphics();
			
			//var bg = game.add.sprite(0, 0, 'bg');
			let bg = this.add.sprite(0, 0, 'bg')
			let scaleX = this.game.world.width / bg.width;
			let scaleY = this.game.world.height / bg.height;
			let scale = Math.max(scaleX, scaleY);
			this.card = game.add.sprite(game.world.centerX, game.world.centerY, 'card');
			this.card.anchor.set(0.5);

			this.startpoint=game.add.sprite(100,400,'point');
			this.Endpointpoint=game.add.sprite(400,100,'point');

			this.InitTimer();

			// custom property to tell us if the card is flipping. It's not, at the moment.
        	this.card.isFlipping = false;

 
        // waiting for player input
        	game.input.onDown.add(function(){
 			console.log("clicked "+this.flipZoom+",,, "+this.flipSpeed);
            // if the card is not flipping...
            if(!this.card.isFlipping){
 
                // it's flipping now!
                this.card.isFlipping = true;
 				console.log(this.card.isFlipping);
                // start the first of the two flipping animations
                this.flipTween.start();
            }
        }, this);
		
		this.flipAnimation();
	},
	InitTimer:function()
	{
		this.startTime = new Date();
		this.totalTime = 5;
		this.timeElapsed = 0;

		this.createTimer();

		this.gameTimer = game.time.events.loop(100,this.updateTimer,this);
		console.log(this.gameTimer);
		
	},
	createTimer:function()
	{
		this.timeLabel = this.game.add.text(this.game.world.centerX-200, this.game.world.centerY-200, "00:00", {font: "40px Arial", fill: "#fff"}); 
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

        console.log(timeRemaining);

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
        }else{
        	game.time.events.loop=false;
        }

      
	},
	flipAnimation:function()
	{		
        // first tween: we raise and flip the card
        this.flipTween = game.add.tween(this.card.scale).to({
            x: 0,
            y: this.flipZoom
        }, this.flipSpeed / 2, Phaser.Easing.Linear.None);

 		
 		console.log(this.card.x);
        // once the card is flipped, we change its frame and call the second tween
        this.flipTween.onComplete.add(function(){
            this.card.frame = 1 - this.card.frame;
            this.backFlipTween.start();
        }, this);
 
        // second tween: we complete the flip and lower the card
        this.backFlipTween = game.add.tween(this.card.scale).to({
            x: 1,
            y: 1
        }, this.flipSpeed / 2, Phaser.Easing.Linear.None);
 
        // once the card has been placed down on the table, we can flip it again
        this.backFlipTween.onComplete.add(function(){
            this.card.isFlipping = false;
            console.log(this.card.x);
        }, this);
	}	

};