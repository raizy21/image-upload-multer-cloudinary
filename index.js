import express from "express";
import "./db/index.js";
import eventsRouter from "./routes/events.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/events", eventsRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
