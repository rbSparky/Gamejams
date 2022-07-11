import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/intro.js"


  let dialog = [
    "Press [space] to go to the next dialogue",
    "You: Man I hate this rusty old office",
    "Friend: Hmm", 
    "You: I hate this stupid job",
    "Friend: Hmm", 
    "You: I wanted to be something big in life",
    "Friend: ...",
    "You: I wanted to be a chef when I was a child!",
    "Friend: And I wanted to be a giraffe",
    "Friend: Life doesn't always work out",
    "Friend: Can't do anything about it",
    "Friend: So stop whining",
    "You: ...",
    "You: Aren't you supposed to be encouraging me or something",
    "You: This is not how you start a story based game",
    "Friend: Isn't that a tad bit generic",
    "You: Oh come on",
    "Friend: Uhh.. Oh that reminds me there's a big food contest coming up",
    "Friend: It's the one where people will have to cook the spiciest tastiest food",
    "Friend: And the winner gets to be a sous chef for the great Dr Houvenshneiden",
    "You: Dr Houvenshneiden, you mean the best chef in the country?",
    "Friend: Yeah who else has a name like that",
    "Friend: The contest is in 5 days",
    "You: How will I ever prepare for that if I spend all day here at the office",
    "Friend: What are you trying to foreshadow an event or something",
    "You: Shh you aren't supposed to say that",
    //Boss comes in
    "BOSS: YOU ARE FIRED",
    "BOSS: You didn't compete any of the tasks I gave you last week",
    "Friend: That was some really bad foreshadowing",
    "You: Yay",
    "BOSS: What",
    "You: Woo hoo",
    "BOSS: That wasn't the reaction I expected but ok I guess",
    "You: I'm going to win that contest",
    "And so the story begins...",
    "Friend: So you're just going to fade out now or something?",
    "You: ...",
    "Friend: Oh real original of you",
    "Friend: *clap* *clap*",
    "Friend: Such brilliant storywriting",
    "Ok I'm tired of this don't press the spacebar so quick", //meta
    "No seriously, calm down",
    "You'll break your finger",
    "...","...","...","...","...",
    "This is quite dumb",
  ]

k.scene("intro", (start) => {
  
  
  let sc = 3.5
  add([
    rect(48,400),
    color(0,0,0),
    pos(0,0),
    z(10),
  ])
  add([
    rect(55,400),
    color(0,0,0),
    pos(509,0),
    z(10),
  ])
  function spawnCloud() {
  	add([
  		sprite("cloud"+randi(1,7).toString()),
  		move(RIGHT, rand(5, 10)),
  		cleanup(),
      scale(1.5),
  		pos(143, rand(54, 68)),
  		origin("top"),
  		area(),
  		z(-4.5),
  	])
  	wait(rand(4, 10), spawnCloud)
  }
  spawnCloud()
  let spriteNames = ["backdrop", "tiles", "shades", "chairwindow", "table"]
  for (let iter in spriteNames) {
    add([
      sprite(spriteNames[iter]),
      spriteNames[iter],
      scale(sc),
    	pos(config.gameWidth/2, config.gameHeight/2 - 50),
      origin("center"),
      z(iter),
      //area(),
    ])
  }
  add([
      sprite("guysit2", { flipX: 1 }),
      "guysit2",
      scale(sc),
    	pos(143, 153),
      origin("center"),
      z(3),
      area(),
     
    ])
  //every("guysit2", (obj) => obj.flipX(true))
  add([
      sprite("friend"),
      "friend",
      scale(sc),
    	pos(381, 158),
      origin("center"),
      z(3),
      area(),
      
    ])
  add([
      sprite("pr1"),
      "pr1",
      scale(1),
    	pos(config.gameWidth/2, config.gameHeight/2 - 50),
      origin("center"),
      z(-50),
      //area(),
    ])
  add([
      sprite("dialog"),
      "dialog",
      scale(2.5),
    	pos(config.gameWidth/2, 289),
      origin("center"),
      z(50),
      area(),
    
    ])
  spriteNames = ["pr2","pr3"]
  for (let iter in spriteNames) {
    add([
      sprite(spriteNames[iter]),
      spriteNames[iter],
      scale(0.4),
    	pos(config.gameWidth/2, config.gameHeight/2 - 50),
      origin("center"),
      z(iter - 5),
      //area(),
    ])
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
    pos(47,257),
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
      if (dialog[diaIdx].includes("Friend:")) {
        every("friend", (obj) => obj.play("talking"))
        every("guysit2", (obj) => obj.play("idle"))
      }
      else if (dialog[diaIdx].includes("You:")) {
        every("guysit2", (obj) => obj.play("talking"))
        every("friend", (obj) => obj.play("idle"))
      } 
      else if (dialog[diaIdx].includes("BOSS:")) {
        every("guysit2", (obj) => obj.play("idle"))
        every("friend", (obj) => obj.play("idle"))
        shake(120)
      }
      else {
        every("guysit2", (obj) => obj.play("idle"))
        every("friend", (obj) => obj.play("idle"))
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
  k.onUpdate(() => {
    if(diaIdx >= 36) {
      fade.opacity += 0.005
      wait(3, () => k.go("room", time()))
    }
  })
})


