const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    const promises2 = [];
    for (let i = 1; i <= 100; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        promises2.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
      
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
            
        }));
      
 function fetchPokemonExtraData(i) {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`).then((res) => res.json());
}       
        
        displayPokemon(pokemon);
      for (let i = 1; i <= 800; i++) {
        fetchPokemonExtraData(i).then((data) => {
        let description = data.flavor_text_entries.find(el => el.language.name === "en").flavor_text;
       
        let pokemonCard = document.getElementById(`${i}`);
        let text = document.createTextNode(description);
       
        pokemonCard.appendChild(text);
    });
      }
    
      });
};





const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card" id="${pokeman.id}">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title"> ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};



fetchPokemon();

function searchy() {
    // Declare variables
    let input, filter, ul, li, h2, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("pokedex");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      h2 = li[i].getElementsByTagName("h2")[0];
      txtValue = h2.textContent || h2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  
  
  
  
  
  function sortList() {
    let list, i, switching, b, g, shouldSwitch;
    list = document.getElementById("pokedex");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("li");
      g = list.getElementsByTagName("h2")
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (g[i].innerHTML.toLowerCase() > g[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }
