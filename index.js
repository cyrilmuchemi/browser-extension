const dark_mode_toggle = document.getElementById('dark-mode-toggle');
const logo = document.getElementById('logo');
const lightIcon = document.getElementById('dark-light-icon');
let dark_mode = localStorage.getItem('dark-mode');
const extensions_container = document.querySelector('.extensions');
const filterButtons = document.querySelectorAll(".interactive-btns .button")
let allExtensions = [];

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

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    allExtensions = data;
    displayExtensions(allExtensions);
  })
  .catch(error => console.log("Error loading JSON:", error));

const displayExtensions = (extensions) => {
  let cardsHTML = ""
  extensions.forEach(extension => {
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
  extensions_container.innerHTML = cardsHTML; 
}

filterButtons.forEach(button => {
  button.addEventListener('click', ()=>{
     filterButtons.forEach(btn => btn.classList.remove('active'));
     button.classList.add('active');
     const filterText = button.textContent.trim();

     if(filterText === "All"){
      displayExtensions(allExtensions)
     }else if(filterText === "Active"){
      const activeExtensions = allExtensions.filter(extension => extension.isActive)
      displayExtensions(activeExtensions)
     }else if(filterText === "Inactive"){
      const inactiveExtensions = allExtensions.filter(extension => !extension.isActive)
      displayExtensions(inactiveExtensions)
     }
  });
});

