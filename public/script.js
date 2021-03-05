const endpoint =
  "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
console.log(endpoint);
const restaurants_name = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => restaurants_name.push(...data));
console.log(restaurants_name);

let userInput = document.querySelector("#userInput");
let container = document.querySelector(".container");

userInput.addEventListener("keyup", () => {
  let query = userInput.value;
  let string = [];
  string.push(query);
  console.log(string);
  console.log(findMatches(query, restaurants_name));
});

function findMatches(wordToMatch, restaurants) {
  return restaurants.filter((name) => {
    const regex = new RegExp(wordToMatch, "gi");
    return name.name.match(regex) || name.zip.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants_name);
  const html = matchArray
    .map((name) => {
      return `
      <li>
        <span class="name">${name.name}, ${name.zip}</span>
        span.
        </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
