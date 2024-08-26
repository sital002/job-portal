import app from "./app";
import { connectDatabase } from "./db/connect-database";

const PORT = process.env.PORT || 8000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database: ", error);
  });
