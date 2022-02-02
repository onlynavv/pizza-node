import express from "express"
import { authAndVerifyAdmin, authAndVerifyUser } from "./cutomauth.js"
const router = express.Router()
import {placeOrder, getOrders, updateOrders, adminGetOrders,handleQty} from "./helper.js"

// adding items to cart

router.route("/placeOrder")
.post(authAndVerifyUser, async(request, response)=>{
    const userId = request.user.id
    console.log(request.body)

    const {order} = request.body

    console.log(order, "15")
    console.log(order.items.filter((item)=>{
        return item.name === "custompizza"
    }),"18")

    const ordersList = order.items.filter((item)=>{
        return item.name === "custompizza"
    })

    const orderStatus = [
        {
            "stage":"pending",
            "isCompleted":"true",
            "updatedAt": new Date().toISOString()
        },
        {
            "stage":"preparing",
            "isCompleted":"false",
        },
        {
            "stage":"on the way",
            "isCompleted":"false",
        },
        {
            "stage":"delivered",
            "isCompleted":"false",
        }
    ]

    const result = await placeOrder({...order, "orderedAt": new Date().toISOString(), "orderStatus": orderStatus})

    for(let i = 0; i<ordersList.length; i++){
    console.log(ordersList[i].ingredients, ordersList[i].qty)
    const updateResult = await handleQty(ordersList[i].ingredients, ordersList[i].qty)
}
    // const updateResult = await handleQty()

    response.send({msg:"got the order",userId})
})

// get the orders
router.route("/getOrders")
.get(authAndVerifyUser, async(request, response)=>{
    const userId = request.user.id
    console.log(userId)

    const result = await getOrders(userId)

    response.send(result)
})

// admin get the orders
router.route("/adminGetOrders")
.get(async(request, response)=>{

    const result = await adminGetOrders()

    response.send(result)
})

// admin update on the order
router.route("/updateOrders")
.post(authAndVerifyAdmin, async(request, response)=>{
    const adminId = request.user.id
    console.log(adminId)
    const {orderId, stage} = request.body
    console.log(orderId, stage)
    const result = await updateOrders(orderId, stage)

    response.send(result)
})


export const orderRouter = router