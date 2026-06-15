import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /requests
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM borrow_requests ORDER BY request_id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving requests",
    });
  }
});

// POST /requests
router.post("/", async (req, res) => {
  const {
    requester_id,
    message,
    status,
    request_date,
    item_id,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO borrow_requests
      (requester_id, message, status, request_date, item_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        requester_id,
        message,
        status,
        request_date,
        item_id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating request",
    });
  }
});

// PUT /requests/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    requester_id,
    message,
    status,
    request_date,
    item_id,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE borrow_requests
       SET requester_id = $1,
           message = $2,
           status = $3,
           request_date = $4,
           item_id = $5
       WHERE request_id = $6
       RETURNING *`,
      [
        requester_id,
        message,
        status,
        request_date,
        item_id,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating request",
    });
  }
});

// DELETE /requests/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM borrow_requests WHERE request_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    res.json({
      message: "Request deleted successfully",
      deletedRequest: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting request",
    });
  }
});

export default router;