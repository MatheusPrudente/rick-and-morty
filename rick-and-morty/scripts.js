const baseUrl = "https://rickandmortyapi.com/api/";
const charactersUrl = "character/?page=";
const locationsUrl = "location/?page=";
const episodesUrl = "episode/?page=";

const divCharacters = document.querySelector("#results-characters");
const cardCharacters = document.querySelector("#card-characters");

const divEpisodes = document.querySelector("#results-episodes");
const cardEpisodes = document.querySelector("#card-episodes");

const divLocations = document.querySelector("#results-locations");
const cardLocations = document.querySelector("#card-locations");

getPageCharacters();
getPageLocations();
getPageEpisodes();


function generateRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getPageCharacters() {
  await fetch(baseUrl + charactersUrl + generateRandomNumber(1, 42))
    .then((response) => response.json())
    .then((data) => {
      data.results.map((character) => {
        const cardClone = cardCharacters.cloneNode(true);
        cardClone.querySelector("img").src = character.image;
        cardClone.querySelector(".card-title a").innerHTML = character.name;
        cardClone.querySelector(".card-title a").innerHTML = character.name;
        cardClone.querySelector(".card-subtitle").appendChild(statusCharacter(character.status));
        cardClone.querySelector(".card-subtitle").innerHTML += " " + character.status + " - " + character.species;
        cardClone.querySelector("#first-location").innerHTML = character.location.name;
        cardClone.querySelector("#first-location").href = character.location.url;

        getSingleEpisode(character.episode[0])
          .then((name) => {
          cardClone.querySelector("#first-seen").innerHTML = name;
          })
          .catch((error) => {
            console.error('Error:', error);
          });


        divCharacters.appendChild(cardClone);
      });

      cardCharacters.remove();
    });
}

async function getPageLocations() {
  await fetch(baseUrl + locationsUrl + generateRandomNumber(1, 7))
    .then((response) => response.json())
    .then((data) => {
      data.results.map((location) => {
        const cardClone = cardLocations.cloneNode(true);
        cardClone.querySelector(".card-title a").innerHTML = location.name;
        cardClone.querySelector(".card-subtitle").innerHTML = location.type + " - " + location.dimension;
        divLocations.appendChild(cardClone);
      })

      cardLocations.remove();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

async function getPageEpisodes() {
  await fetch(baseUrl + episodesUrl + generateRandomNumber(1, 3))
    .then((response) => response.json())
    .then((data) => {
      data.results.map((episode) => {
        const cardClone = cardEpisodes.cloneNode(true);
        cardClone.querySelector(".card-title a").innerHTML = episode.episode + " - " + episode.name;
        divEpisodes.appendChild(cardClone);
      });

      cardEpisodes.remove();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function getSingleEpisode(url){
  const name = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.name;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    return name;
}

function statusCharacter(status) {
  let statusSpan = document.createElement("span");
  statusSpan.classList.add("badge");
  statusSpan.classList.add("rounded-pill");

  switch (status) {
    case "Alive":
      statusSpan.classList.add("bg-success");

      break;
    case "Dead":
      statusSpan.classList.add("bg-danger");

      break;
    default:
      statusSpan.classList.add("bg-secondary");

      break;
  }

  let alertHidden = document.createElement("span");
  alertHidden.classList.add("visually-hidden");
  alertHidden.innerHTML = "n";
  statusSpan.appendChild(alertHidden);

  return statusSpan;
}
