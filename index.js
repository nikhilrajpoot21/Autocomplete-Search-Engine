const inputElement = document.querySelector(".search-input");
const button = document.querySelector(".search-btn");
const recommendationArea = document.querySelector('.recommendation_area');

button.addEventListener("click", () => {
  // Optional: handle manual search on button click
});

inputElement.addEventListener('input', () => {
  const query = inputElement.value.trim();

  if (query) {
    fetch(`http://localhost:8080/home?query=${encodeURIComponent(query)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("No matches found");
        }
        return response.json();
      })
      .then(suggestions => {
        if (!suggestions || suggestions.length === 0) {
          recommendationArea.innerHTML = '';
          return;
        }
        recommendationArea.innerHTML = `
          <ul>
            ${suggestions.map(item => `<li>${item}</li>`).join("")}
          </ul>
        `;
      })
      .catch(err => {
        recommendationArea.innerHTML = `<ul><li>${err.message}</li></ul>`;
      });
  } else {
    recommendationArea.innerHTML = ""; 
  }
});
