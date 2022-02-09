//jshint esversion:8
const db = require("diskdb");
db.connect("db", ["content"]);


const addContent = async (title, story, last_modified) => {
    const Content = {
        title: title,
        story: story,
        last_modified: last_modified
    };
    db.content.save([Content]);
    console.log("data inserted into contentdb");
};
const updateContent =  (id,title, story,last_modified) => {
  
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
    last_modified: last_modified? last_modified:db.content.findOne({ _id: id }).last_modified,
  };
  const updated = db.content.update(query, dataToBeUpdate, options);
console.log("Data updated");
};
// updateContent(
//   "56fc34587e2c44c1baa94892d54dad6f",
//   null,
//   "This is it abc",
//   "02-03-2022"
// );
const getContentbyId = (id) => {
    return db.content.findOne({ _id: id });
};
const deleteContentbyId = (id) => {
    db.content.remove({ _id: id });
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