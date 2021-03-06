async function windowActions(){
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  console.log(endpoint);
  

  const request = await fetch(endpoint)
  const restaurants_name = await request.json()
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
    return restaurants.filter((names) => {
      const regex = new RegExp(wordToMatch, "gi");
      return names.name.match(regex) || names.zip.match(regex) || names.category.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants_name);
    const html = matchArray.map(names => {
      return `
        <li>
          <span class="names">
            ${names.name}
            ${names.category}
            ${names.address_line_1}
            ${names.zip} 
          </span>
        </li>`;
    });

    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener("change", displayMatches);
  searchInput.addEventListener("keyup", (evt) => {displayMatches(evt)});

}
window.onload = windowActions;

