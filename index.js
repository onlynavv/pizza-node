import express from "express"
import {MongoClient} from "mongodb"
import dotenv from "dotenv"
import {pizzaRouter} from "./pizzas.js"
import cors from "cors"

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

app.listen(PORT, ()=>{
    console.log("app started at ", PORT)
})


