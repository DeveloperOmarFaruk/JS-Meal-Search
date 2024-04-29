const mealAlrt = document.getElementById("meal-alrt");
const containerDiv = document.getElementById("meal");

const dataLoad = () => {
  const inputValue = document.getElementById("search-input");
  const searchText = inputValue.value;
  inputValue.value = "";

  // Load data
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayData(data.meals));
};

const displayData = (mealData) => {
  containerDiv.textContent = "";
  mealAlrt.textContent = "";

  if (mealData) {
    mealData.forEach((item) => {
      const div = document.createElement("div");

      div.innerHTML = `
      
      <div class = "meal-item" data-id = "${item.idMeal}">
      <div class = "meal-img">
          <img src = "${item.strMealThumb}" alt = "food">
      </div>
      <div class = "meal-name">
          <h3>${item.strMeal}</h3>
          <a href = "#" class = "recipe-btn" onclick="getRecipe(${item.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Get Recipe</a>
      </div>
  </div>
      
      `;

      containerDiv.appendChild(div);
    });
  } else {
    mealAlrt.textContent = "";
    const div = document.createElement("div");
    div.innerHTML = `
  <p class="not-found-meal">Sorry, we didn't find any meal!</p>
    `;
    mealAlrt.appendChild(div);
  }
};

// get Recipe data loaded

const getRecipe = (recipe_id) => {
  console.log(recipe_id);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe_id}`)
    .then((res) => res.json())
    .then((data) => displayRecipe(data.meals[0]));
};

// Display the recipe

const displayRecipe = (product_details) => {
  const detailsContainer = document.getElementById("recipe-details-div");
  detailsContainer.textContent = "";

  detailsContainer.innerHTML = `
    
    <div class="modal-header">
    <h1 class="modal-title-edit" id="exampleModalLabel">${product_details.strMeal}</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">

  <div class="">
  <img class="edit-modal-image" src="${product_details.strMealThumb}"/>  
</div>

  <div class="">
      <p class="edit-modal-category">  ${product_details.strCategory} </p>
    </div>

    <div class="ms-3 my-3">
    <p class="edit-modal-instructions">  Instructions: </p>
  </div>

    <div class="">
      <p class="edit-modal-instructions-details">  ${product_details.strInstructions} </p>
    </div>

  
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
   
    <a href="${product_details.strSource}" class="watch-button">Watch video</a>

  </div>

    `;

  console.log(product_details);
};
