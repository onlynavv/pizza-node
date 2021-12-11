import express from "express"
import { auth } from "./cutomauth.js"
const router = express.Router()
import { getPizza, postPizza } from "./helper.js"

router
.route("/")
.get(async(request, response)=>{
    const result = await getPizza()
    console.log(result)
    const user = request.user
    response.send({result, user})
})
.post(async(request, response)=>{
    const data = request.body
    const result = await postPizza(data)
    response.send(result)
})

router
.route("/users")
.get((request, response)=>{
    // const result= await getUser()
    // console.log(result)
    response.send("user test is succesfull")
})

export const pizzaRouter = router