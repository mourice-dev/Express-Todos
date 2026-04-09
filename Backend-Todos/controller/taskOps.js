/** @format */

import { db } from "../config/db.js";

export async function insertTask(req, res) {
  const { task, status } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO tasks (task, status) VALUES (?,?)",
      [task, status]
    );
    res.status(201).json({ id: result.insertId, task, status });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to insert task" });
  }
}

export async function getAllTask(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.status(200).json(rows);
  } catch (error) {
    console.log("getAllTask error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

export async function deleteTask(req, res) {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM tasks WHERE id=?", [id]);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log("deleteTask error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
}
export async function updateStatus(req, res) {
  const id = req.params.id;
  try {
    const [[task]] = await db.query("SELECT status FROM tasks WHERE id=? ", [
      id,
    ]);
    const newStatus = !task.status;
    await db.query("UPDATE tasks SET status=? WHERE id=?", [newStatus, id]);
    res.status(200).json({ message: "Status updated successfully" });
  } catch (err) {
    console.log("updateStatus error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
}
  