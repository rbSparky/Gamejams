import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/menu.js"
import "/loaders/room.js"

k.scene("bookshop", (start) => {
  layers([
    "bg",
  	"game",
  	"ui",
  ], "game")
  
  
  const pr1 = k.add([
  	sprite("pr1"),
    scale(1),
    layer("bg"),
  	pos(0, 0),
  ]);
  const trans = k.add([
  	sprite("trans"),
    layer("bg"),
    scale(1),
  	pos(0, config.gameHeight),
  ]);
  const mbg = k.add([
  	sprite("mbg"),
    scale(4),
    layer("ui"),
  	pos(config.gameWidth/2, config.gameHeight+250),
    origin("center"),
  ]);

  
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
        size: 8,
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

  const title = add([
      "tx",
      layer("ui"),
      text("Bookshop", {
        font: "sinko",
        size: 25,
      }),
      pos(vec2(config.gameWidth/2, config.gameHeight+90)),
      origin("center"),
    ])
  const price = add([
      "tx",
      layer("ui"),
      color(0,0,0),
      text("Price: $50", {
        font: "sink",
        size: 8,
      }),
      pos(vec2(config.gameWidth/2, config.gameHeight+110)),
      origin("center"),
    ])
  
  addButtonBig("How To Cut Right", vec2(config.gameWidth/2, config.gameHeight+150))
  addButtonBig("Shrimp Cookbook", vec2((config.gameWidth/2), (config.gameHeight)+150+60))
  addButtonBig("Fish Cookbook", vec2((config.gameWidth/2), (config.gameHeight)+150+120))
  
  

  let off = start + 2, tt = 0

  k.onUpdate(() => {    
    
    if(time() < off+3) tt =  time()
    
    
    if(tt>off && tt<off+2) trans.move(0,-1500)
  	if(tt>off+2 && tt<off+2.7) {
      destroy(trans)
      pr1.color = hsl2rgb(wave(0, 1, time()), 0.8, 0.2)
  		mbg.move(0,-500)
      every("button", (obj) => {
        obj.move(0,-500)
      })
      every("tx", (obj) => {
        obj.move(0,-500)
      })      
  	}
    if(tt>off+2.7){
      if(k.getData("money")<50) {
        addButtonBig("Not enough money", vec2(config.gameWidth/2, config.gameHeight/2))
        wait(3, () => {
          k.go("room", time())
        })
      }
    }
  })

  const money = add([
      layer("ui"),
      text("$" + k.getData("money").toString(), {
        font: "sinko",
        size: 20, 
      }),
      color(17, 140, 79),
      pos(520,18),
      //area(),  
      
      origin("center"),
    ])

  let curTime = getData("time")
  if(k.getData("money")>=50) {
    k.onClick("How To Cut Right", (bt) => { 
      add([
      	sprite("mbg"),
        scale(5),
        layer("ui"),
        z(4),
      	pos(config.gameWidth/2, config.gameHeight/2 + 100),
        origin("center"),
      ]);
      add([
      	text("Cutting Skill +", {
          font: "sink",
          size: 20,
        }),
        color(0,0,0),
        layer("ui"),
        z(6),
      	pos(config.gameWidth/2, config.gameHeight/2),
        origin("center"),
      ]);
      k.setData("money",k.getData("money")-50)
      //addButtonBig("CuttingSkill+", vec2(config.gameWidth/2, config.gameHeight/2))
      k.setData("time", curTime + 1)
      wait(7, () => {
        k.go("room", time())    
      })
    })

    k.onClick("Shrimp Cookbook", (bt) => { 
        add([
      	sprite("mbg"),
        scale(50),
        layer("ui"),
        z(4),
      	pos(config.gameWidth/2, config.gameHeight/2 + 100),
        origin("center"),
      ]);
      add([
      	text("Shrimp recipes added", {
          font: "sink",
          size: 20,
        }),
        color(0,0,0),
        layer("ui"),
        z(6),
      	pos(config.gameWidth/2, config.gameHeight/2),
        origin("center"),
      ]);
      k.setData("shrimp", 1)
      k.setData("money",k.getData("money")-50)
      //addButtonBig("CuttingSkill+", vec2(config.gameWidth/2, config.gameHeight/2))
      k.setData("time", curTime + 1)
      wait(7, () => {
        k.go("room", time())    
      })
    })

    k.onClick("Fish Cookbook", (bt) => { 
        add([
      	sprite("mbg"),
        scale(50),
        layer("ui"),
        z(4),
      	pos(config.gameWidth/2, config.gameHeight/2 + 100),
        origin("center"),
      ]);
      add([
      	text("Fish recipes added", {
          font: "sink",
          size: 20,
        }),
        color(0,0,0),
        layer("ui"),
        z(6),
      	pos(config.gameWidth/2, config.gameHeight/2),
        origin("center"),
      ]);
      k.setData("fish", 1)
      k.setData("money",k.getData("money")-50)
      //addButtonBig("CuttingSkill+", vec2(config.gameWidth/2, config.gameHeight/2))
      k.setData("time", curTime + 1)
      wait(7, () => {
        k.go("room", time())    
      })
    })
  }

  
})
