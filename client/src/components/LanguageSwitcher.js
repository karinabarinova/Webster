import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLanguage } from '../store/i18n/i18nSlice.js';
import styled from 'styled-components';

const DropDown = styled.div`
	float: left;
	overflow: hidden;
	padding: 1rem 3rem;
    display: flex;
    align-items: center;
    // position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
	&:hover div {
		display: block;
	}
`;

const DropDownContent = styled.div`
	display: none;
	  position: absolute;
	  background-color: white;
	  min-width: 160px;
	  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	  z-index: 10;
	  top: 10rem;
	  border: 0;
	a {
		float: none;
  		color: black;
  		padding: 12px 16px;
  		text-decoration: none;
  		display: block;
  		text-align: left;
	}
	a:hover {
		background-color: #ddd;
	}
`;

const languages = [
	{
		id: 'en',
		title: 'English',
		flag: 'us'
	},
	{
		id: 'ua',
		title: 'Ukrainian',
		flag: 'ua'
	},
    {
		id: 'ru',
		title: 'Russian',
		flag: 'ru'
	}
];

function LanguageSwitcher(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const currentLanguage = languages.find(lng => lng.id === currentLanguageId);

	const [menu, setMenu] = useState(null);

	const langMenuClick = event => {
		setMenu(event.currentTarget);
	};

	const langMenuClose = () => {
		setMenu(null);
	};

	function handleLanguageChange(lng) {
		dispatch(changeLanguage(lng.id));

		langMenuClose();
	}

	return (
		<DropDown>
			<Button onClick={langMenuClick}>
				<img
					src={`/assets/${currentLanguage.flag}.png`}
					width='25'
					height='20'
					style={{margin: '5px 10px', verticalAlign: 'middle'}}
					alt={currentLanguage.title}
				/>

				<Typography className="mx-4 font-bold" color="textSecondary">
					{currentLanguage.id}
				</Typography>
			</Button>

			<DropDownContent>
				{languages.map(lng => (
					<div key={lng.id} onClick={() => handleLanguageChange(lng)}>
						<p style={{fontWeight: 600, fontSize: 20}}>
							<img 
								style={{margin: '5px 10px', verticalAlign: 'middle'}}
								width='20' 
								src={`/assets/${lng.flag}.png`} 
								alt={lng.title} 
							/>
							{lng.title}
						</p>
					</div>
				))}
			</DropDownContent>
		</DropDown>
	);
}

export default LanguageSwitcher;
