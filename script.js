const searchInput = document.getElementById('searchInput');

const searchButton = document.getElementById('searchButton');

const randomHero = document.getElementById('randomHero');

const nameDiv = document.getElementById('nameDiv');

const imgDiv = document.getElementById('imgDiv');

const stats = document.getElementById('stats');

const getRandomHero = () => {
    const ID = Math.floor(Math.random() * 731) + 1;

    fetch(`https://superheroapi.com/api.php/1775676806160195/${ID}`)
    .then(response => response.json())
    .then(json => {
        console.log(json.image)
        nameDiv.innerHTML = `<h2>${json.name}</h2>`;
        imgDiv.innerHTML = `<img src=${json.image.url}  width = 70% height= 50%/>`
        let result = '';
        Object.keys(json.powerstats).forEach((key) => {
            const value = json.powerstats[key];
            result += `${statToEmoji[key]} ${key}: ${value} <br>`;
        })
        stats.innerHTML = result;
    })
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '💪',
    speed: '⚡',
    durability: '🏋️‍♂️',
    power: '📊',
    combat: '⚔️',
  }

const searchHeroByName = () => {
    const name = searchInput.value;

    fetch(`https://superheroapi.com/api.php/1775676806160195/search/${name}`)
    .then(response => response.json())
    .then(json => {
        if(json.results && json.results.length > 0 ) {
            const hero = json.results[0];
            nameDiv.innerHTML = `<h2>${hero.name}</h2>`;
            imgDiv.innerHTML = `<img src= "${hero.image.url}" width = 70% height = 50% />`;

            let s = '';

        Object.keys(hero.powerstats).forEach((key) => {
          const value = hero.powerstats[key];
          s += `${statToEmoji[key]} ${key}: ${value} <br>`;
        });

        stats.innerHTML = s;
        }
        else {
            nameDiv.innerHTML = '<h2>No hero found.</h2>';
            imgDiv.innerHTML = '';
            stats.innerHTML = '';
        }

        
    })
}



searchButton.onclick = () => searchHeroByName();

randomHero.onclick = () => getRandomHero();

searchButton.addEventListener('click', () => {
    // Clear the input text
    searchInput.value = '';
})

randomHero.addEventListener('click', () => {
    // Clear the input text
    searchInput.value = '';
})
