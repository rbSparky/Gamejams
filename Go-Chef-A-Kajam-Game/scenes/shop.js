import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/shop.js"



k.scene("shop", (start, curRecipe) => {
    if (k.getData("cooktut") == 0) {
      start += 200
      let tut = `TUTORIAL

The recipe to be made will be written on screen, prepare the items as follows in 100 seconds:
- Pick up objects and drag with left mouse click 
- Cut the vegetables using the vegetable knife by moving the knife with an up and down motion over the vegetable till it changes color
- Once cut, drag the vegetables to the pot on the top left

- To make toast, click on the toaster, toast will be ready in 10 seconds
- Click on toaster again and the toast will pop out
- Drag the toast to the plate on the top right to complete the sandwich

- To add ketchup, drag the ketchup bottle and click it over the sandwich to add ketchup to it 
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
          size: 13,
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
      k.setData("cooktut", 1) 
      destroyAll("tut")
    })
  }
  
  //debug.log(start) //why does this not work????? edit: because im stupid
  let curDraggin = null
  let dish = {}
  let ingred = ["chillis", "potato", "bread", "ketchup", "cucumber", "goldChilli", "fish", "shrimp"]
  
  //make separate file?
  let recipes = {
    "Chilli Potato Sandwich": ["chillis", "potato", "bread", "ketchup"],
    "Cool Chilli Potato Sandwich": ["chillis", "potato", "bread", "ketchup", "cucumber"],
    "Potato Sandwich": ["potato", "bread", "ketchup"],    
    "Cool Chilli Shrimp Sandwich": ["chillis", "shrimp", "bread", "ketchup", "cucumber"],
    "Chilli Fish Sandwich": ["chillis", "fish", "bread", "ketchup"],
    "Cool Chilli Fish Sandwich": ["chillis", "fish", "bread", "ketchup", "cucumber"],
    "Chilli Fish n Shrimp Sandwich": ["chillis", "fish", "bread", "ketchup", "shrimp"],
  }
  //curRecipe = "Chilli Fish Sandwich"
  //k.setData("fish", 1)
  //add more items and recipes
   

  function grow(rate) {
		return {
			update() {
				const n = rate * dt()
				this.scale.x += n
				this.scale.y += n
			},
		}
	}
  
  function addExplode(p, n, rad, size,r,g,b, name) {
		for (let i = 0; i < n; i++) {
			wait(rand(n * 0.1), () => {
				for (let i = 0; i < 2; i++) {
					const scp = add([
						pos(p.add(rand(vec2(-rad), vec2(rad)))),
						rect(4, 4),
            area(),
						color(255,0,0),
						scale(1 * size, 1 * size),
						lifespan(0.1),
						grow(rand(48, 72) * size),
						origin("center"),
					])
          scp.onCollide("sand", (sa) => {
            sandwich.color = rgb(r,g,b)
            dish[name] = 1
          })
				}
			})
		}
	}
  
  function drag() {
  	let offset = vec2(0)
  	return {
  		id: "drag",
  		require: [ "pos", "area", ],
  		add() {
  			this.onClick(() => {
  				if (curDraggin) {
  					return
  				}
  				curDraggin = this
  				offset = mousePos().sub(this.pos)
  				//readd(this)
  			})
  		},
  		update() {
  			if (curDraggin === this) {
  				cursor("move")
  				this.pos = mousePos().sub(offset)
  			}
  		},
  	}
  }

  
const box0 = k.add([
  	rect(200,200),
    //"item",
    color(255,240,240),
    scale(1.5),
    //area({ cursor: "pointer", }),
  	pos(130, 0),
    //drag(),
  ]);
  
  const orderT = k.add([
    text("Order",{
      font: "sinko",
      size: 25,
    }),
  	pos(277, 17),
    origin("center"),
  ]);
  const box1 = k.add([
  	sprite("box"),
    //"item",
    scale(1.5),
    //area({ cursor: "pointer", }),
  	pos(-55, -5),
    //drag(),
  ]);
  const box2 = k.add([
  	sprite("box"),
    //"item",
    scale(1.5),
    //area({ cursor: "pointer", }),
  	pos(400, -5),
    //drag(),
  ]);
  const orderText = k.add([
    text(curRecipe,{
      font: "sink",
      size: 15,
      width: 200,      
    }),
    color(0,0,0),
    pos(180,32),
  ])   
  for (let iter in recipes[curRecipe]) {
    const orderText = k.add([
      text("- " + recipes[curRecipe][iter], {
        font: "sink",
        size: 15,
        width: 120,      
      }),
      color(0,0,0),
      pos(180,72 + iter*20),
    ]) 
  }
  const shop = k.add([
  	sprite("shop"),
    scale(0.90),
  	pos(0, 30),
  ]);
  const pot = k.add([
  	sprite("pot"),
    "pot",
    scale(1.4),
    area({ scale: 0.45 }),
  	pos(90, 98),
    origin("center"),
    //drag(),
  ]);
  const pot2 = k.add([  	
    rect(90,90),
    opacity(0),
    "pot2",
    scale(1.4),
    area(),
  	pos(90, 98),
    origin("center"),
  ]);
  
  const plate = k.add([
  	sprite("plate"),
    "plate",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(416, 31),
    //drag(),
  ]);
  const sandwich = k.add([
  	sprite("sandwich"),
    scale(1),
    "sand",
    opacity(0),
    //area({ cursor: "pointer", }),
  	pos(436, 61),
    area(),
    //drag(),
  ]);
  const chillis = k.add([
  	sprite("chillis"),
    "chillis",
    "item",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(200, 200),
    drag(),
    {
      cut: 0,
    },
  ]);
  const coffee = k.add([
  	sprite("coffee"),
    "coffee",
    "item",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(30, 291),
    drag(),
  ]);
  const coke = k.add([
  	sprite("coke"),
    "coke",
    "item",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(70, 291),
    drag(),    
  ]);
  const cucumber = k.add([
  	sprite("cucumber"),
    "cucumber",
    "item",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(210, 230),
    drag(),
    {
      cut: 0,
    },
  ]);
  const ketchup = k.add([
  	sprite("ketchup"),
    "ketchup",
    "item",
    "sauce",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(495, 190),
    drag(),
  ]);
  /*const mustard = k.add([
  	sprite("mustard"),
    "mustard",
    "item",
    "sauce",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(495, 190),
    drag(),
  ]);*/
  const knife1 = k.add([
  	sprite("knife1"),
    //"item",
    scale(1),
    "knife",
    area({ cursor: "pointer", }),
  	pos(340, 200),
    drag(),
  ]);
  const knife2 = k.add([
  	sprite("knife2"),
    //"item",
    scale(1),
    "knife2",
    area({ cursor: "pointer", }),
  	pos(310, 200),
    drag(),
  ]);
  const potato = k.add([
  	sprite("potato"),
    "potato",
    "item",
    scale(1),
    area({ cursor: "pointer", }),
  	pos(113, 186),
    drag(),
    {
      cut: 0,
    },
  ]);
  //k.debug.inspect = true
  if (k.getData("shrimp")) {
    const shrimp = k.add([
  	sprite("shrimp"),
    "shrimp",
    "meat",
    scale(4),
    area({ cursor: "pointer", }),
  	pos(405, 169),
    drag(),
    {
      cut: 0,
    },
  ]);
  }
  if (k.getData("fish")) {
  const fish = k.add([
  	sprite("fish"),
    "fish",
    "meat",
    scale(4),
    area({ cursor: "pointer", }),
  	pos(411, 231),
    drag(),
    {
      cut: 0,
    },
  ]);
  }
  if (k.getData("goldChilli")) {
  const goldChilli = k.add([
  	sprite("goldChilli"),
    "goldChilli",
    "item",
    scale(4),
    area({ cursor: "pointer", }),
  	pos(234, 167),
    drag(),
    {
      cut: 0,
    },
  ]);
  }
  const toast = k.add([
  	sprite("toast"),
    "toast",
    scale(1),
    "item",
    "toast",
    area({ cursor: "pointer", }),
  	pos(50, 184),
    //drag(),
    {
      step: 0,
    }
  ]);  
  toast.play("noBread")

  
  onMouseRelease(() => {
  	curDraggin = null
  })

  
  if (pot.curAnim() !== "idle") {
    pot.play("idle")
  }

  let finalToast = 1;
  
  k.onClick("sauce", (sc) => {
    addExplode(sc.pos, 10, 24, 1,255,170,170, "ketchup") //do for mustard, leave mustard
  })

  
  k.onClick("toast", (sc) => {
    if (toast.step == 0) {
      toast.step += 1
      toast.play("yesBread")
      wait(10, () => {
        toast.play("yesToast")
        toast.step += 1
      })
    }
    if (toast.step == 2) {
      finalToast = add([
            pos(toast.pos),
						sprite("bread"),
            "item",
            "finalToast",
            area({ cursor: "pointer", }),
            drag(),
						origin("center"),
					])
      toast.step = 0
      toast.play("noBread")
    }
  })
  

  //if (this == finalToast && this.isColliding(plate)) 
  onCollide("finalToast", "plate", () => {
    shake(2)
    k.addKaboom(finalToast.pos)
    destroy(finalToast)
    sandwich.opacity = 1
    dish["bread"] = 1
    //debug.log(Object.keys(dish))
  })
  
  for (let iter in ingred) {
      onCollide("pot2", ingred[iter], () => {
        let obj = get(ingred[iter])
        //if (obj == "goldChilli") obj = "chillis"
        //debug.log(obj[0].cut)
        if (obj[0].cut >= 300) {
          if (ingred[iter] == "goldChilli") dish["chillis"] = 1
          else dish[ingred[iter]] = 1
          //debug.log(Object.keys(dish))
        } //tally this with the objects destroyed because this
        //doesnt work sometimes, the collision is just.... bad
      }) //create another object bigger than pot for this check DONE?
  }

  let curMoney = k.getData("money")
  let curTime = k.getData("time")

  k.onUpdate(() => {  
  if (time() >= start + 100) {
    const done = k.add([
        text("FAILED",{
          font: "sinko",
          size: 35,
        }),
        area(),
        drag(),
      	pos(277, 77),
        origin("center"),
        rotate(45),
      ]) //make it p o p 
      
      //go somewhere back or something
      wait(3, () => {       
        if (k.getData("goto") == "room") {
          k.setData("time", curTime + 1)
          k.go("room", time())
        } else {
          k.go("shop", time(), curRecipe) //retry
        }
        //k.go(back, true)
        //if time over go back with false
      })
  }
  else if (JSON.stringify(recipes[curRecipe].sort()) == JSON.stringify(Object.keys(dish).sort())) {
      //debug.log("here")
      const done = k.add([
        text("Done",{
          font: "sinko",
          size: 35,
        }),
        area(),
        drag(),
      	pos(277, 77),
        origin("center"),
        rotate(45),
      ]) //make it p o p 
      
      //go somewhere back or something
      wait(3, () => {        
        if (k.getData("job")) 
          k.setData("money", curMoney + 50)
        k.setData("time", curTime + 1)
        k.go(k.getData("goto"), time())
        //k.go(back, true)
        //if time over go back with false
      })
    }
    every("item", (obj) => {
      if (knife1.isColliding(obj)) {
        //debug.log(obj)
        shake(2)
        obj.cut += 1
        if (obj.cut > 300) {
          obj.color = rgb(50,50,50)
        }
      }
      if (obj.isColliding(pot) && obj.cut >= 300) {
        k.addKaboom(obj.pos)
        destroy(obj)    
        pot.play("splash")
        wait(0.6, () => {
          pot.play("idle")
        })
      }
    })
    every("meat", (obj) => {
      if (knife2.isColliding(obj)) {
        //debug.log(obj)
        shake(2)
        obj.cut += 1
        if (obj.cut > 600) {
          obj.color = rgb(50,50,50)
        }
      }
      if (obj.isColliding(pot) && obj.cut >= 300) {
        k.addKaboom(obj.pos)
        destroy(obj)    
        pot.play("splash")
        wait(0.6, () => {
          pot.play("idle")
        })
      }
    })
    //great code right here wow good job me
    every("item", (bt) => {
  		if (bt.isHovering()) {
  			bt.scale = vec2(1.2)
  		} else {
  			bt.scale = vec2(1)
  		}
    })
    every("meat", (bt) => {
  		if (bt.isHovering()) {
  			bt.scale = vec2(1.2)
  		} else {
  			bt.scale = vec2(1)
  		}
    })
    every("knife", (bt) => {
  		if (bt.isHovering()) {
  			bt.scale = vec2(1.2)
  		} else {
  			bt.scale = vec2(1)
  		}
    })    
    every("knife2", (bt) => {
  		if (bt.isHovering()) {
  			bt.scale = vec2(1.2)
  		} else {
  			bt.scale = vec2(1)
  		}
    })   
  })
  
})

// add some money animation at the end? no time sorry

/*
for (let i = 0; i < STAR_COUNT; i++) {
        const newStar = {
          xpos: rand(-0.5*SCREEN_WIDTH, 0.5*SCREEN_WIDTH),
          ypos: rand(-0.5*SCREEN_HEIGHT, 0.5*SCREEN_HEIGHT),
          zpos: rand(1000)
        };
        stars.push(newStar);
stars.forEach((star)=>{

*/