require('dotenv').config();
const express = require("express");
const path = require("path");
const { getUsers } = require("./db");
const { getSasUrl } = require("./image");
const { callOrderProcess } = require("./orderProcess");

const app = express();
const PORT = process.env.PORT || 3000;
let blankResponse = {
  status: null,
  body: null,
  image: null,
  processOrder: null
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { ...blankResponse, status: "", body: "" });
});

app.get("/users", async (req, res) => {
  const userRec = await getUsers();
  res.render("index", {
    ...blankResponse,
    status: "200 - user load success",
    body: JSON.stringify(userRec, null, 2),
  });
})
app.get("/show-image", async (req, res) => {
  const imgUrl = await getSasUrl("app-media", "nagarro-logo.jpg");

  res.render("index", {
    ...blankResponse,
    status: "200 - image load success",
    image: imgUrl,
  });
})
app.get("/process-order", async (req, res) => {
  
  res.render("index", {
    ...blankResponse,
    processOrder: true,
  });
})

app.post("/call-function", async (req, res) => {
  const result = await callOrderProcess(req.body);
  res.render("index", {
    ...blankResponse,
    status: "200",
    body: result
  });
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});