import axios from 'axios';


// URL de l'API avec l'envirennement
const API_URL = `${process.env.REACT_APP_BASE_URL}/auth/check`; 

// Fonction asynchrone avec "login"
const login = async (email, password) => {
  try {
    // DEfinier les vqriables
    const data= { mail: email, password: password }
    // Methode
    const response = await axios.post(API_URL, data);
    // Token
    const { accessToken, refreshToken } = response.data;

    // Stockage et gerer le token 
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    
    // REdiriger l'utilisateur
    window.location.href="/home";

    return response.data;
  } catch (error) {
    // SI il y a d'erreur
    throw new Error('Invalid credentials');
  }
};

export default {login};