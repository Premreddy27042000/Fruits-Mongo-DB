const { Double } = require("bson");
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);

mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({

  name : {
    type:  String,
    required : [true, "Please check name is empty"]
  },
  price : {
  type : Number,   // validations for Price
  min:1,
  max:10
  },
  stock : Number

});


const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit ( {
   name : "boomer",
    price :6, // price : 20
    stock : 20
})




 const personSchema = new mongoose.Schema({
    name : String,
    age : Number,
    favFruit : fruitSchema
})

const Person = mongoose.model("Person",personSchema);

const mango = new Fruit({
    name:"mango",
    price:4,
    stock : 50
})

const person = new Person ({
    name:"Reddy",
    age : 20,
    favFruit : mango
})
//mango.save();
//person.save();

const guava = new Fruit({
    name : "Gauva",
    price:8,
    stock:200
})

guava.save();

Person.updateOne({name:"prem",favFruit : guava},function(err){
    if(err){
                console.log("error")
            }else{
                console.log("updated")
            }
})


// const kiwi = new Fruit ( {
//     name : "kiwi",
//     price : 20,
//     stock  : 0
// })


// const orange = new Fruit ( {
//     name : "orange",
//     price : 16,
//     stock  : 100
// })


// Fruit.insertMany([kiwi,orange],function(err){
//     if(err){
//         console.log("error")
//     }else{
//         console.log("Saved")
//     }
// })


Fruit.find(function(err,fruits){
    // for(var i =0;i<Fruit.length;i++){
    //     console.log(fruits[i].name);
    // }
    
    // fruits.forEach(function(fruit){
    //     console.log(fruit.name)
    // })
    if(err){
        console.log(err);
    }else{
        // console.log(fruits);

      mongoose.connection.close();  
    fruits.forEach(function(fruit){
        console.log(fruit.name)
    })
    }
})

// Fruit.updateOne({_id : "60c070883e2b1e4f042afd8e"},{name:"Gauva"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully upddated")
//     }
// })

// Fruit.deleteOne({name:"kiwi"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully deleted")
//     }
// })


  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }