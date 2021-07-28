import { useUser } from './User'
import SignIn from './SignIn';

export default function PleaseSignIn({ children }) {
    const me = useUser();
    if (!me?.user?.id) return <SignIn />;
    return children;
}
