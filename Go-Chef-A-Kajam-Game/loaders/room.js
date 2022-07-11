import { config } from "/config.js";
import { k } from "/kaboom.js"

k.loadSprite("room", "sprites/room/room.png")
k.loadSprite("roomui", "sprites/room/roomui.png")
k.loadSprite("guysit", "sprites/room/guysit.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        "idle": {
            from: 0,
            to: 2,
            loop: true,
            speed: 6,
        },
      "talking": {
            from: 3,
            to: 5,
            loop: true,
            speed: 6,
        },
    }
})