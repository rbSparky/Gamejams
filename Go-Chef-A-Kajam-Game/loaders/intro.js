import { k } from "/kaboom.js"

let spriteNames = ["backdrop", "chairwindow", "cloud1", "pr1", "pr2","pr3", "shades", "table", "tiles", "dialog","cloud2","cloud3","cloud4","cloud5","cloud5","cloud6",]
for (let iter in spriteNames) 
  k.loadSprite(spriteNames[iter], "sprites/intro/" + spriteNames[iter] + ".png")

k.loadSprite("guysit2", "sprites/intro/guysit2.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      "idle": {
          from: 0,
            to: 0,
            loop: true,
            speed: 11,
        },
        "talking": {
            from: 0,
            to: 3,
            loop: true,
            speed: 11,
        },
    }
})
k.loadSprite("friend", "sprites/intro/friend.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        "idle": {
          from: 0,
            to: 0,
            loop: true,
            speed: 11,
        },
        "talking": {
            from: 0,
            to: 3,
            loop: true,
            speed: 11,
        },
    }
})