const express = require('express');
const app = express();

const cors = require('cors');

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
let mongo_url = "mongodb://127.0.0.1:27017/urbanthread-bd";
main().then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log(error);
})
async function main() {
    await mongoose.connect(mongo_url);
}


app.get("/", (req, res) => {
  res.send("This is a root route");
});

app.listen(port, () => {
  console.log(`port ${port} is running`);
});