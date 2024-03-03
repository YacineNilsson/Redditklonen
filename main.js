// Hämta referens
const postsContainer = document.getElementById("posts-container");

// Hämta inlägg från local storage eller det externa API:et
const posts = getFromLocalStorage();
if (posts.length === 0) {
  // Hämta från API om local storage är tomt
  fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((data) => {
      // Konvertera API-data och spara i local storage
      const apiPosts = data.posts.map((post) => ({
        ...post,
        reactions: 0, // Lägg till en nollreaktion som standard
      }));
      saveToLocalStorage(apiPosts);
      displayPosts(apiPosts); // Visa inlägg på sidan
    })
    .catch((error) => {
      console.error("Error fetching or parsing data:", error);
    });
} else {
  // Använd local storage-data direkt
  displayPosts(posts);
}

// Skapa ett nytt inlägg när formuläret skickas
function createPost(event) {
  event.preventDefault();

  // Hämta värden från formuläret
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const tagsInput = document.getElementById("post-tags").value;

  // Dela upp tagsInput-strängen i en array baserat på mellanslag,
  // och filtrera bort eventuella tomma strängar från arrayen.
  const tags = tagsInput.split(" ").filter((tag) => tag.trim() !== "");

  // Kontrollera om titel- och/eller content-fälten är tomt
  if (!title || !content) {
    alert("Please fill in both title and text before posting.");
    return;
  }

  // Skapa ett nytt inlägg
  const newPost = {
    title,
    body: content,
    tags,
    reactions: 0,
  };

  // Lägg till det nya inlägget längst upp
  posts.unshift(newPost);
  displayPosts(posts); // Visa inlägg på sidan

  // Spara inläggen i local storage
  saveToLocalStorage(posts);

  // Rensa formulärfälten
  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";
  document.getElementById("post-tags").value = "";
}

// Funktion för att visa inlägg på sidan
function displayPosts(posts) {
  // Rensa befintliga inlägg på sidan
  postsContainer.innerHTML = "";

  // Loopa igenom varje inlägg och skapa HTML-element
  posts.forEach((post) => {
    const postElement = document.createElement("article");
    postElement.classList.add("post");

    postElement.innerHTML = ` 
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p>Tags: ${post.tags.join(", ")}</p>
    `;

    // Skapa like-knapp och räkna likes
    const likeButton = document.createElement("button");
    const reactionCount = document.createElement("span");

    likeButton.innerText = "Like";
    reactionCount.innerText = `Likes: ${post.reactions || 0}`;

    likeButton.addEventListener("click", () => {
      post.reactions = (post.reactions || 0) + 1;
      reactionCount.innerText = `Likes: ${post.reactions}`;
      saveToLocalStorage(posts); // Uppdatera local storage när likes ändras
    });

    postElement.appendChild(likeButton);
    postElement.appendChild(reactionCount);
    postsContainer.appendChild(postElement);
  });
}

// Funktion för att spara inlägg i local storage
function saveToLocalStorage(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Funktion för att hämta inlägg från local storage
function getFromLocalStorage() {
  const storedPosts = localStorage.getItem("posts");
  if (storedPosts) {
    return JSON.parse(storedPosts);
  } else {
    return [];
  }
}
