
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
  
  }
  catch (error) {
    console.error(error);
  }
}
formSubmit.addEventListener('click', fetchData);