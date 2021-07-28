import { useDispatch, useSelector } from "react-redux";
import useForm from "../lib/useForm";
import {resetPassword} from '../store/auth/registerSlice'

import Form from "./styles/Form";

export default function Reset(props) {
    const data = useSelector(({register}) => register)
    const dispatch = useDispatch()
    const { inputs, handleChange, resetForm } = useForm({
        password: '',
    })
    
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(resetPassword({
            token: props.token,
            password: inputs.password
        }));
        resetForm();
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <fieldset>
                {data.resetMessage && (
                    <p>{data.resetMessage}</p>
                )}
                <label htmlFor="token">
                    Reset Token
                    <input 
                        type="text" 
                        name="token" 
                        value={props.token}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Reset My Password!</button>
            </fieldset>
        </Form>
    )
}