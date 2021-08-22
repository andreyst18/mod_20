import { Admin } from "./models/Admin";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  const defaultUsers = [
    { login: 'test', password: 'qwerty123' },
    { login: 'andrey', password: 'avs' },
    { login: 'pavel', password: '5566q' },
    { login: 'olga_535', password: 'rmpz6' },
    { login: 'sergey_msk', password: '01mrt' }
  ];
  //localStorage.clear();
  for (let i = 0; i < defaultUsers.length; i++) {
    const testUser = new User(defaultUsers[i]['login'], defaultUsers[i]['password']);
    User.save(testUser);
  }
};

export const generateTestAdmin = function (Admin) {
    const defaultAdmins =  { login: 'admin', password: 'admin01' };
    localStorage.clear();
    const testAdmin = new Admin(defaultAdmins['login'], defaultAdmins['password']);
    Admin.save(testAdmin);
};


