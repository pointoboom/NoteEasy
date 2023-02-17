import { Router } from "express";
import { pool } from "../db.js";
const noteRouter = Router();

noteRouter.get("/", async (req, res) => {
  const result =
    await pool.query(`select notes.note_id,notes.note,customers.username,categories.name,notes.created_at from notes
inner join customers on notes.customer_id = customers.customer_id
inner join categories on notes.cat_id = categories.cat_id order by note_id ASC`);
  return res.json({
    data: result.rows,
  });
});

noteRouter.get("/:id", async (req, res) => {
  const noteId = req.params.id;
  const result = await pool.query(
    "select notes.note_id,notes.note,customers.username,categories.cat_id,notes.created_at from notes  inner join customers on notes.customer_id = customers.customer_id   inner join categories on notes.cat_id = categories.cat_id where notes.note_id = $1",
    [noteId]
  );

  return res.json({
    data: result.rows,
  });
});

noteRouter.put("/:id", async (req, res) => {
  const noteId = req.params.id;
  const note = {
    note: req.body.note,
    customerId: req.body.customerId,
    created_at: new Date(),
    catId: req.body.category,
    noteId,
  };
  const result = await pool.query(
    "update notes set note = $1,cat_id=$2 where note_id = $3 returning* ",
    [note.note, note.catId, note.noteId]
  );

  return res.json({
    success: true,
    message: "Note has been updated.",
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
