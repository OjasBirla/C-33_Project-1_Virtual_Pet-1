//Create variables here
var dog, normalDog, happyDog, database, foodStockRef, foodStock = 20;


function preload()
{
  //load images here
  normalDog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(width/2, height/2, 50, 50);
  dog.addImage(normalDog);
  dog.scale = 0.1;

  foodStockRef = database.ref("food");
  
  foodStockRef.on("value", function(data){
    foodStock = data.val();
  })

  database.ref("/").update({
    food: foodStock
  })
}


function draw() {  
  background(46, 139, 87);

  textSize(18);
  fill(250);
  text("Note: Press the UP_ARROW to feed the Dog with Milk", width/13, height/4);

  if(keyWentDown(UP_ARROW)){
    foodStock -= 1;
    database.ref("/").update({
      food: foodStock
    })
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(34);
  text(foodStock, width/2 - 10, height/2 + height/4);

}


