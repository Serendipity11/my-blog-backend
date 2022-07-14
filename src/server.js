const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const articlesInfo = {
  "learn-react": {
    comments: [],
  },
  "learn-node": {
    comments: [],
  },
  "my-thoughts-on-learning-react": {
    comments: [],
  },
};

const app = express();

app.use(bodyParser.json());

app.get("/api/articles/:name", (req, res) => {
  const articleName = req.params.name;
  const client = MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("myblog");
  const articleInfo = db.collection("articles").findOne({ name: articleName });
  res.status(200).json(articlesInfo);
  client.close();
});

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});

app.listen(8000, () => console.log("Listening on port 8000"));
