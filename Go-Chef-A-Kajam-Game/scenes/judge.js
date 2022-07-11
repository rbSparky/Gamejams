import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/judge.js"
import "/loaders/room.js"
import "/loaders/intro.js"
 
k.scene("judge", (start) => {
  //k.setData("encounter", 3)
  let encounter = k.getData("encounter")
  
  layers([
    "bg",
  	"game",
  	"ui",
  ], "game")
  
  function spawnCloud() {
  	add([
  		sprite("cloud"+randi(1,7).toString()),
  		move(RIGHT, rand(5, 10)),
  		cleanup(),
      scale(1.5),
      layer("bg"),
  		pos(-10, rand(24, 54)),
  		origin("top"),
  		area(),
      "window",
  		z(-48.5),
  	])
  	wait(rand(4, 10), spawnCloud)
  }
  spawnCloud()

  let xx = 150, yy = 50, sc = 2
  
  const sky = add([
    rect(555,500),
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
  	pos(-16, 92-20),
    "window",
    z(-49),
  ])
  const bush = add([
    sprite("bush"),
    "bush",
    scale(sc),
    layer("bg"),
    "window",
  	pos(-3, 99-20),
    z(-48),

  ])
  const road = add([
    sprite("road"),
    "road",
    scale(sc),
    layer("bg"),
    "window",
    z(-47),
  	pos(-14, 95-20),
  ])
  const judge = add([
    sprite("judge"),
    "judge",
    pos(361,122),        
    opacity(1),
    area(),
    scale(4),
    
  ])
  const guysit = add([
    sprite("guysit", { flipX: true }),
    pos(92,124),     
    "guysit",
    opacity(1),
    area(),
    scale(4),
   
  ])
  guysit.play("idle")
  judge.play("idle")
  add([
      sprite("dialog"),
      "dialog",
      scale(2.74),
    	pos(config.gameWidth/2, 279),
      origin("center"),
      z(50),
      area(),
      
    ])
  let curDaysLeft = k.getData("daysLeft")
  let off = start + 2, tt = 0
  k.onUpdate(() => {    
    tt = time()
    if(tt>off+1 && tt<off+3) fade.opacity -= 0.01
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
  })

  let dialog = []

  if (encounter == 1) {
    dialog = [
      "You: Hi Dr Houve- Houven- Who- ...",
      "Dr H: Just call me Dr H",
      "You: Ok Dr H, I just wanted to come over and ask for some advice about the coming up SPICE cooking competition",
      "Dr H: Oh so you want to learn some recipes and what not",
      "You: I guess, yeah",
      "Dr H: Well I first I need to see your cooking",
      "You: Well, I run a small food shop",
      "Dr H: What do you serve",
      "You: Different kinds of sandwiches, that's it",
      "Dr H: Oh the Creator of this game was really lazy with the recipes huh",
      "Uhh",
      "Dr H: Anyway, cook me your best item",
    ]
  } else if (encounter == 1.5) {
    dialog = [
      "Dr H: The dish is ok, but it could use a bit of SHRIMP",
      "DR H: Grab the SHRIMP COOKBOOK from the book store to learn how to cook it",
    ]
  } else if (encounter == 2) {
    dialog = [
      "Dr H: I need a book from the store, go get it",
      "Dr H hands you a slip with the book's name on it",
      "You: Wait what that's it?",
      "Dr H: Yeah now go scatter shoo",
      "You: This is a filler mission come on, build up the story or something",
      "Dr H: For a protagnist, you speak way too much, learn something from Link!",
      ]
  } else if (encounter == 2.5) {
    dialog = [
      "You: Here's the book",
      "Dr H: Oh this is the wrong edition",
      "You: You have to be kidding me",
      "Dr H: Go get the right one",
      "You: If you weren't the judge I would've javelin thrown you into the stars",
      "Dr H: Well I'm glad I'm the judge then",
      ]
  } else if (encounter == 2.7) {
    dialog = [
      "You: Here's the book",
      "Dr H: Amazing, If you come visit me once again before the contest",
      "Dr H: I'll give you the secret golden chilli",
      "You: Oh wow",
      "Dr H: But scram for now",
    ]
  } else if (encounter == 3) {
    dialog = [
      "Dr H: Let's go out",
      "You: But I just came in",
      "Dr H: Today will be a little different",
      "You: What do you mean",
      "Dr H: Today you'll drive with me in my supercar",
      "You: What",
      "Dr H: I'm too afraid to drive it myself",
      "You: Why'd you even buy it then",
      "Dr H: Today we shall have funnn woo",
      "You: Wait but the contest is coming close now",
      "Dr H: I'll give you the secret chilli only if you drive me around in the car first",
      "Dr H: Let's go!!",
    ]
  } else if (encounter == 3.5) {
    dialog = [
      "Dr H: That was great, I'm going to go to Monaco for a Food Festival now",        "Dr H: you can keep this car until I come back for the SPICE competition",
      "You: Wait, I-",
      "Dr H: See ya!",
    ]
  }
  
  let diaIdx = 0
  const tx = add([
    text(dialog[diaIdx], {
      width: config.gameWidth - 90,
      size: 20,
      font: "sink",
    }),
    z(100),
    color(0,0,0),
    pos(47,237),
    area(),
    
  ])
  onKeyPress("space", () => {
    if (diaIdx == dialog.length - 1) {
      
      tx.text = ""
      //every("dialog", (obj) => obj.moveTo(1000,1000))
    } 
    else {
      diaIdx += 1
      tx.text = dialog[diaIdx]
      if (dialog[diaIdx].includes("Dr H:")) {
        every("judge", (obj) => obj.play("talking"))
        every("guysit", (obj) => obj.play("idle"))
      }
      else if (dialog[diaIdx].includes("You:")) {
        every("guysit", (obj) => obj.play("talking"))
        every("judge", (obj) => obj.play("idle"))
      } 
      else {
        every("guysit", (obj) => obj.play("idle"))
        every("judge", (obj) => obj.play("idle"))
      }
    }
  })
  const fade = add([
    rect(700,700),
    color(0,0,0),
    pos(0,0),
    layer("ui"),
    z(500),
    opacity(0),
  ])
  let curTime = k.getData("time")
  k.onUpdate(() => {
    if((encounter == 1 && diaIdx >= 11)) {
      fade.opacity += 0.005
      k.setData("goto", "judge")
      k.setData("encounter", 1.5)
      wait(3, () => k.go("shop", time(), "Cool Chilli Potato Sandwich"))
    } else if ( (encounter == 1.5 && diaIdx >= 1)) {
      fade.opacity += 0.005
      k.setData("encounter", 2)
      //k.setData("time", curTime + 1)
      k.setData("shrimpBook", 1)
      wait(3, () => k.go("room", time()))
    } 
    
    else if ( (encounter == 2 && diaIdx >= 5)) {
      fade.opacity += 0.005
      k.setData("encounter", 2.5)
      k.setData("goto", "judge")
      wait(3, () => k.go("road", time(), 60))
    } else if ( (encounter == 2.5 && diaIdx >= 5)) {
      fade.opacity += 0.005
      k.setData("encounter", 2.7)
      k.setData("goto", "judge")
      wait(3, () => k.go("road", time(), 60))
    } else if ( (encounter == 2.7 && diaIdx >= 4)) {
      fade.opacity += 0.005
      k.setData("encounter", 3)
      k.setData("time", curTime + 1)
      k.setData("spices", 1)
      wait(3, () => k.go("room", time()))
    } 
    
    else if ( (encounter == 3 && diaIdx >= 11)) {
      fade.opacity += 0.005
      k.setData("encounter", 3.5)
      k.setData("car", "porsche")
      k.setData("goto", "judge")
      wait(3, () => k.go("road", time(), 120))
    } else if ( (encounter == 3.5 && diaIdx >= 2)) {
      fade.opacity += 0.005
      k.setData("encounter", 4)
      k.setData("time", curTime + 1)
      k.setData("goldChilli", 1)
      wait(3, () => k.go("room", time()))
    }
  })
  
})