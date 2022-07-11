import "/scenes/index.js"
import { config } from "/config.js"
import { k } from "/kaboom.js"

//change cursor sprite

(async function() {
  //k.debug.inspect = true
  //k.go("init")
  //k.go("menu", 0)
  //k.go("room")
  k.go("init", time())
})();
