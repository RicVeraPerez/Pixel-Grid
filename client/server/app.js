const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('./db/grid.db', { verbose: console.log });
const app = express();
const path = require('path');
const router = express.Router();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});



router.get("/grid", (req, res) => {
    const grid = db.prepare(`SELECT * FROM grid`).all();
    
    try {
        res.status(200).json({grid: grid});
    } catch (error) {
        console.error('Error fetching grid:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});



router.post("/setGridColor", (req, res) => {
    const { x, y, color } = req.body;
    const selectedRow = db.prepare(`SELECT * FROM grid WHERE x = ? AND y = ?`);
    const row = selectedRow.get(x, y);
    const updateColor = db.prepare(`UPDATE grid SET color = ? WHERE x = ? AND y = ?`);

    if (!x || !y || !color) {
        return res.status(400).json({ error: 'Invalid input' });
    } else if (!row) {
        return res.status(400).json({ error: 'Cell not found' });
    }

    updateColor.run(color, x, y);
    const updatedGrid = db.prepare(`SELECT * FROM grid`).all();

    res.status(200).json({ message: 'Color updated successfully',
        grid : updatedGrid
     });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
