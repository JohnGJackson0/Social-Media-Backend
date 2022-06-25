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

    describe("Password validation", () => {
      it("salts a password", async () => {
        const newUser = {
          firstName: "fakeFirstName",
          email: "example@example.com",
          password: "password123",
        };

        const { password } = await createUser(newUser);

        expect(password).not.toBe("password123");
        // changes depending on time
        expect(password).not.toEqual(
          "$2b$10$r4VwgwkAaL8Uu1QHbUcweO8IMDUjMKMMY5D3OVxQ7pkdVFL2Jfro2"
        );
      });
    });

    describe("Name Validation", () => {
      it("allows no last name", async () => {
        const newUser = {
          firstName: "fakeFirstName",
          email: "example@example.com",
          password: "password123",
        };

        let message: string = "";

        try {
          await createUser(newUser);
        } catch (e) {
          message = e.message;
        }

        expect(message).toEqual("");
      });

      it("requires first name", async () => {
        const newUser = {
          lastName: "lastName",
          email: "example@example.com",
          password: "password123",
        };

        let message: string = "";

        try {
          await createUser(newUser as any);
        } catch (e) {
          message = e.message;
        }

        expect(message).toEqual(
          "User validation failed: firstName: Path `firstName` is required."
        );
      });

      it("correctly trims", async () => {
        const newUser = {
          firstName: " firstName    ",
          lastName: " lastName    ",
          email: "example@example.com",
          password: "password123",
        };

        const { firstName, lastName } = await createUser(newUser);

        expect(firstName).toBe("firstName");
        expect(lastName).toBe("lastName");
      });
    });
  });
});
