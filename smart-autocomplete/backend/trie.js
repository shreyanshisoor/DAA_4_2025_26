class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.frequency = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insertion: O(L)
    insert(word, freq = 1) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.frequency += freq;
    }

    // Find all words with a given prefix
    getSuggestions(prefix) {
        let node = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }

        let results = [];
        this._dfs(node, prefix, results);
        
        // Sort by frequency (descending) and return top 5
        return results.sort((a, b) => b.freq - a.freq).slice(0, 5);
    }

    _dfs(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push({ word: prefix, freq: node.frequency });
        }
        for (let char in node.children) {
            this._dfs(node.children[char], prefix + char, results);
        }
    }
}

module.exports = Trie;