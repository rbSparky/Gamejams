import { k } from "/kaboom.js"

k.loadSprite("judge", "sprites/judge/judge.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
      "idle": {
          from: 0,
            to: 1,
            loop: true,
            speed: 6,
        },
        "talking": {
            from: 1,
            to: 4,
            loop: true,
            speed: 6,
        },
    }
})