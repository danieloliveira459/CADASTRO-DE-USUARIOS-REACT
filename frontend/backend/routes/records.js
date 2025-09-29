const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, age, birth_date, role, terms_accepted } = req.body;

    const [result] = await db.query(
      "INSERT INTO usuarios (name, email, age, birth_date, role, terms_accepted) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, age, birth_date, role, terms_accepted]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

