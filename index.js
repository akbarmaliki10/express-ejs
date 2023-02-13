const express = require('express');
const { type } = require('os');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: "Wow thats funny"
    },
    {
        id: uuid(),
        username: 'Bob',
        comment: "LMAO "
    },
    {
        id: uuid(),
        username: 'Mega',
        comment: "apa coba"
    },
    {
        id: uuid(),
        username: 'Nos',
        comment: "sounds like a whiskas"
    },
];

app.get("/comments", (req,res) => {
    res.render("comments/index", {comments});
});

app.get("/comments/new", (req,res) => {
    res.render("comments/new");
});

app.post("/comments", (req,res) => {
    console.log(req.body);
    const {username, comment} = req.body;
    comments.push({id: uuid(), username,comment});
    res.redirect("/comments");
});

app.get("/comments/:id", (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/show", {comment});
});

app.patch("/comments/:id", (req,res) => {
    const { id } = req.params;
    const newComment = req.body.comment;
    const oldComment = comments.find(c => c.id === id);
    oldComment.comment = newComment;
    res.redirect("/comments");
});

app.get("/comments/:id/edit", (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render("comments/edit", { comment });
});

app.get("/tacos", (req, res) => {
    res.send('GET /tacos response');
});

app.delete("/comments/:id", (req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id); 
    //buat menghilangkan suatu komen dengan return array yang sudah di filter lalu disimpan
    res.redirect("/comments");
});

app.post("/tacos", (req, res) => {
    console.log(req.body);
    const { meat, qty } = req.body;
    res.send(`Okay!, here are your ${qty} ${meat} tacos`);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});