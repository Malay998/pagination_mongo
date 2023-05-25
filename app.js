require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const paginatedResults = require('./util/pagination');
const sortedResults = require('./util/sorting');
const searchedResults = require('./util/searching');
const filteredResults = require('./util/filtering');
const User = require('./model/user');
const userController = require('./controller/userController');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    createTestData();
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const app = express();

const usersData = [
    { firstname: 'John', lastname: 'Doe', email: 'johndoe1@example.com', age: 25 },
    { firstname: 'Jane', lastname: 'Doe', email: 'janedoe2@example.com', age: 30 },
    { firstname: 'Alice', lastname: 'Brown', email: 'alicebrown3@example.com', age: 28 },
    { firstname: 'Bob', lastname: 'Smith', email: 'bobsmith4@example.com', age: 35 },
    { firstname: 'Charlie', lastname: 'Johnson', email: 'charliejohnson5@example.com', age: 40 },
    { firstname: 'David', lastname: 'Williams', email: 'davidwilliams6@example.com', age: 45 },
    { firstname: 'Eve', lastname: 'Jones', email: 'evejones7@example.com', age: 50 },
    { firstname: 'Frank', lastname: 'Taylor', email: 'franktaylor8@example.com', age: 55 },
    { firstname: 'Grace', lastname: 'Lee', email: 'gracelee9@example.com', age: 60 },
    { firstname: 'Hank', lastname: 'Harris', email: 'hankharris10@example.com', age: 65 },
    { firstname: 'Irene', lastname: 'Clark', email: 'ireneclark11@example.com', age: 70 },
    { firstname: 'Jack', lastname: 'Lewis', email: 'jacklewis12@example.com', age: 75 },
    { firstname: 'Kate', lastname: 'Young', email: 'kateyoung13@example.com', age: 80 },
    { firstname: 'Larry', lastname: 'Hall', email: 'larryhall14@example.com', age: 85 },
    { firstname: 'Mary', lastname: 'Allen', email: 'maryallen15@example.com', age: 90 }
];
  
const createTestData = async () => {
    try {
      const userCount = await User.countDocuments();
  
      if (userCount === 0) {
        await User.insertMany(usersData);
        console.log('Test data created successfully');
      } else {
        console.log('Test data already exists');
      }
    } catch (error) {
      console.error('Error creating test data:', error);
    }
};

app.get('/users', userController.getUsers, userController.getAllUsers);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
