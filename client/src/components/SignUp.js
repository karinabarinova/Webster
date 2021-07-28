import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import useForm from "../lib/useForm";
import {register} from '../store/auth/registerSlice'

import Form from "./styles/Form";

export default function SignUp() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch()
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(register(inputs));
        resetForm();
    }
    
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>{t("SIGNUPINTO")}</h2>
            <fieldset>
                <label htmlFor="firstName">
                    {t("FIRST_NAME")}
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="John" 
                        autoComplete="given-name"
                        value={inputs.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="lastName">
                    {t("LAST_NAME")}
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Doe" 
                        autoComplete="family-name"
                        value={inputs.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    {t("EMAIL")}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder={t("YOUR_EMAIL")}
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    {t("PASSWORD")}
                    <input 
                        type="password" 
                        name="password" 
                        placeholder={t("YOUR_PASSWORD")} 
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">{t("SIGNUP!")}</button>
            </fieldset>
        </Form>
    )
}