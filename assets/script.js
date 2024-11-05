
const formSubmit = document.querySelector('#search');



async function fetchData() {

  try {

    const monsterName = document.getElementById("monsterInput").value.toLowerCase();
    const response = await fetch (`https://www.dnd5eapi.co/api/monsters/${monsterName}`);

    if(!response.ok){
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    console.log(data);
    const monsterImage = data.image;
    const imgElement = document.getElementById("monsterImage");
   imgElement.src = `https://www.dnd5eapi.co${monsterImage}`
    imgElement.style.display = "block";

    storeMonster(monsterName);
    displaySearchedMonsters();
  }
  catch (error) {
    console.error(error);
  }
}
function storeMonster(monsterName) {
  let monsters = JSON.parse(localStorage.getItem('searchedMonsters')) || [];

  if (!monsters.includes(monsterName)) {
    monsters.push(monsterName);
    localStorage.setItem('searchedMonsters', JSON.stringify(monsters));
  }
}
const displaySearchedMonsters = () => {
  const monsters = JSON.parse(localStorage.getItem('searchedMonsters')) || [];
  const monsterList = document.getElementById('monsterList');
  monsterList.innerHTML = '';

  monsters.forEach(monster => {
    const listItem = document.createElement('li');
    listItem.textContent = monster;
    monsterList.appendChild(listItem);
  });
}

const suggestionList = document.getElementById('suggestionList'); 
const fetchSuggestions = (query) => {
  

  

  const matches = monsterNames.filter(monster => monster.toLowerCase().startsWith(query.toLowerCase()));
  
  suggestionList.innerHTML = ''; 
  matches.forEach(monster => {
    const listItem = document.createElement('li');
    listItem.textContent = monster;
    suggestionList.appendChild(listItem);
  });
}


formSubmit.addEventListener('click', fetchData);

document.getElementById('monsterInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    fetchData();
  }
});

document.getElementById('monsterInput').addEventListener('input', function(event) {
  const query = event.target.value;
  fetchSuggestions(query);
});

window.onload = displaySearchedMonsters;