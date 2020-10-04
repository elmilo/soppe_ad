import axios from "axios";
const URL_API = "https://still-brushlands-61167.herokuapp.com/api/";
 /*
export const cuentaEnNube = (Cuenta, userID) => {
    const objetoVolador = Cuenta;
    console.log("Axios :", objetoVolador);
    
    return axios
      .post(URL_API + "Cuenta", objetoVolador)
      .then(response => {
        console.log("Cuenta puesta");
        return response.data;
      })
      .catch(err => {
        console.log("Error en promise Cuenta", err);
      });
  };
*/
  export function enviarNube(Cuenta, ENDPOINT) {
    return callEnviarNube(Cuenta, ENDPOINT);
  }
  
  async function callEnviarNube(Cuenta, ENDPOINT) {
    try {
      let response = await fetch(URL_API + ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Cuenta),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson._id;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }



  export function deleteNube(user_id, ENDPOINT) {
    return callDeleteNube(user_id, ENDPOINT);
  }
  
  async function callDeleteNube(user_id, ENDPOINT) {
    try {
      let response = await fetch(URL_API + ENDPOINT, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: user_id}),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      return (responseJson.ok > 0);
    } catch (error) {
      console.log(error);
      return -1;
    }
  }


  export function recibirNube(user_id, ENDPOINT) {
    return callRecibirNube(user_id, ENDPOINT);
  }
  
  async function callRecibirNube(user_id, ENDPOINT) {
    try {
      let response = await fetch(URL_API + ENDPOINT + '/' + user_id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }