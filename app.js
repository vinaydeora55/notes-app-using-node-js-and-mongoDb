//jshint esversion:6
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = 'this is the starting content of this notes app. You can compose a new post from the compose section and store all of your data so that you dont have to remember it later'
const aboutContent = "This is the about page. this is a notes application based and developed on node JS with the use of html,css,bootstrap and javascript in the front-end and node js, express js and mongodb in the backend technologies ";
const contactContent = "This is the contact page. you can contact us at vinaydeora55@gmail.com, email us if you have any queries. you can also call or whatsapp us on the number 8239972708 if you like. connect with us on instagram,facebook, twitter and tiktok. the page links are given below ";
const createdData = []

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/notesDB');
} main()

postschema = new mongoose.Schema({
  title: { type: String, required: true },
  postData: { type: String, required: true }
})

// catagoryschema = new mongoose.Schema({
//   name : String,
//   post : postschema
// })

const Post = mongoose.model("post", postschema);

// const Catagory = mongoose.model("catagorie",catagoryschema); 


// get methods 

app.get("/", (req, res) => {

  Post.find().then((post) => {
    res.render("home", { homeStartingContent: homeStartingContent, createdData: post })
  })

})

app.get("/about", (req, res) => {

  res.render("about", { aboutContent: aboutContent })
})

app.get("/contact", (req, res) => {

  res.render("contact", { contactContent: contactContent })
})

app.get("/compose", (req, res) => {

  res.render("compose")
})


app.get("/posts/:post", (req, res) => {

  let catagoryName = _.kebabCase(req.params.post);

  Post.findOne({ title: catagoryName }).then((data) => {
    console.log(data);
    if(data){res.render("post", { element: data })}
    else{
      res.send("sorry page not found")
    }})
    .catch((err)=>{
    console.log(err);  })


})




// post methos

app.post("/", (req, res) => {

  let title =_.kebabCase(req.body.title) ;
  let Data = req.body.data;

  let post = new Post({
    title: title,
    postData: Data
  })

  Post.insertMany([post]).then((data) => {
    console.log(data);
    res.redirect("/");
  })



})














app.listen(8080, function () {
  console.log("Server started on port 8080");
});
