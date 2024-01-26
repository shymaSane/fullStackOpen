import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import connectDB from "./models/db.js";
import personRouter from "./routes/person.js";
import errorHandling from "./middlerware/errorHandling.js";

const app = express();

//always fist so request body wont be undefined
app.use(express.json());
//mongoose connection:
connectDB();

// app.use(morgan("tiny"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api/persons", personRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Question 2
app.get("/info", (req, res) => {
  const currentDate = new Date();
  const today = currentDate.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "full",
  });
  const info = `<p>Phone book has info for 2 pepole <br/> ${today}</p>`;
  res.send(info);
});

app.listen(process.env.PORT, "localhost", () => {
  console.log(`finally working on port ${process.env.PORT}`);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
app.use(errorHandling);
