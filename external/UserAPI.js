const url = "https://still-brushlands-61167.herokuapp.com/api/";

export function login(user, pass) {
  return callLogin(user, pass);
}

async function callLogin(user, pass) {
  try {
    let response = await fetch(url + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user,
        password: pass,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function register(name, lastName, email, password) {
  return callRegister(name, lastName, email, password);
}

async function callRegister(name, lastName, email, password) {
  try {
    let response = await fetch(url + "user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: name,
        apellido: lastName,
        email: email,
        password: password,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return responseJson._id;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
