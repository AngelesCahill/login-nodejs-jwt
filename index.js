import express from "express";
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import publicRouter from "./routes/public.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/", publicRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Servidor corriendo en puerto" + PORT));