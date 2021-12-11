import { client } from "./index.js";
import bcrypt from "bcrypt"

 async function getPizza() {
    return await client.db("practice").collection("pizzas").find({}).toArray();
}
 async function postPizza(data) {
    return await client.db("practice").collection("pizzas").insertMany(data);
}

 async function postCartItems(data) {
    return await client.db("practice").collection("pizzas").insertOne(data);
}

 async function deleteCartItems(id) {
    return await client.db("practice").collection("pizzas").deleteOne({id:id});
}

 async function getCartItems(id) {
    return await client.db("practice").collection("pizzas").findOne({id:id});
}

async function createUser(data) {
    return await client.db("practice").collection("users").insertOne(data);
}

async function getByUserName(username){
    return await client.db("practice").collection("users").findOne({username:username})
}

async function updatePassword(data){
    return await client.db("practice").collection("users").updateOne({id:data.userId, $set: data.password})
}

async function updateProduct(id,data){
    return await client.db("practice").collection("cutompizzas").updateOne({id:id, $set:data})
}

async function genPassword(password){
    const NO_OF_ROUNDS = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    return hashedPassword
}

export {getPizza, postPizza, createUser, genPassword,getByUserName,updatePassword,updateProduct,postCartItems,deleteCartItems,getCartItems}