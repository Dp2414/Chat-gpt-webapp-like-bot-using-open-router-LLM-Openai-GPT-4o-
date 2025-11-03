import OpenAI from "openai";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
const PORT = 3000;
const OpenAIApi_Key = process.env.OPENAI_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const inputSchema = new mongoose.Schema({ input: String });
const inputModel = mongoose.model("Input", inputSchema);
const responseSchema = new mongoose.Schema({ response: String });
const responseModel = mongoose.model("Response", responseSchema);



const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OpenAIApi_Key,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/input", async (req, res) => {
  try {
    const { input, history } = req.body;

    const messages = [
      { role: "system", content: "You are a helpful assistant" },
      ...history.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: input }
    ];

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: messages,
    });

    const newInput = new inputModel({ input });
    await newInput.save();

    const newResponse = new responseModel({
      response: completion.choices[0].message.content,
    });
    await newResponse.save();

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getinput", async (req, res) => {
  try {
    const inputs = await inputModel.find();
    res.json(inputs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getresponse", async (req, res) => {
  try {
    const responses = await responseModel.find();
    res.json(responses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
