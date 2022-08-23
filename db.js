const mongoose = require("mongoose");

async function connect(url) {
 await  mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));
}

module.exports ={connect};
