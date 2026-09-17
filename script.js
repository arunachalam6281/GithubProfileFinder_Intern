const usernameInput = document.getElementById("usernameInput");
const searchButton = document.getElementById("searchButton");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const profileResult = document.getElementById("profileResult");

async function findProfile() {

    try {

        const username = usernameInput.value.trim();

        if (username === "") {
            error.textContent = "Please enter a GitHub username.";
            return;
        }

        loading.textContent = "Loading...";
        error.textContent = "";
        profileResult.innerHTML = "";

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
            throw new Error("GitHub user not found.");
        }

        const data = await response.json();

        profileResult.innerHTML = `
            <img src="${data.avatar_url}" alt="Profile picture">

            <h2>${data.name || data.login}</h2>

            <p>Username: ${data.login}</p>
            <p>Public Repositories: ${data.public_repos}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
        `;

    } catch (err) {

        profileResult.innerHTML = "";
        error.textContent =
            "Sorry, we couldn't find that GitHub user.";

        console.log(err.message);

    } finally {

        loading.textContent = "";

    }
}

searchButton.addEventListener("click", function() {
    findProfile();
});