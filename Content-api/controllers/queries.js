//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["content"]);


const addContent = async (title, story, last_modified) => {
  const Content = {
    title: title,
    story: story,
    last_modified: last_modified,
  };
  try {
    db.content.save([Content]);
  } catch (error) {
    console.error(error);
    return error;
  }

  console.log("data inserted into contentdb");
  const a = db.content.findOne({ title: title, last_modified: last_modified });
  return a;
};
const updateContent = async (id, title, story, last_modified) => {
  const checkExistence = await db.content.findOne({ _id: id });
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
    title: title ? title : db.content.findOne({ _id: id }).title,
    story: story ? story : db.content.findOne({ _id: id }).story,
    last_modified: last_modified
      ? last_modified
      : db.content.findOne({ _id: id }).last_modified,
  };
  const updated = db.content.update(query, dataToBeUpdate, options);
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

const getContentbyId = async (id) => {
  const result = await db.content.findOne({ _id: id });
  if (result === undefined) {
    return 404;
  } else {
    return result;
  }
};

const deleteContentbyId = async (id) => {
   const result = await db.content.findOne({ _id: id });
   if (result === undefined) {
     return 404;
   } else {
     const del =await db.content.remove({ _id: id });
     return 200;
   }
};
const sortedByNew = () => {
  const allData = db.content.find();
  allData.sort((a, b) => {
    return a.last_modified > b.last_modified ? -1 : 1;
  });
  return allData;
};


module.exports = {
  addContent,
  updateContent,
  getContentbyId,
  deleteContentbyId,
  sortedByNew,
};