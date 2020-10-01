import axios from "axios";
const URL_API = "https://still-brushlands-61167.herokuapp.com/api/";
 
export const cuentaEnNube = Cuenta => {
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