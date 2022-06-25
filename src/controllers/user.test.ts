import { createUser } from "./user";

describe("User", () => {
  describe("Create", () => {
    it("creates", async () => {
      const newUser = {
        firstName: "fakeFirstName",
        lastName: "fakeLastName",
        email: "fakeEmail@example.com",
        password: "password123",
      };

      const { email } = await createUser(newUser);

      expect(email).toEqual(newUser.email.toLocaleLowerCase());
    });

    describe("Email validation", () => {
      const testEmailValidation = async (invalidEmail: string) => {
        const newUser = {
          firstName: "fakeFirstName",
          lastName: "fakeLastName",
          email: invalidEmail,
          password: "password123",
        };

        let message: string = "";

        try {
          await createUser(newUser);
        } catch (e) {
          message = e.message;
        }

        expect(message).toEqual(
          "User validation failed: email: Please enter a valid email address"
        );
      };

      it("only accepts a valid email address", async () => {
        await testEmailValidation("with a space@example.com");
        await testEmailValidation("noATSymbol.com");
        await testEmailValidation("abc.def@mail.c");
        await testEmailValidation("abc.def@mail#archive.com");
        await testEmailValidation("abc.def@mail");
        await testEmailValidation("abc.def@mail..com");
      });
    });
  });
});
