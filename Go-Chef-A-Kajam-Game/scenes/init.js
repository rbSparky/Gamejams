import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/init.js"

k.scene("init", () => {
  const pr3 = k.add([
  	sprite("pr1"),
    scale(1),
  	pos(0, 0),
  ]);
  const tx = k.add([
    text("Click to start the game", {
        font: "sinko",
        size: 25,
        transform: (idx, ch) => ({
			    pos: vec2(0, wave(-2, 2, time() * 4 + idx * 0.5)),
			    scale: wave(1, 1.2, time() * 3 + idx),
			    angle: wave(-1, 1, time() * 1 + idx),
    		}),
    }),    
    pos(vec2(config.gameWidth/2, config.gameHeight/2)),             
    origin("center"),
  ])
  
  
  k.setData("init", 500)
  k.setData("recipes", {
    "Chilli Potato Sandwich": ["chillis", "potato", "bread", "ketchup"],
    "Cool Chilli Potato Sandwich": ["chillis", "potato", "bread", "ketchup", "cucumber"],
    "Potato Sandwich": ["potato", "bread", "ketchup"],
  })
  k.setData("daysLeft", 5)
  k.setData("time", 0)
  k.setData("money", 0)
  k.setData("encounter", 0)
  k.setData("car", "civic")
  k.setData("fish", 0)
  k.setData("goldChilli", 0)
  k.setData("shrimp", 1)
  k.setData("encounter", 1)
  k.setData("gametut", 0)
  k.setData("drivetut", 0)
  k.setData("cooktut", 0)

  let SPEED = 0
  k.onUpdate(() => {
    k.onMousePress(() => {
      let start = time()    
      //k.go("shop", start, "Cool Chilli Potato Sandwich")
      SPEED = 1000
      wait(0.5, () => k.go("menu", start))
    })
    tx.move(0,-SPEED)
  })
})