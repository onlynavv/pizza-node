import express from "express"
const router = express.Router()
import {addIngredients,getIngredientTypeFromCart,updateAddIngredients, updateIngredients, getIngredients, adminGetIngredients} from "./helper.js"
import { authAndVerifyAdmin, authAndVerifyUser } from "./cutomauth.js"

// add ingredients for the custom pizza

router.route("/addItem")
.post(async(request, response)=>{
    console.log(request.body)
    const receivedIngredients = request.body
    const ingredients = {...receivedIngredients, price:parseInt(receivedIngredients.price), stock:parseInt(receivedIngredients.stock)}
    console.log(ingredients)
    const result = await addIngredients(ingredients)
    response.send({msg:"ingredients added", result})
})

// update ingredients price and stock

router.route("/updateItems")
.put(authAndVerifyAdmin, async(request, response)=>{
    console.log(request.body)
    const receivedIngredients = request.body
    const updatedIngredients = {...receivedIngredients, price:parseInt(receivedIngredients.price), stock:parseInt(receivedIngredients.stock)}

    console.log(updatedIngredients.ingredientName, updatedIngredients, "25")

    const result = await updateIngredients(updatedIngredients.ingredientName, updatedIngredients)
    response.send(result)
})

// get admin get the ingredients

router.route("/adminGetIngredients")
.get(authAndVerifyAdmin, async(request, response)=>{
    const result = await adminGetIngredients()
    response.send(result)
})

// users get the ingredients

router.route("/getIngredients")
.get(async(request, response)=>{
    const result = await getIngredients()
    response.send(result)
})


export const ingredientsRouter = router