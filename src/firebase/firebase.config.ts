import { AuthMethods, AuthProviders } from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyA0YqRazl3T-2l4OFqI8MbsN55FWBvLUkI",
    authDomain: "midonacion-deb70.firebaseapp.com",
    databaseURL: "https://midonacion-deb70.firebaseio.com",
    storageBucket: "midonacion-deb70.appspot.com",
    messagingSenderId: "219375102937"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
}
