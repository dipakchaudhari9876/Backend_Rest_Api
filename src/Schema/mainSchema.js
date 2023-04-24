const mongoose = require('mongoose')

const mainSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    is_completed:{
        type:Boolean,
        default:false
    }
})

const Main = mongoose.model("Main",mainSchema)

module.exports=Main