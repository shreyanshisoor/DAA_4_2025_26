const express = require('express');
const cors = require('cors');
const Trie = require('./trie');
const fs = require('fs');

const app = express();
app.use(cors()); // CRITICAL: Allows frontend to talk to backend
app.use(express.json());

const trie = new Trie();

// Function to load data safely
function initializeData() {
    try {
        const raw = fs.readFileSync('./words.json');
        const words = JSON.parse(raw);
        words.forEach(item => trie.insert(item.word, item.freq));
        console.log(`✅ Trie initialized with ${words.length} nodes.`);
    } catch (err) {
        console.error("❌ Error loading words.json. Ensure file exists and is valid JSON.");
    }
}

app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);
    const results = trie.getSuggestions(query);
    res.json(results);
});

const PORT = 3000;
app.listen(PORT, () => {
    initializeData();
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});