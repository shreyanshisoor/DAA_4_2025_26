const input = document.getElementById('search-input');
const box = document.getElementById('suggestions');

// Debounce function: Wait 200ms after user stops typing to call API
function debounce(func, timeout = 200) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const fetchSuggestions = async (e) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
        box.style.display = 'none';
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/search?q=${query}`);
        const data = await res.json();

        if (data.length > 0) {
            box.innerHTML = data.map(item => `
                <div class="suggestion-item" onclick="select('${item.word}')">
                    <span>${highlight(item.word, query)}</span>
                    <span class="freq-badge">${item.freq} hits</span>
                </div>
            `).join('');
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    } catch (err) {
        console.error("Connection error: Ensure backend node server is running.");
    }
};

// Fancy highlighting for the matching prefix
function highlight(word, query) {
    const index = word.toLowerCase().indexOf(query.toLowerCase());
    if (index >= 0) {
        return `<b>${word.substring(0, query.length)}</b>${word.substring(query.length)}`;
    }
    return word;
}

function select(val) {
    input.value = val;
    box.style.display = 'none';
}

input.addEventListener('input', debounce(fetchSuggestions));