// Creating PostgreSQL Client here
import * as pg from "pg";
const { Pool } = pg.default;
const pool = new Pool({
  connectionString:
    "NoteEasy://postgres:Boom1991241991@localhost:5432/noteeasy",
});

export { pool };
