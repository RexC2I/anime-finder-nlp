let isSearching = false;

// Enhanced NLP Query Parser with better keyword matching
class AnimeQueryParser {
    constructor() {
        this.genreKeywords = {
            'action': ['action', 'fighting', 'combat', 'battle', 'war', 'warrior', 'fight', 'martial', 'violence', 'violent'],
            'adventure': ['adventure', 'journey', 'quest', 'exploration', 'travel', 'expedition', 'pirates', 'explore'],
            'comedy': ['comedy', 'funny', 'humor', 'humorous', 'hilarious', 'jokes', 'lighthearted', 'parody', 'laugh', 'fun'],
            'drama': ['drama', 'emotional', 'serious', 'tragic', 'melodrama', 'heartbreak', 'family', 'intense'],
            'fantasy': ['fantasy', 'magic', 'magical', 'wizard', 'dragon', 'medieval', 'kingdom', 'knight', 'elf', 'dwarf', 'spell', 'enchanted', 'mythical', 'fairy', 'sorcery'],
            'horror': ['horror', 'scary', 'frightening', 'terrifying', 'creepy', 'nightmare', 'monster', 'demon', 'ghost', 'bloody', 'gore', 'dark', 'twisted'],
            'romance': ['romance', 'love', 'romantic', 'relationship', 'dating', 'couple', 'heartwarming', 'kiss', 'confession'],
            'sci-fi': ['sci-fi', 'science fiction', 'futuristic', 'space', 'technology', 'robot', 'cyberpunk', 'alien', 'time travel', 'future'],
            'slice of life': ['slice of life', 'daily life', 'everyday', 'realistic', 'normal', 'mundane', 'school life', 'relaxing'],
            'sports': ['sports', 'athletic', 'competition', 'tournament', 'team', 'baseball', 'soccer', 'basketball', 'volleyball', 'training'],
            'supernatural': ['supernatural', 'ghost', 'spirit', 'paranormal', 'otherworldly', 'mystical', 'demon', 'angel', 'undead', 'powers'],
            'thriller': ['thriller', 'suspense', 'tension', 'mystery', 'detective', 'crime', 'investigation', 'suspenseful'],
            'psychological': ['psychological', 'mind game', 'mental', 'manipulation', 'twisted', 'complex', 'serial killer', 'mind', 'psycho'],
            'mecha': ['mecha', 'robot', 'giant robot', 'gundam', 'mechanical', 'robots', 'pilot', 'machine'],
            'music': ['music', 'musical', 'singing', 'instrument', 'band', 'idol', 'concert', 'song', 'musician'],
            'military': ['military', 'army', 'soldier', 'marine', 'combat unit', 'battlefield', 'war', 'tactical'],
            'school': ['school', 'academy', 'student', 'classroom', 'high school', 'university', 'college', 'campus'],
            'vampire': ['vampire', 'blood', 'undead', 'immortal', 'bite', 'vampiric', 'dracula', 'bloodsucker']
        };
    }

    parseQuery(query) {
        const normalizedQuery = query.toLowerCase();
        const words = normalizedQuery.split(/\s+/);
        const matchedGenres = [];
        const matchedTags = [];

        // Check for genre matches
        for (const [genre, keywords] of Object.entries(this.genreKeywords)) {
            for (const keyword of keywords) {
                if (normalizedQuery.includes(keyword)) {
                    matchedGenres.push(genre);
                    break;
                }
            }
        }

        // Check for tag matches
        for (const anime of DEMO_ANIME_DATABASE) {
            for (const tag of anime.tags) {
                if (normalizedQuery.includes(tag.toLowerCase())) {
                    matchedTags.push(tag);
                }
            }
        }

        return {
            genres: [...new Set(matchedGenres)],
            tags: [...new Set(matchedTags)],
            words: words
        };
    }
}

// Search and display functions
function searchAnime() {
    console.log('searchAnime function called');
    const query = document.getElementById('searchInput').value.trim();
    console.log('Search query:', query);
    
    if (!query) {
        showError('Please enter a search query');
        return;
    }

    if (query.length < 2) {
        showError('Please enter at least 2 characters');
        return;
    }

    if (isSearching) return;
    isSearching = true;

    // Show loading
    showLoading(true);
    hideError();
    clearResults();

    // Simulate API delay
    setTimeout(() => {
        try {
            const results = performSearch(query);
            displayResults(results);
            showLoading(false);
            isSearching = false;
        } catch (error) {
            showError('An error occurred while searching');
            showLoading(false);
            isSearching = false;
        }
    }, 1000);
}

