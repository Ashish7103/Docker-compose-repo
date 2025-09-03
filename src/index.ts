import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // <-- add this for parsing JSON body

// GET route
app.get("/", async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST route
app.post("/", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    });
    res.json({ message: "post request received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
