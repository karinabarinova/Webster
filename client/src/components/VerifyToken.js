import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useForm from "../lib/useForm";
import {verifyToken} from '../store/auth/registerSlice'

import Form from "./styles/Form";

export default function VerifyToken() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch()
    const { inputs, handleChange, resetForm } = useForm({
        token: '',
    })
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(verifyToken(inputs));
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>{t("VERIFY_EMAIL")}</h2>
            <fieldset>
                <label htmlFor="token">
                    {t("VERIFICATION_TOKEN")}
                    <input 
                        type="text" 
                        name="token" 
                        value={inputs.token}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">{t("VERIFY!")}</button>
            </fieldset>
        </Form>
    )
}