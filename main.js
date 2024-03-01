document.addEventListener('DOMContentLoaded', function () {

    // Implementera formulärhantering för att skapa nya inlägg
    // Implementera gilla-funktionen och local storage för VG-krav
});

const postsContainer = document.getElementById('posts-container');

fetch('https://dummyjson.com/posts')
    .then(response => response.json())
    .then(data => {

        // Loopa igenom varje inlägg i datan
        data.posts.forEach(post => {

            // Skapa ett HTML-element för varje inlägg
            const postElement = document.createElement('article');
            postElement.classList.add('post'); // Lägg till klassen för styling

            // Fyll inlägget med relevant information. 
            postElement.innerHTML = ` 
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p>Tags: ${post.tags.join(', ')}</p>
            `;

            // Lägg till inlägget i postsContainer
            postsContainer.appendChild(postElement);
        });        
    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error);
    });