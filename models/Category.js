const mongoose = require('mongoose')
var autoIncrement=require('mongoose-auto-increment')
const schema = mongoose.schema

const categorySchema = new mongoose.Schema({
    // categoryId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     require: true,
    //  },
    categoryName: {
        type: String,
        require:true
    }
})
autoIncrement.initialize(mongoose.connection)
categorySchema.plugin(autoIncrement.plugin,'Category')
const Category = mongoose.model('Category', categorySchema)
module.exports = Category