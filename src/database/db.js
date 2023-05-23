const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

exports.connectToDB = () => {
  return mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fiywgdd.mongodb.net/school_database?retryWrites=true&w=majority`
  );
};
