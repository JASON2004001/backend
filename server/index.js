import express from "express";

const app = express();

const Port = 5000;

app.listen(Port, () => {
  console.log(`This is my localhost ${Port}`);
});
