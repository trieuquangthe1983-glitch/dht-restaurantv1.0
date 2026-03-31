const jokeContainer = document.getElementById('jokeContainer');
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const categorySelect = document.getElementById('categorySelect');
const safeModeCheckbox = document.getElementById('safeMode');
const loader = document.getElementById('loader');

let currentJoke = '';

// API endpoints
const API_BASE = 'https://v2.jokeapi.dev/joke/';

getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);

async function fetchJoke() {
    showLoader(true);
    getJokeBtn.disabled = true;
    
    try {
        const category = categorySelect.value || 'Any';
        const safe = safeModeCheckbox.checked ? '?safe-mode' : '';
        
        const url = `${API_BASE}${category}${safe}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        if (data.error) {
            jokeContainer.textContent = '❌ Could not fetch joke. Try again!';
            currentJoke = '';
            return;
        }
        
        // Handle two-part jokes
        if (data.type === 'twopart') {
            currentJoke = `${data.setup}\n\n${data.delivery}`;
        } else {
            currentJoke = data.joke;
        }
        
        jokeContainer.textContent = currentJoke;
        jokeContainer.style.animation = 'none';
        setTimeout(() => {
            jokeContainer.style.animation = 'fadeIn 0.5s ease-out';
        }, 10);
        
    } catch (error) {
        console.error('Error:', error);
        jokeContainer.textContent = '⚠️ Oops! Something went wrong. Please try again.';
        currentJoke = '';
    } finally {
        showLoader(false);
        getJokeBtn.disabled = false;
    }
}

function copyToClipboard() {
    if (!currentJoke) {
        alert('Please get a joke first!');
        return;
    }
    
    navigator.clipboard.writeText(currentJoke).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy joke');
    });
}

function showLoader(show) {
    if (show) {
        loader.classList.add('active');
    } else {
        loader.classList.remove('active');
    }
}

// Load initial joke
window.addEventListener('load', () => {
    fetchJoke();
});
