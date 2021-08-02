
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

function AboutTab({user}) {
	const { t } = useTranslation('common');

	let data = <h1>Page not found</h1>
	if (user) {
		data = (
		<div style={{width: '70%', maxWidth: 700, margin: 'auto' }}>
			<div className="md:flex max-w-2xl">
				<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
					<Card className="w-full mb-32 rounded-16 shadow">
                        <div style={{ padding: '1rem'}}>
                            <Avatar alt={user.name} src={user?.profile_picture.length ? "http://localhost:3006/" + 'uploads/' + user.profile_picture.replace('resources', '') : "/1.jpg"} style={{width: 150, height: 150, margin: 'auto'}} />
                        </div>
						<AppBar position="static" elevation={1} style={{backgroundColor: '#6C63FF'}}>
							<Toolbar className="px-8">
								<Typography color="inherit" className="flex-1 px-12 font-medium" style={{fontSize: 22}}>
									{t("GENERAL_INFO")}
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>{t("NAME")}</Typography>
								<Typography style={{fontSize: 18}}>{user.name}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>{t("EMAIL")}</Typography>
                                <Typography style={{fontSize: 18}}>{user.email}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>{t("ABOUT_ME")}</Typography>
								<Typography style={{fontSize: 18}}>Type here...</Typography>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
		)
	}

	return data;
}

export default AboutTab;
