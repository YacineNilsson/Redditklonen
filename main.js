//Detta behövs bara när javascript är placerad i head-elementet.
//Väntar på att köra js-kod tills att hela dokumentet har laddats.
//Bara lite övning och skadar inte att ha kvar även om det är överflödingt
document.addEventListener('DOMContentLoaded', function () {
});

// Hämta referensen till postsContainer
const postsContainer = document.getElementById('posts-container');

// Hämta inlägg från det externa API:et och hantera data
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

            // Lägg till like-knapp och räkna likes
            const likeButton = document.createElement('button');
            likeButton.innerText = 'Like';
            const reactionCount = document.createElement('span');
            reactionCount.innerText = `Likes: ${post.reactions || 0}`;
            
            // Lägg till en lyssnare för like-knappen
            likeButton.addEventListener('click', () => {
                post.reactions = (post.reactions || 0) + 1;
                reactionCount.innerText = `Likes: ${post.reactions}`;
            });
            
            // Lägg till like-knapp och räkna likes i inlägget
            postElement.appendChild(likeButton);
            postElement.appendChild(reactionCount);
            
            // Lägg till inlägget i postsContainer
            postsContainer.appendChild(postElement);


        });        
    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error);
    });

    // Skapa ett nytt inlägg när formuläret skickas
    function createPost(event) {
        event.preventDefault();

        // Hämta värden från formuläret
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const tagsInput = document.getElementById('post-tags').value;

        // Dela upp tagsInput-strängen i en array baserat på mellanslag,
        // och filtrera bort eventuella tomma strängar från arrayen.
        const tags = tagsInput.split(' ').filter(tag => tag.trim() !== '');

        // Kontrollera om titel- och/eller content-fälten är tomt
        if (!title || !content) {
        alert('Please fill in both title and text before posting.');
        return;
    }
    
        // Skapa ett nytt inläggselement
        const postElement = document.createElement('article');
        postElement.classList.add('post');
    
        // Fyll inlägget med relevant information. 
        postElement.innerHTML = ` 
            <h2>${title}</h2>
            <p>${content}</p>
            <p>Tags: ${tags.join(', ')}</p>
        `;
    
        // Lägg till det nya inlägget längst upp
        if (postsContainer.firstChild) {
            postsContainer.insertBefore(postElement, postsContainer.firstChild);
        } 
        // Om det inte finns några inlägg ännu, bara lägg till det
        else {
            postsContainer.appendChild(postElement);
        }
    
        // Rensa formulärfälten
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-tags').value = '';
    }
    
    