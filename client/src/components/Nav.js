import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Nav() {
    const { t } = useTranslation('common');
    const userData = useUser();
    return (
        <NavStyles>
            <Link to='/made-on-webster'>#MadeOnWebster</Link>
            <Link to='/get-inspired'>🧮</Link>
            { userData?.user?.id && (
                <>
                    <Link to='/new-project'>+ New project</Link>
                    <Link to='/profile'>{t("PROFILE")}</Link>
                    <SignOut />
                </>
            )}
            {(!userData || !userData?.user?.id) && (
                <>
                    <Link to='/signin'>{t('SIGNIN')}</Link>
                </>
            )}
            <LanguageSwitcher />
        </NavStyles>
    )
}
