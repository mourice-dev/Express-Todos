/** @format */

// import pkg from "pg";
import mysql from "mysql2/promise";

// const { Pool } = pkg;

// export const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "tasktodo",
//   password: "",
//   port: "5432",
// });

export const db = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "tasktodo",
  password: "",
  port: "3306",
});

// // pool.connect()
// db.connect()
