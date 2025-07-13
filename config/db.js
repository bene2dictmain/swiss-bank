const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://benedict:jeffrey.000@cluster0.2agnlbi.mongodb.net/bank?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected.');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
