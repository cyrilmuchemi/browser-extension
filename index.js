const dark_mode_toggle = document.getElementById('dark-mode-toggle');
const logo = document.getElementById('logo');
const lightIcon = document.getElementById('dark-light-icon');
let dark_mode = localStorage.getItem('dark-mode');

const enable_dark_mode = () => {
  document.body.classList.add('dark-mode')
  localStorage.setItem('dark-mode', 'enabled')
  change_image()
}

const disable_dark_mode = () => {
  document.body.classList.remove('dark-mode')
  localStorage.setItem('dark-mode', 'disabled')
  reset_image()
}

const change_image = () => {
  lightIcon.src = "./assets/images/icon-sun.svg" 
}

const reset_image = () => {
  lightIcon.src = "./assets/images/icon-moon.svg" 
}

if(dark_mode === 'enabled'){
  enable_dark_mode()
}

dark_mode_toggle.addEventListener('click', () => {
  dark_mode = localStorage.getItem('dark-mode');
  if(dark_mode !== "enabled"){
    enable_dark_mode()
  }else{
    disable_dark_mode()
  }
});


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

