import { createUser } from "../controllers/user";
import { RouteInput } from "../types/routes";

/*
curl --location --request POST 'localhost:8080/api/create/user' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'firstName=John' \
--data-urlencode 'lastName=Jackson' \
--data-urlencode 'email=JJ@example.com' \
--data-urlencode 'password=password'
*/

export default ({ app }: RouteInput) => {
  app.post("/api/create/user", async (req, res) => {
    const user = await createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    return res.send({ user });
  });
};
