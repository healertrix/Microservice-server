//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["users"]);


const addUser = async (fname, lname, email, phno) => {
  const User = { fname: fname, lname: lname, email: email, phno: phno };
  db.users.save([User]);
  const res = await db.users.findOne({
    fname: fname,
    lname: lname,
    email: email,
    phno: phno,
  });
  console.log("data inserted into userdb");
  return res._id;
};

// addUser("abc", "xyz", "abc@gmail.com", "7845");

const getUserbyId = async (id) => {
  const result = await db.users.findOne({ _id: id });
  if (result === undefined) {
    return 404;
  } else {
    return result;
  }
};

const removeUserbyId = async (id) => {
   const result = await db.users.findOne({ _id: id });
   if (result === undefined) {
     return 404;
   } else {
     const del = await db.users.remove({ _id: id });
     return 200;
   }
};

const updateUserbyId = async (id, fname, lname, email, phno) => {
  const checkExistence = await db.users.findOne({ _id: id });
  console.log(checkExistence);
  if (checkExistence == undefined) {
    return 404;
  }
  options = {
    multi: false, // update multiple - default false
    upsert: false, // if object is not found, add it (update-insert) - default false
  };
  const query = {
    _id: id,
  };
  const dataToBeUpdate = {
    fname: fname ? fname : db.users.findOne({ _id: id }).fname,
    lname: lname ? lname : db.users.findOne({ _id: id }).lname,
    email: email ? email : db.users.findOne({ _id: id }).email,
    phno: phno ? phno : db.users.findOne({ _id: id }).phno,
  };
  const updated = db.users.update(query, dataToBeUpdate, options);
  const status = updated.updated;
  if (status) {
    return {
      _id: id,
      updated: true,
    };
  } else {
    return 500;
  }
};
// updateUserbyId("d1be0c1a9efe44789cbfc7cb8a8faf02","fname","anshu");

module.exports = { addUser, updateUserbyId, removeUserbyId, getUserbyId };