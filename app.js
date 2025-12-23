import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import router from "./routes/userRoute.js";
import profileRoute from "./routes/profileRoute.js";
import projectRoute from "./routes/projectRoute.js";
import mileRouter from "./routes/milestoneRoute.js";
import taskRouter from "./routes/taskRoute.js";
import commentRouter from "./routes/commentRoute.js";
import progressRouter from "./routes/progressRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(cors({
  origin: ["http://localhost:4200",
    "https://pms-frontend-yi8d.vercel.app/"

  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//routes
app.use(router);
app.use(profileRoute);
app.use(projectRoute)
app.use(mileRouter)
app.use(taskRouter)
app.use(commentRouter)
app.use(progressRouter)
app.get("/", (req, res) => {
  res.send("Project Management System is working");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
