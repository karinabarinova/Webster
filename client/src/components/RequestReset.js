import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useForm from "../lib/useForm";
import {requestReset} from '../store/auth/registerSlice'

import Form from "./styles/Form";

export default function RequestReset() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch()
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    })
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(requestReset(inputs));
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>{t("REQUEST_PASSWORD_RESET")}</h2>
            <fieldset>
                <label htmlFor="email">
                    {t("EMAIL")}
                    <input 
                        type="email" 
                        name="email" 
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">{t("REQUEST_RESET")}</button>
            </fieldset>
        </Form>
    )
}