class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200,40,20)
    car2 = createSprite(300,200,40,20)
    car3 = createSprite(500,200,40,20)
    car4 = createSprite(700,200,40,20)
    cars = [car1, car2, car3, car4]
    car1.addImage(car1img)
    car2.addImage(car2img)
    car3.addImage(car3img)
    car4.addImage(car4img)
  }

  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getcarsAtEnd();

    if(allPlayers !== undefined){
      background(198, 145, 103)
      image(trackImg, 0, -displayHeight*4,displayWidth, displayHeight*5)
      var index = 0
      var x = 175
      var y
      for(var plr in allPlayers){
        index = index + 1
        x = x + 200
        y = displayHeight-allPlayers[plr].distance
        cars [index-1].x=x
        cars [index-1].y=y
        if(index===player.index) {
          stroke(10)
          fill("red")
          ellipse(x,y,60,60)
          cars [index-1].shapeColor = "red"
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3860) {
      gameState = 2
      player.rank+=1
      Player.updatecarsAtEnd(player.rank)
    }
    drawSprites();
  }
  end(){
    console.log("game ended")
    console.log(player.rank)
  }
}
