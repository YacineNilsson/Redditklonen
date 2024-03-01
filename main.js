document.addEventListener('DOMContentLoaded', function () {
    // Implementera formulärhantering för att skapa nya inlägg
    const createPostButton = document.querySelector('button');
    createPostButton.addEventListener('click', createPost);

    // Implementera gilla-funktionen och local storage för VG-krav
});


const postsContainer = document.getElementById('posts-container');

fetch('https://dummyjson.com/posts')
    .then(response => response.json())
    .then(data => {

        // Loopa igenom varje inlägg i datan med forEach istället för for- eller while-loop
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

    function createPost(event) {
        event.preventDefault();

        // Hämta värden från formuläret
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const tags = document.getElementById('post-tags').value.split(',');
    
        // Skapa ett nytt inläggselement
        const postElement = document.createElement('article');
        postElement.classList.add('post');
    
        // Fyll inlägget med relevant information. 
        postElement.innerHTML = ` 
            <h2>${title}</h2>
            <p>${content}</p>
            <p>Tags: ${tags.join(', ')}</p>
        `;
    
        // Hämta referensen till postsContainer
        const postsContainer = document.getElementById('posts-container');
    
        // Lägg till det nya inlägget längst upp
        if (postsContainer.firstChild) {
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
        } else {
            // Om det inte finns några inlägg ännu, bara lägg till det
            postsContainer.appendChild(postElement);
        }
    
        // Rensa formulärfälten
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-tags').value = '';
    }
    
    