import { faker } from '@faker-js/faker';
import User from '../models/user.model';
import UserGroup from '../models/usergroup.model';

const userGroupGenerator = async (ids: string[]) => {
  try {
    // Remove all existing users
    await UserGroup.deleteMany();

    // Generate a user group and insert user data from ids
    const numFakeUserGroups = 10; // Number of fake user groups to create
    const fakeUserGroups = [];

    for (let i = 0; i < numFakeUserGroups; i++) {
      const creator = ids[Math.floor(Math.random() * ids.length)];
      // create a user list from random ids
      const userslist = [
        creator,
        ids[Math.floor(Math.random() * ids.length)],
        ids[Math.floor(Math.random() * ids.length)],
      ];

      const fakeUserGroup = {
        users: userslist,
        code: faker.random.alphaNumeric(5),
        creator: ids[Math.floor(Math.random() * ids.length)],
      };
      fakeUserGroups.push(new UserGroup(fakeUserGroup));
    }

    const finalUserGroup = await UserGroup.bulkSave(fakeUserGroups);
    const result = Object.values(finalUserGroup.insertedIds);
    console.log('result', result);
    return result;
  } catch (error) {
    console.error('Error generating fake user data:', error);
  }
};
export default userGroupGenerator;
