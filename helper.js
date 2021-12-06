import { client } from "./index.js";

 async function getPizza() {
    return await client.db("practice").collection("pizzas").find({}).toArray();
}
 async function postPizza(data) {
    return await client.db("practice").collection("pizzas").insertMany(data);
}

export {getPizza, postPizza}