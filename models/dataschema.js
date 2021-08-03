const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  catg: {
    type: String,
    required: true,
},
  type: {
    type: String,
    required: true,
},
  name:{
    type: String,
    required: true
  }
});

const data = mongoose.model('datas', detailSchema);
module.exports = data;