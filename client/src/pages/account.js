import {useDispatch } from 'react-redux'
import Account from '../components/Account';
import { useEffect } from 'react';
import { getUserInfo } from '../store/user/userSlice';
import PleaseSignIn from '../components/PleaseSignIn';

export default function AccountPage(props) {
    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserInfo());
	}, [])

    return(
        <PleaseSignIn>
            <Account />
        </PleaseSignIn>
    )
}
