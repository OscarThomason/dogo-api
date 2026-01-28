import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dogo API OK ✅");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Dogo API funcionando ✅" });
});

app.get("/health/db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: "up" });
  } catch (e) {
    res.status(500).json({ ok: false, db: "down", error: String(e.message || e) });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: "Error consultando productos" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Running on", PORT);
});

