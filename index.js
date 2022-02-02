import express from "express"
import {MongoClient} from "mongodb"
import dotenv from "dotenv"
import {pizzaRouter} from "./pizzas.js"
import {userAuthRouter} from "./userauth.js"
import {adminAuthRouter} from "./adminauth.js"
import cors from "cors"
import { cartRouter } from "./cart.js"
import { orderRouter } from "./order.js"
import { ingredientsRouter } from "./ingredients.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())

const MONGO_URL = process.env.MONGO_URL

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("mongodb connected")
    return client
}

export const client = await createConnection()

app.get("/", (request,response)=>{
    response.send("Hello, PIZZA World !!!")
})

app.use("/pizzas", pizzaRouter)
app.use("/pizzas/auth/user", userAuthRouter)
app.use("/pizzas/auth/admin", adminAuthRouter)
app.use("/pizzas/cart", cartRouter)
app.use("/pizzas/order", orderRouter)
app.use("/pizzas/ingredients", ingredientsRouter)

app.listen(PORT, ()=>{
    console.log("app started at ", PORT)
})


