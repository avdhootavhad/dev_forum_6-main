const Category = require('../models/Category')
const Question = require('../models/Questions')

const createCategory = (req, res) => {
    let category = new Category({
        categoryName: req.body.categoryName
    })
    category.save()
        .then(category => {
            res.status(201).send(category)
            // res.json({
            //     message:'User registered'
            // })
        })
        .catch(error => {
            res.status(400).send("blank category")
        })
}

const returnAllCategory = (req, res) => {

    Category.find({}).then(function (categories) {
        res.send(categories);
    })
}

const returnCategoryById = (req, res) => {
    console.log(req.params.id)
    Category.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                category: result
            })

        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
}

const deleteCategory = (req, res) => {

    //const user=req.user.role;
    //res.send(req.user.role);
    if (req.user.role == 'admin') {
        //var myquery = {_id: req.params.id };
        Category.deleteOne({ "_id": req.params.id }, function (err, obj) {

            if (err) throw err;
            //console.log("1 document deleted");
            res.send("1 document deleted")

        })
    }
}
const updateCategory = (req, res) => {
    if (req.user.role == "admin") {
        Category.findOne({ _id: req.params.id }, function (err, obj) {
            if (err) throw err
            obj.categoryName = req.body.categoryName
            obj.save()
                .then(result => {
                    res.send(result)
                    // res.json({
                    //     message:'User registered'
                    // })
                })
                .catch(error => {
                    res.status(400).json({
                        message: 'An error occured'
                    })
                })
        })
        // var newvalue ={$set:{}}
        // Category.updateOne(category_name,)
    }
}


module.exports = {
    createCategory,
    returnAllCategory,
    returnCategoryById,
    deleteCategory,
    updateCategory
}