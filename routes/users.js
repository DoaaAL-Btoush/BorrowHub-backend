import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY user_id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving users",
    });
  }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving user",
    });
  }
});

// POST /users
router.post("/", async (req, res) => {
  const {
    full_name,
    email,
    password,
    role,
    status,
    joined_date,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users
      (full_name, email, password, role, status, joined_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [full_name, email, password, role, status, joined_date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating user",
    });
  }
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    full_name,
    email,
    password,
    role,
    status,
    joined_date,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET full_name = $1,
           email = $2,
           password = $3,
           role = $4,
           status = $5,
           joined_date = $6
       WHERE user_id = $7
       RETURNING *`,
      [full_name, email, password, role, status, joined_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating user",
    });
  }
});

// DELETE /users/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      deletedUser: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting user",
    });
  }
});

export default router;