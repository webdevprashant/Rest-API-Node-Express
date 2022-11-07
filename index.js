const express  = require("express")
const app = express();
const mongoose = require("mongoose")

app.use(express.urlencoded({extended: true}));
app.get("/" , (req , res) => {
    res.send("Just for testing")
} )

app.listen(4000 , () => console.log("Server started ......") );

mongoose.connect("mongodb://127.0.0.1:27017/db1");

const studentSchema = {
    name: String,
    score: Number,
    remarks: String
}
const Student = mongoose.model("student" , studentSchema);

app.route("/students")
.get(
    (req , res) => {
        Student.find((err , studentdocs) => {
            if (! err) {
                res.send(studentdocs);
            }
            else {
                req.send("Some issues in web app for GET all  ");
            }
        })}
).post(
    (req , res) => {
        const newStudent = new Student({
            name: req.body.myname,
            score: req.body.myscore,
            remarks: req.body.myremarks
        })
        newStudent.save((err) => {
                if (err) { console.log("Some error in inserting ......")}
                else { console.log("Successfully inserted ........"); }
    
        })
    }
    ).delete(
        (req , res) => {
            Student.deleteMany((err) => {
                if(err) {
                    console.log("Some error in Deleting ......")
                }
                else {
                    console.log("Successfully Deleted ........");
                }
            })
        }
    )

    app.route("/students/:myname").get( (req,res) => {
        Student.findOne({name: req.params.myname} , (err , sdetails)=> {
            if (err) {
                res.send("Some errors in searching ....")
            }
            else {
                res.send(sdetails);
            }
        })
    }).put((req , res) => {
        Student.replaceOne({name: req.params.myname} , 
            {name: req.body.myname , remarks: req.body.myremark} , 
            (err) => {
            if(err)     {   res.send("Somme error in replacing doc");  }
            else    {   res.send("Successfullt Replaced");   }
        })
    })
    .patch((req , res) => {
        Student.updateOne(
            {name: req.params.myname} , 
            {remarks: req.body.myremark , score: req.body.myscore} , 
            (err) => {
            if(err)     {   res.send("Somme error in updating");  }
            else    {   res.send("Successfullt Updated");   }
        })
    })
    .delete((req , res) => {
        Student.deleteOne({name: req.params.myname} ,  
            (err) => {
            if(err)     {   res.send("Somme error in deleting");  }
            else    {   res.send("Successfullt Deleted");   }
        })
    }
    
    )