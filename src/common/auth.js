import {user as UserService} from '../service/logUTT.service';

const ETU_URL = "https://etu.utt.fr/api/";
const CLIENT_ID = process.env.VUE_APP_ETU_UTT_CLIENT_ID;
// const CLIENT_SECRET = process.env.VUE_APP_ETU_UTT_CLIENT_SECRET;

const Auth = {
  redirectURL: ETU_URL + "oauth/authorize?client_id=" + CLIENT_ID + "&scope=public%20private_user_account",
  async login(code) {
    const user = await UserService.login(code)
      .then(response => response.data.user)
      .catch(error => console.log(error))
    ;
    localStorage.setItem('user-data', JSON.stringify(user));
    window.location.replace("/liste-materiel");
  },
  logout() {
    localStorage.removeItem('user-data');
  },
  getCurrentUser() {
    return localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data')) : false;
  }
};

export default Auth;