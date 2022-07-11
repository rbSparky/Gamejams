import { config } from "/config.js";
import { k } from "/kaboom.js"

k.loadSprite("trans", "sprites/menu/trans.png")
k.loadSprite("button", "sprites/menu/buttons.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        "click": {
            from: 0,
            to: 1,
            loop: false,
            speed: 30,
        },
        "idle": 0,
    },
})
k.loadSprite("buttonsbig", "sprites/menu/buttonsbig.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        "click": {
            from: 0,
            to: 1,
            loop: false,
            speed: 30,
        },
        "idle": 0,
    },
})
k.loadSprite("mbg", "sprites/menu/mbg.png")
k.loadSprite("pr1", "sprites/intro/pr1.png")
