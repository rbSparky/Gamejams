import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/room.js"
import "/loaders/road.js"
import "/loaders/intro.js"
/*
menu options:
go out/start day
hmm
*/

k.scene("room", (start) => {
  //k.setData("encounter", 1)
  //k.record(60)
  //k.setData("money",1000) 
  //k.setData("drivetut", 0)
  if (k.getData("gametut") == 0) {
    let tut = `TUTORIAL

You have 5 days till the contest
Each day you'll have Morning and Afternoon to do whatever you want
You can go to work, cook food, earn money and use that to buy cooking books from the bookshop which cost $50
Or you can go and talk to the judge to learn new things
Balance is key

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
    wait(3, () => {
      onKeyPress("space", () => {
        k.setData("gametut", 1) 
        destroyAll("tut")
      })
    })
    
  }
  
  layers([
    "bg",
  	"game",
  	"ui",
  ], "game")
  function addButton(txt, p) {  
  	const btn = add([
    	sprite("button"),
      "button",
      txt,
      layer("ui"),
    	pos(p),
      z(1),
      //scale(5),
      area({ cursor: "pointer", }),
      origin("center"),
  	])
    const tx = add([
      "tx",
      layer("ui"),
      z(2),
      text(txt, {
        //width: 120,
        font: "sink",
        size: 15,
        transform: (idx, ch) => ({
          color: rgb(0,0,0),
        }),  
      }),
      pos(p),
      origin("center"),
    ])
  	btn.onUpdate(() => {
      k.onClick("button", (bt) => {
        bt.play("click")
        tx.scale = vec2(1.2)
      }) //needs to be inside onUpdate
      if (!isMouseDown()) {
  		  btn.play("idle")
        tx.scale = vec2(1.3)
  	  }  
      
  		if (btn.isHovering()) {
  			btn.scale = vec2(4.2)    
        tx.scale = vec2(1.3)
  		} else {
  			btn.scale = vec2(4)
        tx.scale = vec2(1.2)
  		}
  	})
  }
  
  function addButtonBig(txt, p) {  
  	const btn = add([
    	sprite("buttonsbig"),
      "button",
      txt,
      scale(2.5),
      layer("ui"),
    	pos(p),
      z(1),
      //scale(5),
      area({ cursor: "pointer", }),
      origin("center"),
  	])
    const tx = add([
      "tx",
      layer("ui"),
      z(2),
      text(txt, {
        //width: 120,
        font: "sink",
        size: 10,
        transform: (idx, ch) => ({
          color: rgb(0,0,0),
        }),  
      }),
      pos(p),
      origin("center"),
    ])
  	btn.onUpdate(() => {
      k.onClick("button", (bt) => {
        bt.play("click")
        tx.scale = vec2(1.2)
      }) //needs to be inside onUpdate (not really)
      if (!isMouseDown()) {
  		  btn.play("idle")
        tx.scale = vec2(1.3)
  	  }  
      
  		if (btn.isHovering()) {
  			btn.scale = vec2(4.2)    
        tx.scale = vec2(1.3)
  		} else {
  			btn.scale = vec2(4)
        tx.scale = vec2(1.2)
  		}
  	})
  }



  function spawnCloud() {
  	add([
  		sprite("cloud"+randi(1,7).toString()),
  		move(RIGHT, rand(5, 10)),
  		cleanup(),
      scale(1.5),
      layer("bg"),
  		pos(143, rand(54, 68)),
  		origin("top"),
  		area(),
      "window",
  		z(-48.5),
  	])
  	wait(rand(4, 10), spawnCloud)
  }
  spawnCloud()
  
  const fade = add([
    rect(700,700),
    color(0,0,0),
    pos(0,0),
    layer("ui"),
    z(500),
    opacity(1),
  ])
  const room = add([
    sprite("room"),
    scale(4.1),
    layer("bg"),
  	pos(0, 0),
    //area(),
  ])
  const roomui = add([
    sprite("roomui"),
    scale(4),
    layer("bg"),
  	pos(0, 85),
    //area(),
  ])
  const guysit = add([
    sprite("guysit"),
    scale(3),
    layer("game"),
  	pos(414, 120),
    area({ cursor: "pointer", }),
    
  ])
  guysit.play("idle")

  let xx = 150, yy = 50, sc = 2

  const sky = add([
    rect(500,500),
    "sky",
    "window",
    color(173,216,230), 
    z(-50),
    layer("bg"),
  ])
  const buildings2 = add([
    sprite("buildings2"),
    "buildings2",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    "window",
    z(-49),
    area(),
  ])
  const buildings1a = add([
    sprite("buildings1a"),
    "buildings1",
    scale(sc),
    layer("bg"),
  	pos(xx, yy),
    "window",
    z(-48),
    area(),
  ])

  const mbg = k.add([
  	sprite("mbg"),
    scale(3.5),
    layer("ui"),
    z(0.5),
  	pos(config.gameWidth/3, config.gameHeight+270),
    origin("center"),
  ]);
  const mbg2 = k.add([
  	sprite("mbg"),
    scale(3.5),
    layer("ui"),
    z(0.5),
  	pos(config.gameWidth/3, config.gameHeight+540),
    origin("center"),
  ]);
  
  let recipes = k.getData("recipes")
  //debug.log(recipes["Chilli Potato Sandwich"][0])

  addButton("Work", vec2(config.gameWidth/3, config.gameHeight+150))
  addButton("Drive", vec2((config.gameWidth/3), (config.gameHeight)+150+60))
  addButton("Menu", vec2((config.gameWidth/3), (config.gameHeight)+150+120))

  let curDaysLeft = k.getData("daysLeft")
  let off = start + 2, tt = 0
  
  //sky.color = rgb(203,246,260)
  k.onUpdate(() => {    
    
    if(tt>off+1) if (fade.color.r != 255) fade.opacity -= 0.01
     // this is the fade in 
    if (k.getData("time") == 1) {
      every("window", (obj) => {
        obj.color = rgb(255, 165, 0)
      })
    } else {
      every("window", (obj) => {
        obj.color = rgb(255,255,255)
      })
      sky.color = rgb(95,205,228) 
    }
    
    if (k.getData("time") >= 2) {
      k.setData("time", 0)
      k.setData("daysLeft", curDaysLeft - 1)
    }
    if(time() < off+3) tt =  time()    
  	if(tt>off+2 && tt<off+2.85) {
  		mbg.move(0,-500)
      every("button", (obj) => {
        obj.move(0,-500)
      })
      every("tx", (obj) => {
        obj.move(0,-500)
      })
  	}
    k.onClick("Drive", (bt) => { 
    //to judge,to book shop, to friend house(tutorials)
      destroyAll("button")
      destroyAll("tx")
      if (k.getData("encounter") < 4) addButtonBig("Judge's Home", vec2(config.gameWidth/3, 55))
      addButtonBig("Book Store", vec2((config.gameWidth/3), 55+60))
      addButtonBig("LOCKED", vec2((config.gameWidth/3), 55+120))
      mbg.scale = 3.7
    })
  })

  k.onClick("Menu", (bt) => { 
    k.go("menu", time())    
  })

  

  if (k.getData("daysLeft") == 0) {
      k.setData("final", 1)
      k.setData("goto", "winner")
    let dish = []
    if(k.getData("fish") == 0 && k.getData("shrimp") == 0) {
      dish = choose([
        "Chilli Potato Sandwich",
        "Potato Sandwich",
        "Cool Chilli Potato Sandwich",
      ])
    } else if (k.getData("fish") == 1 && k.getData("shrimp") ==1) {
      dish = "Chilli Fish n Shrimp Sandwich"
    } else if (k.getData("fish") == 0 && k.getData("shrimp") ==1) {
      dish = "Cool Chilli Shrimp Sandwich"
    } else if (k.getData("fish") == 1 && k.getData("shrimp") == 0) {
      dish = choose([
        "Chilli Fish Sandwich",
        "Cool Chilli Fish Sandwich",
      ])
    }
    k.go("shop", time(), dish)    
  }
  
  k.onClick("Work", (bt) => { 
    k.setData("job", 1)
    k.setData("goto", "room")
    let dish = []
    if(k.getData("fish") == 0 && k.getData("shrimp") == 0) {
      dish = choose([
        "Chilli Potato Sandwich",
        "Potato Sandwich",
        "Cool Chilli Potato Sandwich",
      ])
    } else if (k.getData("fish") == 1 && k.getData("shrimp") ==1) {
      dish = choose([
        "Chilli Potato Sandwich",
        "Potato Sandwich",
        "Cool Chilli Potato Sandwich",
        "Cool Chilli Shrimp Sandwich",
        "Chilli Fish Sandwich",
        "Cool Chilli Fish Sandwich",
        "Chilli Fish n Shrimp Sandwich",
      ])
    } else if (k.getData("fish") == 0 && k.getData("shrimp") ==1) {
      dish = choose([
        "Chilli Potato Sandwich",
        "Potato Sandwich",
        "Cool Chilli Potato Sandwich",
        "Cool Chilli Shrimp Sandwich",
      ])
    } else if (k.getData("fish") == 1 && k.getData("shrimp") == 0) {
      dish = choose([
        "Chilli Potato Sandwich",
        "Potato Sandwich",
        "Cool Chilli Potato Sandwich",
        "Chilli Fish Sandwich",
        "Cool Chilli Fish Sandwich",
      ])
    }
    k.go("shop", time(), dish)    
  })
  k.onClick("Judge's Home", (bt) => {
    k.setData("goto", "judge")
    k.go("road", time(), 60)
  })
  k.onClick("Book Store", (bt) => {
    k.setData("goto", "bookshop")
    k.go("road", time(), 60)
  })
  

  const day = add([
      layer("ui"),
      text("Days Left: " + (k.getData("time") == 2 
                             ? (k.getData("daysLeft")-1).toString() 
                             : k.getData("daysLeft").toString()), {
        font: "sinko",
        size: 20, 
      }),
      pos(132,300),
      area(),  
      
      z(0),
      origin("center"),
    ])
  let times = ["Morning", "Afternoon", "Morning"]
  const daysTill = add([
      layer("ui"),
      text("Time: " + times[k.getData("time")], {
        font: "sinko",
        size: 20, 
      }),
      pos(407,300),
      area(),  
     
      origin("center"),
    ])
  const money = add([
      layer("ui"),
      text("$" + k.getData("money").toString(), {
        font: "sinko",
        size: 20, 
      }),
      color(17, 140, 79),
      pos(520,18),
      area(),  
    
      origin("center"),
    ])
})


//add window
//add some life to this maybe? idk running low on time