import express from "express"
const router = express.Router()
import {authAndVerifyAdmin} from "./cutomauth.js"
import {updateProduct} from "./helper.js"

// update the stock items
router.route("/:id")
.put(authAndVerifyAdmin, async(request, response)=>{
    const {data} = request.body
    const {id} = request.params
    const result = await updateProduct(id,data)
})