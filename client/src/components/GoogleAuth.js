import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { login, loginGoogle } from '../store/auth/authSlice'
import GoogleLogin from "react-google-login";


export default function GoogleAuth() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch()

    function handleLogin(e) {
        dispatch(loginGoogle(e))
    }


    return (

    <GoogleLogin
        clientId={'680068077157-j5nhi86uakgioqaq08b60aiqdrq6ojh8.apps.googleusercontent.com'}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
    />
    )
}