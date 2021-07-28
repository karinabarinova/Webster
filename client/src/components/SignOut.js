import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {logout} from '../store/auth/authSlice'

export default function SignOut() {
    const { t } = useTranslation('common');
    const history = useHistory();
    const dispatch = useDispatch();
    
    return (
        <button type="button" onClick={() => {
            dispatch(logout());
            history.push("/")
        }}>
            {t("SIGNOUT")}
        </button>
    )
}