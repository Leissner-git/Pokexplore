const searchForm = document.getElementById("search-form");
const pokemonInput = document.getElementById("pokemon-input");
const message = document.getElementById("message");
const pokemonCard = document.getElementById("pokemon-card");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const pokemonName = pokemonInput.value.trim().toLowerCase();

    if (!pokemonName) {
        message.textContent = "Please enter a Pokémon name!";
        return;
    }

    message.textContent = "Searching...";
    pokemonCard.hidden = true;

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName)}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found!");
        }

        const data = await response.json();

        document.getElementById("pokemon-name").textContent =
            data.name.toUpperCase();

        document.getElementById("pokemon-image").src =
            data.sprites.front_default || "";

        document.getElementById("pokemon-image").alt =
            "Image of " + data.name;

        document.getElementById("pokemon-id").textContent = data.id;

        document.getElementById("pokemon-type").textContent =
            data.types.map(type => type.type.name).join(", ");

        document.getElementById("pokemon-height").textContent =
            data.height / 10 + " meters";

        document.getElementById("pokemon-weight").textContent =
            data.weight / 10 + " kilograms";

        pokemonCard.hidden = false;
        message.textContent = "Pokémon successfully found!";

    } catch (error) {
        message.textContent =
            "Pokémon not found. Please try again!";

        console.error("Search error:", error);
    }
});