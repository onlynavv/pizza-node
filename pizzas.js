import express from "express"
const router = express.Router()
import { getPizza, postPizza } from "./helper.js"

router
.route("/")
.get(async(request, response)=>{
    const result = await getPizza()
    console.log(result)
    response.send(result)
})
.post(async(request, response)=>{
    const data = request.body
    const result = await postPizza(data)
    response.send(result)
})

export const pizzaRouter = router