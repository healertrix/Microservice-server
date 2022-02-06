//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["users"]);


const addUser = (fname, lname, email, phno) => {

    const User = { fname: fname, lname: lname, email: email, phno: phno };
    db.users.save([User]);
    console.log("data inserted into userdb");
};

// addUser("abc", "xyz", "abc@gmail.com", "7845");

const getUserbyId = (id) => {
    return db.users.findOne({ _id: id });
};

const removeUserbyId = (id) => {
    db.users.remove({ _id: id }, false); // remove only the first match
    console.log("removed user id : "+id+" ");
};

const updateUserbyId = (id,title,value) => {
    options = {
      multi: false, // update multiple - default false
      upsert: false, // if object is not found, add it (update-insert) - default false
    };
    const query = {
      _id: id,
    };
    const dataToBeUpdate = {
      [title]: value,
    };
    const updated = db.users.update(query, dataToBeUpdate, options);
    console.log(updated);
};
// updateUserbyId("d1be0c1a9efe44789cbfc7cb8a8faf02","fname","anshu");

module.exports = { addUser, updateUserbyId, removeUserbyId, getUserbyId };