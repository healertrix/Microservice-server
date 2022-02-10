//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["interaction"]);
const axios = require("axios").default;

const addInteractionLike = async (title, story_id,user_id,like) => {
    const userFlag = await getUser(user_id);
    if (!userFlag) {
        return;
    }
    const Interaction = {
      title: title,
      story_id: story_id,
      like: like || 0,
      read: 0,
    };
    db.interaction.save([Interaction]);
    console.log("data inserted into interactiondb");
};
const addInteractionRead = async (title, story_id, user_id, read) => {
  const userFlag = await getUser(user_id);
  if (!userFlag) {
    return;
  }
  const Interaction = {
    title: title,
    story_id: story_id,
    like: 0,
    read: read,
  };
  db.interaction.save([Interaction]);
  console.log("data inserted into interactiondb");
};

// addInteraction("abc", "xyz", "e3c057fee2824329ae75f88cb75e019b","like");

const updateInteraction = async (story_id, event, flag, user_id) => {
  const userFlag = await getUser(user_id);
  if (!userFlag) {
    return;
  }
  options = {
    multi: false, // update multiple - default false
    upsert: false, // if object is not found, add it (update-insert) - default false
  };
  const query = {
    story_id: story_id,
  };
  const change = !flag ? -1 : 1;
  const dataToBeUpdate = {
    [event]: +db.interaction.findOne({ story_id: story_id })[event] + change,
  };
     const updated = db.interaction.update(query, dataToBeUpdate, options);
 
  a = db.interaction.findOne({ story_id: story_id })[event];
  console.log(`${event}  --->  ${a}`);
  return 0;

};
const getInteractions =  () => {
  return db.interaction.find();
};

async function getUser(id) {
  try {
      const response = await axios.get(`http://user:4000/user/${id}`);
      const { fname, lname, email, phno, _id } = response.data;
      if ((fname && lname && email && phno && _id)) { 
          console.log(response.data);
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
module.exports = {
  addInteractionRead,
  addInteractionLike,
  updateInteraction,
  getInteractions,
};