const extensions_container = document.querySelector('.extensions');

fetch('./data.json')
.then(response => response.json())
.then(data => {
    let cardsHTML = ''

    data.forEach(extension => {
        cardsHTML += `
        <div class="extension-card">
          <div class="card-top">
            <img src="${extension.logo}" alt="${extension.name}">
            <div>
              <p class="text-semi-header text-blue">${extension.name}</p>
              <p class="text-body">${extension.description}</p>
            </div>
          </div>
          <div class="card-bottom mt-2 pb-2">
            <button class="removeBtn text-blue">Remove</button>
            <label class="switch">
              <input type="checkbox" ${extension.isActive ? "checked" : ""}>
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        `
    });
    extensions_container.innerHTML = cardsHTML
})
.catch(error => console.log("Error loading JSON:", error))