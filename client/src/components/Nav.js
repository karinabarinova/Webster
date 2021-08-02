import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@material-ui/core';

export default function Nav() {
    const { t } = useTranslation('common');
    const userData = useUser();
    return (
        <NavStyles>
            <Link to='/get-inspired'>✨{t("INSPIRE")}</Link>
            <Link to='/made-on-webster'>#MadeOnWebster</Link>
            { userData?.user?.id && (
                <>
                    <Link to='/new-project'>
                        <Button
                            variant="contained"
                            component="label"
                            style={{
                                backgroundColor: "#6C63FF", 
                                color: 'white', 
                                fontSize: 18,
                                fontWeight: 700,
                                padding: '1rem'
                            }}
                        >+ {t("NEW_PROJECT")}</Button>
                    </Link>
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
