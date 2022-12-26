const mongoose = require('mongoose')
const { array } = require('prop-types')

var schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'admin_cols'
    },
    // name:{
    //     type:String,
    //     required:true
    // },
    // description:{
    //     type:String,
    //     required:true,
        
    // },
    
    image:{ 
        type:Array,
        required:true,  
    },
},{
    timestamps:true
})

const Blogdb = mongoose.model('flags_cols',schema)
module.exports = Blogdb