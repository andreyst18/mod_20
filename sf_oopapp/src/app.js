import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import adminTemlplate from "./templates/adminField.html";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { Admin } from "./models/Admin";
import { generateTestUser } from "./utils";
import { generateTestAdmin } from "./utils";
import { State } from "./state";
import { authAdmin } from "./services/auth";
import { authUser } from "./services/auth";
import { left } from "@popperjs/core";

export const appState = new State();

const loginForm = document.querySelector("#app-login-form")
const loginButton = document.getElementById('app-login')
const greeting = document.getElementById('app-greeting')
const pleaseSignInText = document.getElementById('app-please')
const content = document.querySelector("#content")



//Создание и добавление тестовых администратора и пользователей в localstorage
generateTestAdmin(Admin);
generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  let status = true;
  

  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  let fieldHTMLContent;
  if (authAdmin(login, password)) {
    fieldHTMLContent = authAdmin(login, password)
    ? adminTemlplate
    : noAccessTemplate;
    fillTopPanel();
  } else if (authUser(login, password)) {
    fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;
    fillTopPanel();
    pleaseSignInText.style.display = "none"
    content.className = 'userBoard'
    
    let bottomPanel = document.createElement('div')
    bottomPanel.id = 'app-bottom-panel'
    document.body.append(bottomPanel)


  } else {
    alert('Доступ запрещен!');
    location.reload();
  }

  function fillTopPanel () {
    loginButton.innerHTML = "<button id=\"app-exit-btn\" class=\"btn btn-outline-warning\" type=\"submit\">Sign Out</button>";
    //greeting.innerHTML = `<h4>Здравствуйте, ${login}!</h4>`;  
  }
  
  content.innerHTML = fieldHTMLContent;

  //Создание новой задачи
  const addBacklogTask = document.getElementById('addBacklogTask')
  const backlogName = document.getElementById('backlog-name')
  addBacklogTask.addEventListener('click', () => {
    let newTask = document.createElement('div')
    newTask.classList = 'task'
    newTask.setAttribute('contenteditable', true)
    backlogName.after(newTask)
    addBacklogTask.innerHTML = 'Submit'

    
   
  })

  //Выход из личного кабинета
  loginButton.addEventListener('click', () => {
    status = false
    if (!status) {
      location.reload();
    }
  });

 
});


     




