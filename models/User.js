const mongoose = require('mongoose');
//const Schema = mongoose.Schema; // same as below
const { Schema } = mongoose;

const userSchema = new Schema({
  userID: String
});

mongoose.model('users', userSchema);
