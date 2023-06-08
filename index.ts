import { italic } from "colorette";
import { Spell, createMagic } from "./src";

const router = new Spell("/api/*id")

const magic = createMagic();

magic.use((req, res, next) => {
    console.log("You made it to middleware 1 ✨")
})

magic.use((req, res, next) => {
    console.log("You made it to middleware 2 ✨")
})

router.post((req, res) => {
    console.log(italic("✨     " + ("New POST request: " + req.url)))

    res.json({
        message: "You made it ✨"
    })
});

const routers = [router]

magic.registerRoutes(routers)

console.log()
magic.listen(8010)