import { config } from "/config.js"
import { k } from "/kaboom.js"
import "/loaders/menu.js"
import "/loaders/road.js"

k.scene("winner", (start) => {
  const pr1 = k.add([
  	sprite("pr1"),
    scale(1),
    layer("bg"),
  	pos(0, 0),
  ]);
  const win = add([
      "tx",
      layer("ui"),
      text("You Win\n1st Prize", {
        font: "sinko",
        size: 50,
        transform: (idx, ch) => ({       
    			color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
    			pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
    			scale: wave(1, 1.2, time() * 3 + idx),
    			angle: wave(-2, 2, time() * 3 + idx),
    		}),
      }),
      pos(vec2(config.gameWidth/2, config.gameHeight/2 - 30)),
      origin("center"),
    ])
  
  const thnx = add([
      "tx",
      layer("ui"),
      text("Thanks for playing!", {
        font: "sinko",
        size: 20,
        transform: (idx, ch) => ({       
    			color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
    			pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
    			scale: wave(1, 1.2, time() * 3 + idx),
    			angle: wave(-2, 2, time() * 3 + idx),
    		}),
      }),
      pos(vec2(config.gameWidth/2, config.gameHeight/2 + 100)),
      origin("center"),
    ])

  const guy = add([
      layer("ui"),
      sprite("guyhappy"),
      scale(6),
      pos(vec2(config.gameWidth/2 + 125, config.gameHeight/2 + 50)),
    ])
  guy.play("happy")
})