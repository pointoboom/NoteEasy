import { Router } from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const authRouter = Router();

authRouter.get("/", async (req, res) => {
  const result = await pool.query("select * from customers");
  return res.json({
    data: result.rows,
  });
});

authRouter.post("/register", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  const result = await pool.query(
    `insert into customers(username,password) values ($1,$2)`,
    [user.username, user.password]
  );
  if (result) {
    console.log("success");
  }
  return res.json({
    message: "User has been created successfully",
  });
});

authRouter.post("/login", async (req, res) => {
  const user = await pool.query("select * from customers where username=$1", [
    req.body.username,
  ]);

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.rows[0].password
  );

  if (!isValidPassword) {
    return res.status(400).json({
      message: "password not valid",
    });
  }

  const token = jwt.sign(
    {
      id: user.rows[0].customer_id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: 900000,
    }
  );

  return res.json({
    message: "login succesfully",
    token,
  });
});
export default authRouter;
