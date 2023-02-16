import { Router } from "express";
import { pool } from "../db.js";
const noteRouter = Router();

noteRouter.get("/", async (req, res) => {
  const result = await pool.query("select * from customers");
  return res.json({
    data: result.rows,
  });
});

export default noteRouter;
