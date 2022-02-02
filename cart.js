import express from "express"
import { authAndVerifyUser } from "./cutomauth.js"
const router = express.Router()
import {addToCart,deleteCartItems,getCartItems, getUserById, updateAddToCart, isProductExist} from "./helper.js"

// adding items to cart

router.route("/addToCart")
.post(authAndVerifyUser, async(request, response)=>{
    const userId = request.user.id
    const userFromCart = await getUserById(userId)

    if(userFromCart){
        // if the user already exists in the cart

        const checkProduct = request.body.cartItems._id
        const newQuantity = request.body.cartItems.quantity

        const productExist = userFromCart.cartItems.find((item)=>{
            return item._id === checkProduct
        })

        if(productExist){
            const result = await isProductExist(userId, checkProduct, newQuantity, productExist.quantity)
            response.send(result)
        }else{
            const {cartItems} = request.body
            const result = await updateAddToCart(userId, cartItems)
            response.send(result)
        }

    }else{
        const cartItems = [request.body.cartItems]
        // data here is to be array of objects / pizzas coming from the front end
        const cartItem = {userId, cartItems}
        // cartItem will be the object carrying user id and data as the properties

        const result = await addToCart(cartItem)
        response.send(result)
    }
})

// delete the cart items

router.route("/deleteFromCart")
.put(authAndVerifyUser, async(request, response)=>{
    const userId = request.user.id
    const userFromCart = await getUserById(userId)

    if(userFromCart){
        // if the user already exists in the cart

        const checkProduct = request.body.cartItems._id

        const productExist = userFromCart.cartItems.find((item)=>{
            return item._id === checkProduct
        })

        if(productExist){
            const result = await deleteCartItems(checkProduct,userId)
            response.send(result)
        }else{
            response.send({msg:"item not found"})
        }

    }else{
        response.send({mgs:"user not found"})
    }
})

// get the cart items

// router.route("/getCartItems")
// .get(authAndVerifyUser, async(request, response)=>{
//     const userId = request.user.id
//     const userFromCart = await getUserById(userId)
//     const result = await getCartItems(id)
//     response.send(result)
// })

export const cartRouter = router