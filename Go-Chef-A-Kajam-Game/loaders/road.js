import { config } from "/config.js";
import { k } from "/kaboom.js"

k.loadSprite("road", "sprites/road/road.png")
k.loadSprite("sky", "sprites/road/sky.png")
k.loadSprite("bush", "sprites/road/bushes.png")
k.loadSprite("buildings1a", "sprites/road/buildings1a.png")
k.loadSprite("buildings1b", "sprites/road/buildings1b.png")
k.loadSprite("buildings2", "sprites/road/buildings2.png")
let carsList = ["civic", "civic2", "accord", "porsche"]

for (let iter in carsList) {
  k.loadSprite(carsList[iter], "sprites/road/" + carsList[iter] + ".png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
          "idle": {
              from: 0,
              to: 1,
              loop: true,
              speed: 10,
          },
      }
  })
}
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
k.loadSprite("guyhappy", "sprites/road/guyhappy.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        "happy": {
            from: 0,
            to: 5,
            loop: true,
            speed: 6,
        },
    }
})

             
/*, {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle": {
            from: 0,
            to: 2,
            loop: true,
            speed: 3,
        },
    }
})*/