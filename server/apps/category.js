import { Router } from "express";
import { pool } from "../db.js";
const catRouter = Router();

catRouter.get("/", async (req, res) => {
  const result = await pool.query("select * from categories");
  return res.json({
    data: result.rows,
  });
});
export default catRouter;
