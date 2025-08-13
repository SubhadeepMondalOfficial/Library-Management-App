import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/user.js";
import connectDb from "./src/config/connectDb.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoutes);

connectDb(process.env.MONGODB_URI)
  .then(() => {
    console.log(`✅MongoDB Connected Successfully`);
    app.listen(PORT, () =>
      console.log(`Server is Up at http://localhost:${PORT}`)
    );
  })
  .catch((error) =>
    console.error(`❌Failed to Connect MongoDB error=> ${error}`)
  );
