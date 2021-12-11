import express from "express"
import { authAndVerifyUser } from "./cutomauth"
const router = express.Router()
import {postCartItems,deleteCartItems,getCartItems} from "./helper.js"

// create cart items

router.route
.post("/", authAndVerifyUser, async(request, response)=>{
    const data = request.body
    const result = await postCartItems(data)
    response.send(result)
})

// delete the cart items

router.route
.put("/:id", authAndVerifyUser, async(request, response)=>{
    const {id} = request.params
    const result = await deleteCartItems(id)
    response.send(result)
})

// get the cart items

router.route
.get("/:id", authAndVerifyUser, async(request, response)=>{
    const {id} = request.params
    const result = await getCartItems(id)
    response.send(result)
})