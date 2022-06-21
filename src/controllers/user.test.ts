import { createUser } from './user';

describe('User', () => {
  describe('Create', () => {
    it('creates', async () => {
      const newUser = {
        firstName: "fakeFirstName",
        lastName: "fakeLastName", 
        email: 'fakeEmail@example.com', 
        password: 'password123'
      }

      const { email } = await createUser(newUser);

      expect(email).toEqual('fakeemail@example.com')
    });
  });
});
