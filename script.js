let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Add keydown event listener to input field
let userInp = document.getElementById('userInp');
userInp.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') { // Enter key pressed
    searchRecipe();
  }
});

// pushing the margin down by 80px onclick
const sea = document.getElementById('search-btn');
const myDiv = document.getElementById('card');

sea.addEventListener('click', () => {
  myDiv.style.top = '80px'; // Move the div downwards by 80 pixels
});


// Add click event listener to search button
searchBtn.addEventListener('click', searchRecipe);

// Define searchRecipe function
function searchRecipe() {
  let userInput = userInp.value;
  if (userInput.length == 0) {
    result.innerHTML = `<h3>Ehhhh!! Please Enter a dish name, Input can't be empty</h3>`
  } else {
    fetch(url + userInput)
      .then(response => response.json())
      .then(data => {
        let meals = data.meals;
        if (meals == null) {
          result.innerHTML = `<h3>"Oops!! I can't know all the Recipe's human.Please give it another go"</h3>`;
          return;
        }

        let meal = meals[0];
        let count = 1;
        let Steps = [];
        for (let i = 1; i <= 20; i++) {
          let ingredient = meal[`strIngredient${i}`];
          let measure = meal[`strMeasure${i}`];
          if (ingredient == null || ingredient.trim() === "") {
            break;
          }
          Steps.push(`${measure} ${ingredient}`);
        }

        result.innerHTML = `
        <img src= ${meal.strMealThumb}> 
        <div class="details">
        <h2>${meal.strMeal}</h2>
        <h4>${meal.strArea}</h4>
        </div>
        <div id="ingredient-con"></div>
        <div id="receipe">
        <button id="close-btn">X</button>
        <pre id="instructions"> ${meal.strInstructions}
        </pre>
        </div>
        <button id ="view-receipe">View Recipe </button>
        `;

        let ingredientCon = document.getElementById('ingredient-con');
        let parent = document.createElement("ul");
        let receipe = document.getElementById('receipe');
        let Close_Receipe = document.getElementById('close-btn');
        let Show_Receipe = document.getElementById('view-receipe');

        Steps.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        })

        Close_Receipe.addEventListener("click", () => {
          receipe.style.display = "none";
        });
        Show_Receipe.addEventListener("click", () => {
          receipe.style.display = "block";
        });

      }).catch(() => {
        result.innerHTML = `<h3>"Oops!! I can't know all the Recipe's human.Please give it another go"</h3>`
      })
  }
}

//PWA 
if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service worker.js").then(registration =>{
      console.log("SW Registered!!");
      console.log(registration);
  }).catch(error =>{
      console.log("SW Registration Failed");
      console.log(error);
  });
}

