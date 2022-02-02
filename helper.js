import { client } from "./index.js";
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";

 async function getPizza() {
    return await client.db("practice").collection("pizzas").find({}).toArray();
}
 async function postPizza(data) {
    return await client.db("practice").collection("pizzas").insertMany(data);
}

 async function addToCart(cartItem) {
    return await client.db("pizza").collection("cart").insertOne(cartItem);
}

 async function updateAddToCart(userId, cartItem) {
    return await client.db("pizza").collection("cart").updateOne({userId:userId}, {$push:{"cartItems":cartItem}});
}

// this will increase the quantity if the same product is already present
async function isProductExist(userId, checkProduct, oldQuantity, newQuantity) {
    return await client.db("pizza").collection("cart").updateOne({"userId":userId, "cartItems._id":checkProduct}, {$set:{"cartItems.$.quantity":parseInt(oldQuantity) + parseInt(newQuantity)}});
}

// delete cart items
 async function deleteCartItems(id,userId) {
    return await client.db("pizza").collection("cart").updateOne({"userId":userId},{$pull:{"cartItems":{_id:id}}});
}

 async function getCartItems(id) {
    return await client.db("pizza").collection("cart").findOne({id:id});
}

async function placeOrder(order) {
    return await client.db("pizza").collection("orders").insertOne(order);
}

async function getOrders(userId){
    console.log(userId)
    return await client.db("pizza").collection("orders").find({userId:userId}).toArray()
}

async function adminGetOrders(){
    return await client.db("pizza").collection("orders").find({}).toArray()
}

async function updateOrders(orderId, stage){
    console.log(orderId, stage)
    return await client.db("pizza").collection("orders").updateOne({"_id":ObjectId(orderId), "orderStatus.stage":stage}, {$set:{"orderStatus.$.isCompleted":"true", "orderStatus.$.updatedAt": new Date().toISOString()}}, {upsert: true})
}

async function createUser(data) {
    return await client.db("pizza").collection("users").insertOne(data);
}

async function getByUserName(username){
    return await client.db("pizza").collection("users").findOne({username:username})
}

async function getUserById(userId){
    return await client.db("pizza").collection("cart").findOne({userId:userId})
}

async function createAdmin(data) {
    return await client.db("pizza").collection("admin").insertOne(data);
}

async function getByAdminName(adminname){
    return await client.db("pizza").collection("admin").findOne({adminname:adminname})
}

async function updatePassword(data){
    return await client.db("practice").collection("users").updateOne({id:data.userId, $set: data.password})
}

async function updateProduct(id,data){
    return await client.db("practice").collection("cutompizzas").updateOne({id:id, $set:data})
}

// add ingredients for custom pizzas
 async function addIngredients(ingredient) {
    return await client.db("pizza").collection("ingredients").insertOne(ingredient);
} 

// get the ingredient type
async function getIngredientTypeFromCart(ingredientType){
    return await client.db("pizza").collection("ingredients").findOne({ingredientType:ingredientType})
}

// add ingredients to the same ingredient type
 async function updateAddIngredients(ingredientType, newIngredient) {
    return await client.db("pizza").collection("ingredients").updateOne({ingredientType:ingredientType}, {$push:{"ingredients":newIngredient}});
}

// update the stock and price of the ingredient
async function updateIngredients(ingredientName, ingredients){
    console.log(ingredientName, ingredients)
    return await client.db("pizza").collection("ingredients").replaceOne({"ingredientName":ingredientName}, {...ingredients})
}

// get ingredients

async function getIngredients(){
    return await client.db("pizza").collection("ingredients").find({}).toArray()
}

// admin get ingredients

async function adminGetIngredients(){
    return await client.db("pizza").collection("ingredients").find({}).toArray()
}

async function handleQty(ingredientName, qty){
    return await client.db("pizza").collection("ingredients").updateMany({"ingredientName":{$in:ingredientName}},{$inc:{"stock":-qty}})
}

async function genPassword(password){
    const NO_OF_ROUNDS = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    return hashedPassword
}

export {getPizza, postPizza, createUser, genPassword,getByUserName,updatePassword,updateProduct,addToCart,deleteCartItems,getCartItems,createAdmin,getByAdminName, getUserById, updateAddToCart, isProductExist,placeOrder, getOrders, updateOrders, adminGetOrders, addIngredients,getIngredientTypeFromCart,updateAddIngredients, updateIngredients,getIngredients,handleQty, adminGetIngredients}