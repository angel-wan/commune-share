const mongoose = require('mongoose');
import { faker } from '@faker-js/faker';
import User from '../models/user.model';
import { MONGO_URI } from '../config';
// Import your User model here

// Replace the connection string with your MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.error('MongoDB connection error:');
});

db.once('open', async () => {
  try {
    // Remove all existing users
    await User.deleteMany();

    // Generate and insert fake user data
    const numFakeUsers = 10; // Number of fake users to create
    const fakeUsers = [];

    // Generate a admin user
    const adminUser = {
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
    };

    const user = new User(adminUser);
    await user.save();

    for (let i = 0; i < numFakeUsers; i++) {
      const fakeUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      fakeUsers.push(new User(fakeUser));
    }

    await User.bulkSave(fakeUsers);

    console.log('Fake user data inserted successfully.');

    // Close the MongoDB connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating fake user data:', error);
  }
});
