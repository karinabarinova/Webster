import {useSelector } from 'react-redux'

export function useUser() {
    const data = useSelector(({auth}) => auth);
    if (!data.user?.id) {
        return JSON.parse(localStorage.getItem('user'));
    }
    return data;
}

