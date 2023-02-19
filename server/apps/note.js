import { Router } from "express";
import { pool } from "../db.js";
import { ProfanityEngine } from "@coffeeandfun/google-profanity-words";
import { protect } from "../middlewares/protect.js";
const noteRouter = Router();
noteRouter.use(protect);
let profanity = new ProfanityEngine();
noteRouter.get("/", async (req, res) => {
  try {
    const result =
      await pool.query(`select notes.note_id,notes.note,customers.username,categories.name,notes.created_at from notes
    inner join customers on notes.customer_id = customers.customer_id
    inner join categories on notes.cat_id = categories.cat_id order by note_id DESC`);

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

noteRouter.get("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const result = await pool.query(
      "select notes.note_id,notes.note,customers.username,categories.cat_id,notes.created_at from notes  inner join customers on notes.customer_id = customers.customer_id   inner join categories on notes.cat_id = categories.cat_id where notes.note_id = $1",
      [noteId]
    );

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});
noteRouter.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const customerId = req.body.customerId;

    const result = await pool.query(
      "delete from notes  where note_id = $1 returning * ",
      [noteId]
    );

    return res.json({
      success: true,
      message: "Note has been deleted.",
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

noteRouter.put("/:id", async (req, res) => {
  try {
    const data = req.body.note.split(" ").map((data) => {
      if (profanity.search(data.toLowerCase()) === true) {
        let word = "";
        for (let i = 0; i < data.length; i++) {
          word += "*";
        }
        return word;
      } else {
        return data;
      }
    });
    const noteId = req.params.id;
    const note = {
      note: data.join(" "),
      customerId: req.body.customerId,
      created_at: new Date(),
      catId: req.body.category,
      noteId,
    };
    const result = await pool.query(
      "update notes set note = $1,cat_id=$2 where note_id = $3 returning* ",
      [note.note, note.catId, note.noteId]
    );
    const updateHistory = await pool.query(
      `insert into histories(customer_id,note_id,updated_at,action,history_note,history_cat) values ($1,$2,$3,$4,$5,$6)`,
      [
        note.customerId,
        result.rows[0].note_id,
        new Date(),
        "update",
        note.note,
        note.catId,
      ]
    );
    return res.json({
      success: true,
      message: "Note has been updated.",
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

noteRouter.get("/history/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const result = await pool.query(
      `select histories.updated_at,histories.action,categories.name,customers.username,histories.history_note,histories.history_id from histories 
    left join customers on histories.customer_id = customers.customer_id
    left join categories on histories.history_cat = categories.cat_id
    where note_id = $1
    order by updated_at DESC`,
      [noteId]
    );

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

noteRouter.post("/", async (req, res) => {
  try {
    const data = req.body.note.split(" ").map((data) => {
      if (profanity.search(data.toLowerCase()) === true) {
        let word = "";
        for (let i = 0; i < data.length; i++) {
          word += "*";
        }
        return word;
      } else {
        return data;
      }
    });

    const note = {
      note: data.join(" "),
      // note: req.body.note,
      customerId: req.body.customerId,
      created_at: new Date(),
      catId: req.body.category,
    };

    const result = await pool.query(
      `insert into notes(note,customer_id,cat_id,created_at) values ($1,$2,$3,$4) returning *`,
      [note.note, note.customerId, note.catId, note.created_at]
    );

    const insertHistory = await pool.query(
      `insert into histories(customer_id,note_id,updated_at,action,history_note,history_cat) values ($1,$2,$3,$4,$5,$6)`,
      [
        note.customerId,
        result.rows[0].note_id,
        new Date(),
        "create",
        note.note,
        note.catId,
      ]
    );
    return res.json({
      success: true,
      message: "Note has been created.",
    });
  } catch (error) {
    res.status(401).send(error);
  }
});
export default noteRouter;
