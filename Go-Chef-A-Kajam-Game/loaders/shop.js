import { config } from "/config.js";
import { k } from "/kaboom.js"

k.loadSprite("shop", "sprites/shop/shop.png")
k.loadSprite("chillis", "sprites/shop/chillis.png")
k.loadSprite("coke", "sprites/shop/coke.png")
k.loadSprite("coffee", "sprites/shop/coffee.png")
k.loadSprite("cucumber", "sprites/shop/cucumber.png")

k.loadSprite("goldChilli", "sprites/shop/goldChilli.png")
k.loadSprite("shrimp", "sprites/shop/shrimp.png")
k.loadSprite("fish", "sprites/shop/fish.png")
k.loadSprite("spices", "sprites/shop/spice.png")

k.loadSprite("ketchup", "sprites/shop/ketchup.png")
k.loadSprite("knife1", "sprites/shop/knife1.png")
k.loadSprite("knife2", "sprites/shop/knife2.png")
k.loadSprite("mustard", "sprites/shop/mustard.png")
k.loadSprite("plate", "sprites/shop/plate.png")
//k.loadSprite("pot", "sprites/shop/pot.png")
k.loadSprite("potato", "sprites/shop/potato.png")
k.loadSprite("sandwich", "sprites/shop/sandwich.png")
k.loadSprite("bread", "sprites/shop/bread.png")
k.loadSprite("toast", "sprites/shop/toast.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        "noBread": 0,
        "yesBread": 1,
        "yesToast": 2,
    }
})
k.loadSprite("box", "sprites/shop/box.png")
k.loadSprite("sparkle", "sprites/shop/sparkle.gif")
k.loadSprite("pot", "sprites/shop/potanim.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        "idle": {
            from: 0,
            to: 1,
            loop: true,
            speed: 3,
        },
        "splash": {
            from: 0,
            to: 3,
        },
    }
})
