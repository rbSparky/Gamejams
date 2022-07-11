import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/road.js"


k.scene("road", (start, driveTime) => {
  //k.debug.inspect = true
  //k.setData("civic")
  //k.setData("money",100) 
  
  layers([
    "bg",
  	"game",
  	"ui",
  ], "bg")

  if (k.getData("drivetut") == 0) {
    let tut = `TUTORIAL

Control the car using Up and Down arrow keys
Avoid head-on collision and trying to merge with the traffic cars
Each collision will reduce $10 from your total money

Press [space] to end tutorial
`
    add([
      	sprite("mbg"),
        scale(50),
        layer("ui"),
        "tut",
        z(400),
      	pos(config.gameWidth/2, config.gameHeight/2 + 100),
        origin("center"),    
    ]);
    add([
      	text(tut, {
          font: "sink",
          size: 20,
          width: 500,
        }),
        "tut",
        color(0,0,0),
        layer("ui"),
        z(600),
      	pos(config.gameWidth/2, config.gameHeight/2),
        origin("center"),
    ]);
    onKeyPress("space", () => {
      k.setData("drivetut", 1) 
      destroyAll("tut")
      start = time()
    })
  }
  
  
  let sc = 4, xx = 0, yy = -75
  const sky = add([
    sprite("sky"),
    "sky",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    //area(),
  ])
  const buildings2 = add([
    sprite("buildings2"),
    "buildings2",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    lifespan(1),
    //area(),
  ])
  const buildings1a = add([
    sprite("buildings1a"),
    "buildings1",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    lifespan(1),
    //area(),
  ])
  /*
  const buildings1b = add([
    sprite("buildings1b"),
    "buildings1",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    lifespan(1),
    //area(),
  ])
  */
  const bush = add([
    sprite("bush"),
    "bush",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    lifespan(1),
    //area(),
  ])
  const road = add([
    sprite("road"),
    "road",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    lifespan(1),
    //area(),
  ])
  const guysit = add([
    sprite("guysit"),
    scale(2),
    layer("game"),
  	pos(93, 199),
    //area(),    
    
  ])
  guysit.play("idle")
  guysit.flipX(true)
  const civic = add([
    sprite(k.getData("car")),
    "car",
    scale((k.getData("car") == "porsche" ? 1.8 : 2)),
    layer("game"),
  	pos(5, 280),
    origin("botleft"),
    area({ height: 10. }), //make this go to bottom
    solid(),
  ])
  civic.play("idle")
  const roadBox1 = add([
    rect(550,20),
    pos(0,191),
    layer("game"),
    area(),
    
    solid(),
    opacity(0),
  ])
  const roadBox2 = add([
    rect(550,20),
    pos(0,335),
    layer("game"),
    area(),
    
    solid(),
    opacity(0),
  ])
  const money = add([
      layer("ui"),
      text("$" + k.getData("money", 0).toString(), {
        font: "sinko",
        size: 20, 
      }),
      color(17, 140, 79),
      pos(520,18),
      area(),  
      
      origin("center"),
    ])
  let scal = 2
  let things = ["buildings2", "buildings1", "bush", "road"]
  civic.onCollide("traffic", () => {      
      destroyAll("traffic")
      if (k.getData("drivetut") == 1) {
        shake(120)
        k.setData("money", k.getData("money") - 10)
      }
    })
  k.onUpdate(() => {
    money.text = "$" + k.getData("money").toString()
    
    if (k.getData("time") == 1) {
      every((obj) => {
        obj.color = rgb(255, 165, 0)
      })
    } 
    if (time() >= start + driveTime) {
      k.go(k.getData("goto"), time()) //to judge increase enc count
    }
    
    let cur = randi(0,2)
    for (let iter in things) {
      let lf = 0;
      if (things[iter] == "buildings1") {
        lf = 5.5
      }
      else if (things[iter] == "buildings2") {
        lf = 11.5
      }
      else {
        lf = 2.5
      }
      every(things[iter], (obj) => {
        //if(things[iter]=="buildings2") debug.log(obj.pos.x)      
        if (obj.pos.x <= 1000*scal && obj.pos.x >= -1000*scal && get(things[iter]).length <= (things[iter] == "buildings1" ? 2 : 1)) {
          add([
            sprite((things[iter] == "buildings1" ? (cur ? "buildings1a" : "buildings1b") : things[iter])),
            things[iter],
            scale(sc),
            z(iter),
            layer("bg"),
          	pos(config.gameWidth-50, yy),
            lifespan(lf),
            //area(),
          ]) //fix sky breaking add white part FIX CLIPPING IN GENERAL
        }
      })
    }
    

    //debug.log(time())

    every("road", (obj) => obj.move(-SPEED,0))
    every("bush", (obj) => obj.move(-(SPEED-50),0))
    every("buildings1", (obj) => obj.move(-(SPEED-500),0))
    every("buildings2", (obj) => obj.move(-(SPEED-800),0))
    //every("sky", (obj) => obj.move(-(SPEED-50),0))
    
    guysit.pos.y = civic.pos.y-94
    civic.z = civic.pos.y
    guysit.z = civic.pos.y
  })

  
  
  let SPEED = 500*scal
  let xtra = 0
  let pSPEED = 70
  if (k.getData("car") == "porsche") {
    pSPEED += 50
    xtra = 100
  }
    k.onKeyDown("up", () => {
      civic.move(0,-pSPEED)
      //guysit.move(0,-pSPEED) //fix bounds of this
    })
    k.onKeyDown("down", () => {
      civic.move(0,pSPEED)
      //guysit.move(0,pSPEED)
    })

  let cars = ["civic2", "accord"]
  function spawnCar() {
  	const dir = choose([RIGHT, RIGHT])
    let rr = randi(0,2)
  	const temp = add([
  		sprite(cars[rr]),
  		move(dir, -rand(220+xtra, 320+xtra)),
      color(randi(150,250),randi(150,250),randi(150,250)),
  		//cleanup(),
      lifespan(8),
      scale(2),
      layer("game"),
      "traffic",
  		pos(width()+200, height() - randi(100, 20)),
  		rotate(),
  		z(50),

      origin("botleft"),
      area({ height: 10. }), //make this go to bottom
      solid(),
  	])
    temp.z = temp.pos.y
    temp.play("idle")
  
  	wait(rand(5, 7), spawnCar)
  }
  
  wait(5, () => spawnCar());

})