const mongoose = require('mongoose')
const Category = require('./Category')
var autoIncrement = require('mongoose-auto-increment')
const schema = mongoose.schema

const questionSchema = new mongoose.Schema({
    questionName: {
        type: String,
        required: true,
        trim: true
    },

    // categoryId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         require: true,
    //         ref: Category,
    //      },
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    asker: {
        type: Object,
        required: true
    },
    status: {
        type: String,
             
        enum: ["open","close"],
        default : "open"
    },
    answers:{
        type:Array,
        required:false
    }
    
    // answers    :[{
    //     description: {
    //         type: String,
    //         //required : true,
    //     },
        
    //     answerer:{
    //         type: String
    //     }
        
    //   }]


})
autoIncrement.initialize(mongoose.connection)
questionSchema.plugin(autoIncrement.plugin, 'Question')
const Question = mongoose.model('Question', questionSchema)
module.exports = Question
