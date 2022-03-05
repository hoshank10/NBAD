const express = require("express");
const app = express();
const tradesRoute = require("./routes/tradeRoutes");
const mainRoute = require("./routes/mainRoutes");

const morgan = require("morgan");
app.use(morgan("tiny"));

const methodoverride = require("method-override");
app.use(methodoverride("_method"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", mainRoute);


app.use("/trades", tradesRoute);

app.use((req, res, next) => {
  let err = new Error("Serevr cannot locate the given URL " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal server error";
  }
  res.status(err.status);
  res.render("error", { error: err });
});

//Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server running on port: ", port);
});
