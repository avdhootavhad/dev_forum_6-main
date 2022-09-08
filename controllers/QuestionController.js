const Question = require('../models/Questions')
const User = require('../models/User')

const postQuestion = (req, res) => {

    //console.log(req.user);
    //res.send(req.user);
    const user = req.user.userName


    const { questionName, categoryName, status } = req.body;
    //Validating asker
    User.findOne({ userName: user }, (err, user) => {
        if (err) res.status(500).json("Something went wrong.")
        else if (!user) res.status(403).json("Permission denied.")
        else {
            const newQuestion = new Question({ questionName, categoryName, asker: user, status })
            newQuestion.save()
                .then(() => res.json({ "message": "Success", "id": newQuestion._id }))
                .catch(err => res.status(400).json(err))
        }
    })


    //    let question = new Question({
    //         questionName:req.body.questionName,
    //         categoryName:req.body.categoryName
    // })


    // question.save()
    //     .then(question => {
    //         res.send(question)
    //         // res.json({
    //         //     message:'User registered'
    //         // })
    //     })
    //     .catch(error => {
    //         res.json({
    //             message: 'An error occured'
    //         })
    //     })  

    // for finding distinct categories
    // Question.distinct("categoryName").then((ans)=>{
    //     console.log(ans);
    // })

    //res.send("Zala sur")

}
const deleteQuestion = (req, res) => {

    if (req.user.role == 'admin') {
        Question.deleteOne({ "_id": req.params.id }, function (err, obj) {

            if (err) throw err;
            //console.log("1 document deleted");
            res.send("1 question deleted")
        })
    } else if (req.user.role == 'user') {
        Question.findOne({ "_id": req.params.id }, function (err, obj) {
            if (err) throw err;
            //res.send(obj.asker.userName)
            if (req.user.userName == obj.asker.userName) {
                Question.deleteOne({ "_id": req.params.id }, function (err, obj) {

                    if (err) throw err;
                    //console.log("1 document deleted");
                    res.send("1 question deleted")
                })
            } else {
                res.send("You are not authorized to delete this question")
            }
        })
    }
    //res.send(req.user)

}
const returnQuestionsByCategory = (req, res) => {

    Question.find({ "categoryName": req.params.id }, function (err, obj) {

        if (err) {
            res.status(400).send(err)
        }
        res.send(obj)
    })

}

const returnQuestionByUser = (req, res) => {
    // res.send(req.user)
    var questionArray = [{}]
    Question.find({ 'asker.userName': req.user.userName },
     {   questionName: 1,
         categoryName: 1, 
         answers: 1, 
         status: 1 
    }, function (err, obj) {
        if (err) throw err
        //console.log(obj[0].questionName)
        //console.log(obj[1].questionName)
        //console.log(obj.length)
        //   for(var i=0;i<obj.length;i++){
        //     questionArray[i]={"Question":(obj[i].questionName),"category":(obj[i].categoryName),"id":(obj[i]._id),"status":(obj[i].status),"answers":(obj[i].answers)}
        //   }

        res.send(obj)


    }
    )

    //    asker:{$elemMatch:{userName:req.user.userName}}
}
const updateQuestion = (req, res) => {
    if (req.user.role == 'admin') {
        Question.findOne({ "_id": req.params.id }, function (err, obj) {
            if (err) throw err;
            //console.log("1 document deleted");
            //res.send(obj)
            obj.questionName = req.body.questionName
            obj.save()
                .then(result => {
                    res.send(result)
                    // res.json({
                    //     message:'User registered'
                    // })
                })
                .catch(error => {
                 res.status(400).send("Blank question/invalid category")
                })

        })
    } else if(req.user.role=='user') {
        Question.findOne({ "_id": req.params.id }, function (err, obj) {
            if (err) throw err;
            //res.send(obj.asker.userName)
            if (req.user.userName == obj.asker.userName) {
                Question.findOne({ "_id": req.params.id }, function (err, obj) {

                    if (err) throw err;
                    //console.log("1 document deleted");
                    //res.send(obj)
                    obj.questionName = req.body.questionName
                    obj.save()
                        .then(result => {
                            res.send(result)
                            // res.json({
                            //     message:'User registered'
                            // })
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error occured'
                            })
                        })
                })
            } else {
                res.send("You are not authorized to delete this question")
            }
        })
    }

}
const replyToAQuestion=(req,res)=>{
      if(req.user){
          //res.send("exist");
          console.log(req.user.userName)
          
          const {description} = req.body;
          Question.findOne({ "_id": req.params.id }, function (err, obj) {

            if (err) throw err;
            
            let i=0;
            //obj.answers[i++] = req.body.answers
            obj.answers.push({answerer:req.user.userName,description:req.body.answers.description,questionId:req.params.id})
            obj.save()
                .then(result => {
                    res.status(201).send(result)
                    
                })
                .catch(error => {
                    res.status(400).send("blank answer/invalid question id")
                })
            
        })
      }else{
          res.send("log in")
      }
}
const findQuestionByText=(req,res)=>{
      const searchText=req.params.id.toLowerCase()
      const questionArr = []
      Question.find({},{"questionName":true,"categoryName":true,"_id":true,"status":true},(err,obj)=>{
            if(err) throw err;
            //console.log(obj.length)
            for(let i=0;i<obj.length;i++)
            {
                if(obj[i].questionName.toLowerCase().includes(searchText))
                {
                    questionArr.push(obj[i]);
                }
            }
            res.send(questionArr)
          //  questionArr.push(obj.questionName)
      })
     // res.send(questionArr)
}

module.exports = {
    postQuestion,
    deleteQuestion,
    returnQuestionsByCategory,
    returnQuestionByUser,
    updateQuestion,
    replyToAQuestion,
    findQuestionByText
}