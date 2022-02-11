//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["interaction"]);
const axios = require("axios").default;

const addInteractionLike = async ( story_id,user_id,like) => {
    const userFlag = await getUser(user_id);
    if (!userFlag) {
        return 401;
    }
    const Interaction = {
      story_id: story_id,
      like: like || 0,
      read: 0,
    };
  db.interaction.save([Interaction]);
  const res = await db.interaction.findOne({
    story_id: story_id,
    user_id: user_id,
    like: like,
  });
  console.log("data inserted into interactiondb");
  return res._id;
};
const addInteractionRead = async ( story_id, user_id, read) => {
  const userFlag = await getUser(user_id);
  if (!userFlag) {
    return 401;
  }
  const Interaction = {
    story_id: story_id,
    like: 0,
    read: read,
  };
  db.interaction.save([Interaction]);
  const res = await db.interaction.findOne({
    story_id: story_id,
    user_id: user_id,
    read: read,
  });
  console.log("data inserted into interactiondb");
  return res._id;
};

// addInteraction("abc", "xyz", "e3c057fee2824329ae75f88cb75e019b","like");

const updateInteraction = async (_id, event, flag, user_id) => {
  const userFlag = await getUser(user_id);
  if (!userFlag) {
    return 401;
  }
  const checkExistence = await db.interaction.findOne({ _id: _id });
  console.log(checkExistence);
  if (checkExistence == undefined) {
    return 404;
  }
  options = {
    multi: false, // update multiple - default false
    upsert: false, // if object is not found, add it (update-insert) - default false
  };
  const query = {
    _id: _id,
  };
  const change = !flag ? -1 : 1;
  const dataToBeUpdate = {
    [event]: +db.interaction.findOne({ _id: _id })[event] + change,
  };
     const updated = db.interaction.update(query, dataToBeUpdate, options);
  const status = updated.updated;
  if (status) {
    return {
      _id: _id,
      updated: true,
    };
  } else {
    return 500;
  }
  

};
const getInteractions = () => {
  // let a = db.interaction.find();
  // console.log(a);
  return db.interaction.find();
};
const removeInteractionbyId = async (id) => {
  const result = await db.interaction.findOne({ _id: id });
  if (result === undefined) {
    return 404;
  } else {
    const del = await db.interaction.remove({ _id: id });
    return 200;
  }
};
async function getUser(id) {

  try {
      const response = await axios.get(`http://user:4000/${id}`);
      const { fname, lname, email, phno, _id } = response.data;
      if ((fname && lname && email && phno && _id)) { 
          return true;
      }
      else {
          console.log("User not validated");
          return false;
      }
          
  } catch (error) {
    console.error(error);
  }
}

// getUser("e3c057fee824329ae75f88cb75e019b");
// updateInteraction(
//   "123",
//   "read",
//   true,
//   "e3c057fee2824329ae75f88cb75e019b"
// );

//
// getInteractions(); 
module.exports = {
  addInteractionRead,
  addInteractionLike,
  updateInteraction,
  getInteractions,
  removeInteractionbyId,
};