//jshint esversion:8
const axios = require('axios');
const db = require("diskdb");
db.connect("db", ["content"]);
async function getInteractions() {
  try {
    const response = await axios.get("http://localhost:4001/interaction");
      const interaction = response.data;
      const finalIntr = [];
    interaction.map((object) => {
      totalInteractions = +object.like + (+object.read);
        let newObj = {};
        newObj.totalInteractions = totalInteractions;
        newObj.story_id = object.story_id;
        finalIntr.push(newObj);
    });
      finalIntr.sort((a, b) => { 
          return a.totalInteractions > b.totalInteractions ? -1 : 1;
      });
    const sortedContent = [];
      finalIntr.map((obj, index) => {
          const story_id = obj.story_id;
        const contentObj = db.content.findOne({ _id: story_id });
          if (contentObj) {
              contentObj.totalInteractions = obj.totalInteractions;
              sortedContent.push(contentObj);
        } 
      });
 return sortedContent;
      
  } catch (error) {
    console.error(error);
  }
}




module.exports = { getInteractions };
