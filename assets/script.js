It looks like your website is defaulting to dark mode when it first loads. This could be due to the `localStorage` value set previously or an issue with the default class on the `<html>` tag.

To ensure the website loads in light mode by default, you can modify your JavaScript to set the theme when the page loads. Here’s an updated version of your JavaScript:

### Updated JavaScript (script.js)
```javascript
const monsterInput = document.getElementById("monsterInput");
const searchButton = document.getElementById("searchButton");
const monsterResult = document.getElementById("monsterResult");
const toggleButton = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Load saved theme or set default to light
if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark'); // Ensure light mode is the default
}

// Toggle dark/light mode
toggleButton.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
});

searchButton.addEventListener("click", () => {
    const monsterName = monsterInput.value.toLowerCase();
    if (monsterName) {
        searchMonster(monsterName);
    } else {
        monsterResult.innerHTML = "Please enter a monster name.";
    }
});

function searchMonster(monsterName) {
    monsterResult.innerHTML = "Searching...";

    axios
        .get(`https://www.dnd5eapi.co/api/monsters`)
        .then((response) => {
            const monsters = response.data.results;
            const matchedMonster = monsters.find(
                (monster) => monster.name.toLowerCase() === monsterName
            );

            if (matchedMonster) {
                axios
                    .get(matchedMonster.url)
                    .then((monsterResponse) => {
                        const monsterData = monsterResponse.data;
                        monsterResult.innerHTML = `
                            <h2 class="text-xl font-bold">${monsterData.name}</h2>
                            <p><strong>Index:</strong> ${monsterData.index}</p>
                        `;
                    })
                    .catch((error) => {
                        monsterResult.innerHTML = "Error fetching monster details.";
                    });
            } else {
                monsterResult.innerHTML = "Monster not found.";
            }
        })
        .catch((error) => {
            monsterResult.innerHTML = "Error fetching monsters.";
        });
}
```

### Key Changes
- Ensure that when the page loads, the default theme is light unless the user has explicitly saved a dark theme preference. 

This should resolve the issue and display your website in light mode by default when you open it for the first time.