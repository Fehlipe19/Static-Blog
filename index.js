import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const currentDate = new Date();
const year = currentDate.getFullYear();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/edit", (req, res) => {
  // const postId = parseInt(req.query.postId);
  const postId = req.query.postId;
  const post = posts.find((p) => p.id === postId);
  console.log(typeof postId);
  if (post) {
    res.render("edit.ejs", { post: post, posts: posts });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/submit", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    id: req.body.title,
  };
  let index = posts.findIndex((p) => p.id === post.id);
  console.log(typeof post.id);
  if (index !== -1 && post.id) {
    posts[index] = post;
  } else {
    posts.push(post);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const postId = req.body.postId;
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/");
});

app.listen(port, () => {});

//Gat info from form, add it to an object, and add it into an array.
var posts = [];
