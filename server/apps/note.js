import { Router } from "express";
import { pool } from "../db.js";
const noteRouter = Router();

noteRouter.get("/", async (req, res) => {
  const result = await pool.query("select * from customers");
  return res.json({
    data: result.rows,
  });
});

noteRouter.get("/category", async (req, res) => {
  const result = await pool.query("select * from categories");
  return res.json({
    data: result.rows,
  });
});

noteRouter.post("/", async (req, res) => {
  const note = {
    note: req.body.note,
    customerId: req.body.customerId,
    created_at: new Date(),
    catId: req.body.category,
  };

  const result = await pool.query(
    `insert into notes(note,customer_id,cat_id,created_at) values ($1,$2,$3,$4)`,
    [note.note, note.customerId, note.catId, note.created_at]
  );
  return res.json({
    success: true,
    message: "Note has been created.",
  });
});
export default noteRouter;
