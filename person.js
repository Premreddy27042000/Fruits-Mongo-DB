const { Double } = require("bson");
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);

mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/personDB");


const personSchema = new mongoose.Schema({
    name : String,
    age : Number
})

const Person = mongoose.model("Person",personSchema);


const person = new Person ({
    name:"prem",
    age : 21
})

//  person.save();



Person.deleteMany({name:"prem"},function(err){
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        console.log("successfully deleted")
    }
})
