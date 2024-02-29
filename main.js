document.addEventListener('DOMContentLoaded', function () {
    // Hämta inläggsdata och visa på sidan
    // Implementera formulärhantering för att skapa nya inlägg
    // Implementera gilla-funktionen och local storage för VG-krav
});

// Exempel på hur du kan hämta inläggsdata från DummyJSON
// Antag att du har ett HTML-element med id "posts-container" där du vill visa inläggen.
const postsContainer = document.getElementById('posts-container');

fetch('https://dummyjson.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data);

        // Kontrollera om data har en egenskap 'posts' som är en array
        if (Array.isArray(data.posts)) {
            // Loopa igenom varje inlägg i datan
            data.posts.forEach(post => {
                // Skapa ett HTML-element för varje inlägg
                const postElement = document.createElement('div');
                postElement.classList.add('post'); // Lägg till klassen för styling

                // Fyll inlägget med relevant information
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <p>Tags: ${post.tags.join(', ')}</p>
                `;

                // Lägg till inlägget i postsContainer
                postsContainer.appendChild(postElement);
            });
        } else {
            console.error('Error: The data received does not contain an array of posts.');
        }
    })
    .catch(error => console.error('Error fetching posts:', error));