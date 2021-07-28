import Button from '@material-ui/core/Button';
import { addPassword, addEmail, addAvatar } from "../store/user/userSlice";
import { useDispatch } from "react-redux";
import useForm from '../lib/useForm';
import React, { useState } from 'react';
import Form from "./styles/Form";

export default function EditInfoTab({user}) {

    const dispatch = useDispatch()
    const [image, setImage] = useState('');
    const { inputs, handleChange } = useForm({
        password: '',
        email: user?.email,
    });

    const [emailStyle, setEmailStyle] = useState(false)
    const [passwordStyle, setPasswordStyle] = useState(false)

    const style = {
        background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
    }

    const style2 = {
        background: 'indianred', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
    }

    function handleImageChange(e) {
        e.preventDefault();
        setImage(e.target.files[0]);
    }


    return (
        <div id="input" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem',
                padding: '1rem'
            }}
        >
            <div>
                <Button 
                    variant="contained" 
                    onClick={() => setPasswordStyle(!passwordStyle)}  
                    style={style}
                > Change Password 🔐
                </Button>
                {passwordStyle && (
                    <>
                        <input
                            variant="contained" 
                            style={{...style2 }} 
                            id="password" 
                            name="password"
                            type="password" 
                            placeholder="NEW PASSWORD" 
                            onChange={handleChange}
                        />
                        <Button 
                            variant="contained" 
                            onClick={() => dispatch(addPassword( inputs.password))} 
                            style={{...style2}}
                            >ADD
                        </Button>
                    </>
                )}
            <div>
                <Button 
                    variant="contained" 
                    onClick={() => setEmailStyle(!emailStyle)}  
                    style={style}
                >Change Email 📧
                </Button>
                {emailStyle && (
                    <>
                        <input 
                            variant="contained" 
                            style={{...style2}} 
                            name="email"
                            id="email" 
                            type="email" 
                            placeholder="NEW EMAIL" 
                            onChange={handleChange}
                        />
                        <Button 
                            variant="contained" 
                            variant="contained" 
                            onClick={() => dispatch(addEmail( inputs.email ))} 
                            style={{...style2}}
                        >ADD</Button>
                    </>
                )}
                
            </div>

                <div>
                    <Form onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append("image", image);
                        dispatch(addAvatar(formData))
                    }}>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            style={{
                                background: 'red', color: 'white', padding: '1rem', margin: '1rem', fontSize: 14
                            }}
                        > Upload 🖼️
                        </Button>
                    </Form>
                </div>
            </div>
        </div>        
        )
} 

