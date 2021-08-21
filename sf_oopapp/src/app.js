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

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

//Создание и добавление тестовых администратора и пользователей в localstorage
generateTestAdmin(Admin);
generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  let fieldHTMLContent;
  if (authAdmin(login, password)) {
    fieldHTMLContent = authAdmin(login, password)
    ? adminTemlplate
    : noAccessTemplate;  
  } else if (authUser(login, password)) {
    fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;
  }

  
  document.querySelector("#content").innerHTML = fieldHTMLContent;
});

