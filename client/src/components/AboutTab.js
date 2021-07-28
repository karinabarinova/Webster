
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function AboutTab({user}) {
	console.log("user1", user)
	let data = <h1>Page not found</h1>
	if (user) {
		data = (
<div style={{width: '70%', maxWidth: 700, margin: 'auto' }}>
			<div className="md:flex max-w-2xl">
				<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
					<Card className="w-full mb-32 rounded-16 shadow">
                        <div style={{ padding: '1rem'}}>
                            <Avatar alt={user.name} src={user?.profile_picture ? "http://localhost:3006/" + 'uploads/' + user.profile_picture.replace('resources', '') : "/1.jpg"} style={{width: 150, height: 150, margin: 'auto'}} />
                        </div>
						<AppBar position="static" elevation={1} style={{backgroundColor: 'red'}}>
							<Toolbar className="px-8">
								<Typography color="inherit" className="flex-1 px-12 font-medium" style={{fontSize: 22}}>
									General Information
								</Typography>
							</Toolbar>
						</AppBar>

						<CardContent>
							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>Full Name</Typography>
								<Typography style={{fontSize: 18}}>{user.name}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>Email</Typography>
                                <Typography style={{fontSize: 18}}>{user.email}</Typography>
							</div>

							<div className="mb-24">
								<Typography className="font-semibold mb-4 text-15" style={{fontSize: 18, textDecoration: 'underline'}}>About Me</Typography>
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
