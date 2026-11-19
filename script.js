const searchForm = document.getElementById("search-form");
const pokemonInput = document.getElementById("pokemon-input");
const message = document.getElementById("message");
const pokemonCard = document.getElementById("pokemon-card");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const pokemonName = pokemonInput.value.trim().toLowerCase();


    pokemonCard.hidden = true;

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName)}`
        );

        const data = await response.json();

        document.getElementById("pokemon-name").textContent =
            data.name.toUpperCase();

        document.getElementById("pokemon-image").src =
            data.sprites.front_default || "";

        document.getElementById("pokemon-image").alt =
            "Image of " + data.name;

        pokemonCard.hidden = false;

    } catch (error) {
        message.textContent =
            "Pokémon not found. Please try again!";

        console.error("Search error:", error);
    }
});