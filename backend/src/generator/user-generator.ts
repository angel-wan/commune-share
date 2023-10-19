import { faker } from '@faker-js/faker';
import User from '../models/user.model';

const userGenerator = async () => {
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

    const finalUser = await User.bulkSave(fakeUsers);

    const ids = Object.values(finalUser.insertedIds);
    return ids;
  } catch (error) {
    console.error('Error generating fake user data:', error);
  }
};
export default userGenerator;