function performSearch(query) {
    const parser = new AnimeQueryParser();
    const parsedQuery = parser.parseQuery(query);
    
    const results = DEMO_ANIME_DATABASE.map(anime => {
        let score = 0;
        
        // Genre matching (highest priority)
        for (const genre of parsedQuery.genres) {
            if (anime.genres.some(g => g.toLowerCase() === genre)) {
                score += 6; // Increased weight for genre matches
            }
        }
        
        // Tag matching (high priority)
        for (const tag of parsedQuery.tags) {
            if (anime.tags.some(t => t.toLowerCase() === tag.toLowerCase())) {
                score += 3;
            }
        }
        
        // Exact title matching (very high priority)
        if (anime.title.toLowerCase().includes(query.toLowerCase()) || 
            anime.titleSecondary.toLowerCase().includes(query.toLowerCase())) {
            score += 5;
        }
        
        // Word matching in title and description
        for (const word of parsedQuery.words) {
            if (word.length > 2) {
                if (anime.title.toLowerCase().includes(word)) score += 2;
                if (anime.titleSecondary.toLowerCase().includes(word)) score += 2;
                if (anime.description.toLowerCase().includes(word)) score += 1;
            }
        }
        
        // Bonus for high-rated anime
        if (anime.score >= 8.5) score += 0.5;
        
        return { ...anime, matchScore: score };
    }).filter(anime => anime.matchScore >= 2) // Minimum threshold to avoid very weak matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    return results;
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>No anime found</h3>
                <p>Try different keywords or be more specific in your search. You can also try searching for genres like "action", "romance", "fantasy", etc.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = results.map(anime => {
        // Validate image URL and provide fallback
        const imageUrl = anime.image && anime.image.trim() ? anime.image : '';
        const fallbackImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE3MCIgdmlld0JveD0iMCAwIDEyMCAxNzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTcwIiBmaWxsPSIjMmEyYTI5Ii8+Cjx0ZXh0IHg9IjYwIiB5PSI4NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
        
        // Normalize match score to max 100%
        const normalizedScore = Math.min(anime.matchScore * 10, 100);
        
        return `
        <div class="result-item">
            <img src="${imageUrl}" alt="${anime.title}" class="anime-poster" 
                 onerror="this.src='${fallbackImage}'" 
                 onload="this.style.opacity='1'"
                 style="opacity: 0; transition: opacity 0.3s ease;">
            <div class="anime-details">
                <h3 class="anime-title">${anime.title}</h3>
                ${anime.titleSecondary !== anime.title ? `<p class="anime-title-secondary">${anime.titleSecondary}</p>` : ''}
                <div class="anime-meta">
                    <span class="meta-item">
                        <span class="rating ${getRatingClass(anime.score)}">${anime.score}</span>
                    </span>
                    <span class="meta-item">📺 ${anime.episodes} episodes</span>
                    <span class="meta-item">📅 ${anime.year}</span>
                    <span class="meta-item">🎬 ${anime.type}</span>
                    <span class="meta-item">📊 ${anime.status}</span>
                    <span class="meta-item">🎨 ${anime.studio}</span>
                </div>
                <div class="genres">
                    ${anime.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                </div>
                <p class="anime-description">${anime.description}</p>
            </div>
            <div class="match-score">${Math.round(normalizedScore)}% match</div>
        </div>
    `;
    }).join('');
}

function getRatingClass(score) {
    if (score >= 8.5) return 'high';
    if (score >= 7.0) return 'medium';
    return 'low';
}

function setExample(text) {
    document.getElementById('searchInput').value = text;
    document.getElementById('searchInput').focus();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchAnime();
    }
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    }
}

function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const searchBtn = document.getElementById('searchBtn');
    
    if (show) {
        loadingIndicator.style.display = 'block';
        searchBtn.disabled = true;
        searchBtn.textContent = 'Searching...';
    } else {
        loadingIndicator.style.display = 'none';
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.style.display = 'none';
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
}
