import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
    //create a state object for out inputs
    const [inputs, setInputs] = useState(initial);
    const initialValues = Object.values(initial).join('');

    useEffect(() => {
        //this function runs the things we are watching change
        setInputs(initial);
    }, [initialValues]);

    function handleChange(e) {
        let { value, name, type } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }
        if (type === 'file') {
            [value] = e.target.files;
        }

        setInputs({
            //copy the existing state
            ...inputs,
            //update the piece of state
            [name]: value

        });
    }

    function resetForm() {
        setInputs(initial);
    }

    function clearForm() {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => {
            return [key, ''];
        }));
        setInputs(blankState);
    }

    //return the things we want to surface from this custom hook
    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }
}