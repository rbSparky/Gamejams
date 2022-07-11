import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/menu.js"
import "/loaders/shop.js"

k.scene("menu", (start) => {
  //loadSound("song", "/music/Opener.mp3")
  //let music = play("song")
  
  layers([
    "bg",
  	"game",
  	"ui",
  ], "game")
  
  let food = ["chillis", "coffee", "coke", "cucumber", "potato", "ketchup", "mustard", "sandwich", "bread"]
  function spawnFood() {
		const name = choose(food.filter(n => n))
		add([
			sprite(name),
			area(),
      layer("game"),
			pos(rand(config.gameWidth), rand(config.gameHeight)),
			origin("bot"),
      rotate(0),
      lifespan(0.2, { fade: 0.1 }),
		])
	}
  
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

  
  function addButton(txt, p) {  
  	const btn = add([
    	sprite("button"),
      "button",
      txt,
      layer("ui"),
    	pos(p),
      //scale(5),
      area({ cursor: "pointer", }),
      origin("center"),
  	])
    const tx = add([
      "tx",
      layer("ui"),
      text(txt, {
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
  const title = add([
      "tx",
      layer("ui"),
      text("Go!Chef", {
        font: "sinko",
        size: 30,
        transform: (idx, ch) => ({       
    			color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
    			pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
    			scale: wave(1, 1.2, time() * 3 + idx),
    			angle: wave(-9, 9, time() * 3 + idx),
    		}),
      }),
      pos(vec2(config.gameWidth/2, config.gameHeight+90)),
      origin("center"),
    ])
  
  addButton("Start", vec2(config.gameWidth/2, config.gameHeight+150+30))
  //addButton("About", vec2((config.gameWidth/2), (config.gameHeight)+150+60))
  addButton("Quit", vec2((config.gameWidth/2), (config.gameHeight)+150+90))
  
 

  let off = start + 2, tt = 0

  wait(2, () => {
    if(isFocused()) {
    loop(0.07, () => {    
      if(isFocused()) {
    	// Compose particle properties with components
    	const item = add([
    		pos(rand(width()), rand(height()-50)),
    		sprite(choose(food)),
        layer("game"),
    		origin("center"),
        "particle",
    		scale(rand(0.5, 1.5)),
    		area(),
    		body({ solid: false, }),
    		lifespan(1, { fade: 0.5 }),
    		move(choose([LEFT, RIGHT]), rand(60, 120)),
    	])
    
    	item.jump(rand(320, 640))
      }
    })
    /*loop(1, () => {  
      if(isFocused()) {
      destroyAll("particle")
      }
    })*/
    }
  })
  k.onClick("Quit", (bt) => { //lies and deception, the game is still running
      add([
        rect(700,700),
        color(0,0,0),
        pos(0,0),
        z(500),
        layer("ui"),
      ])
    })
  k.onUpdate(() => {    

    k.onClick("Start", (bt) => { 
      k.go("intro", time())    
    })
    
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
    //spawnFood()
  })

  
  //if(isFocused()) 
  //particles crashes DONT USE KABOOM LOOP !!!
  //make something else :(((

  
})

/*
make this menu interesting
  	function spawnTrash() {
		const name = choose(objs.filter(n => n != bossName))
		add([
			sprite(name),
			area(),
			pos(rand(0, width()), 0),
			health(OBJ_HEALTH),
			origin("bot"),
			"trash",
			"enemy",
			{ speed: rand(TRASH_SPEED * 0.5, TRASH_SPEED * 1.5) },
		])
		wait(insaneMode ? 0.1 : 0.3, spawnTrash)
	}

  wait(2, () => {
    
    loop(0.07, () => {    
      if(isFocused()) {
    	// Compose particle properties with components
    	const item = add([
    		pos(rand(width()), rand(height()-50)),
    		sprite(choose(food)),
        layer("game"),
    		origin("center"),
        "particle",
    		scale(rand(0.5, 1.5)),
    		area(),
    		body({ solid: false, }),
    		lifespan(1, { fade: 0.5 }),
    		move(choose([LEFT, RIGHT]), rand(60, 120)),
    	])
    
    	item.jump(rand(320, 640))
      }
    })
    loop(1, () => {  
      destroyAll("particle")
    })
  })
//shit crashes
*/