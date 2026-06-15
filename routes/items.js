import express from "express";
import multer from "multer";
import pool from "../db.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// GET /items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items ORDER BY item_id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving items",
    });
  }
});

// GET /items/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM items WHERE item_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error retrieving item",
    });
  }
});

// POST /items
router.post("/", upload.single("image"), async (req, res) => {
  const {
    user_id,
    created_date,
    description,
    category,
    condition,
    status,
    location,
    name,
  } = req.body;

  const image_path = req.file
    ? `/uploads/${req.file.filename}`
    : "/uploads/default-item.png";

  try {
    const result = await pool.query(
      `INSERT INTO items
      (user_id, created_date, description, category, condition, status, location, name, image_path)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        user_id,
        created_date,
        description,
        category,
        condition,
        status,
        location,
        name,
        image_path,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating item",
    });
  }
});

// PUT /items/:id
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;

  const {
    user_id,
    created_date,
    description,
    category,
    condition,
    status,
    location,
    name,
    old_image_path,
  } = req.body;

  const image_path = req.file
    ? `/uploads/${req.file.filename}`
    : old_image_path;

  try {
    const result = await pool.query(
      `UPDATE items
       SET user_id = $1,
           created_date = $2,
           description = $3,
           category = $4,
           condition = $5,
           status = $6,
           location = $7,
           name = $8,
           image_path = $9
       WHERE item_id = $10
       RETURNING *`,
      [
        user_id,
        created_date,
        description,
        category,
        condition,
        status,
        location,
        name,
        image_path,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating item",
    });
  }
});

// DELETE /items/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const itemResult = await pool.query(
      "SELECT * FROM items WHERE item_id = $1",
      [id]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const item = itemResult.rows[0];

    if (item.status === "Borrowed") {
      return res.status(400).json({
        message: "This item cannot be deleted because it is currently borrowed.",
      });
    }

    await pool.query(
      "DELETE FROM borrow_requests WHERE item_id = $1",
      [id]
    );

    const result = await pool.query(
      "DELETE FROM items WHERE item_id = $1 RETURNING *",
      [id]
    );

    res.json({
      message: "Item deleted successfully",
      deletedItem: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error deleting item",
    });
  }
});

export default router;