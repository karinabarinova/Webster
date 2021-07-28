import { useSelector } from 'react-redux'
import AboutTab from './AboutTab';
import EditInfoTab from './EditInfoTab';

export default function Account() {
    const {user} = useSelector(({user}) => user);

    return (
        <>
            {Object.keys(user).length !== 0 && (<>
                <AboutTab user={user.user}/>
                <EditInfoTab user={user.user} />
            </>)}
        </>
    )
}

