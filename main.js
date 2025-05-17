// Store the loaded quotes
let fullQuotes = [];

// Fetch data from DummyJSON API when page loads with fetch method  
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Using limit argument to fetch all quotes in one request
        // Note: The API have a defualt limit of 30, so we need to set it to 1454 to get all quotes
        const response = await fetch('https://dummyjson.com/quotes?limit=1454');

        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        // Using await to get the json response from a promise
        const data = await response.json();
        fullQuotes = data.quotes; // Store the quotes array
        displayResults(fullQuotes); // Display all quotes initially
    } catch (error) {
        console.error('Error fetching quotes:', error);
        document.getElementById('results').innerHTML =
            `<div class="error">Error loading quotes. Please Check Internet Connection.</div>`;
    }
});

// Set up search input event listener with case insensetive 
document.getElementById('search').addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();

    if (searchTerm === '') {
        displayResults(fullQuotes);
        return;
    }

    const filteredQuotes = fullQuotes.filter(quote =>
        quote.quote.toLowerCase().includes(searchTerm) ||
        quote.author.toLowerCase().includes(searchTerm)
    );

    displayResults(filteredQuotes, searchTerm);
});

// Display results in the Doc page 
function displayResults(quotes, highlightTerm = '') {
    const resultsContainer = document.getElementById('results');

    if (quotes.length === 0) {
        resultsContainer.innerHTML = '<div class="quote">No matching quotes found</div>';
        return;
    }

    resultsContainer.innerHTML = quotes.map(quote => {
        let displayQuote = quote.quote;
        let displayAuthor = quote.author;

        return `
            <div class="quote">
                <div class="quote-text">"${displayQuote}"</div>
                <div class="quote-author">— ${displayAuthor}</div>
            </div>
        `;
    }).join('');
}