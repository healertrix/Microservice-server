//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["content"]);
const { deleteContentbyId } = require("./controllers/queries");
const abc = async () => {
    const a = await deleteContentbyId("gfhj");
    console.log(a);
};
abc();
