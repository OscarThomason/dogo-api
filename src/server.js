import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Dogo API funcionando ✅" });
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany({
    where: { active: true }
  });
  res.json(products);
});

app.listen(3000, () => {
  console.log("🚀 API corriendo en puerto 3000");
});
