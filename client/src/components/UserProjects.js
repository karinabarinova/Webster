import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemStyles from './styles/ItemStyles'
import Tags from './styles/Tags'
import Title from './styles/Title'
import PriceTag from './styles/PriceTag'
import moment from 'moment';

const ProjectListStyles = styled.div`
    margin: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 60px;
`;

const Container = styled.div`
    margin-left: 5vw;
    margin-right: 5vw;
    text-align: center;
`

function UserProjects({projects}) {

	let data = null;
	if (projects && projects.length) {
		data =  projects.map((project, i) => {
            console.log('moment', moment(project.createdAt).format('MM/DD/YYYY'));
            const date = moment(project.createdAt).format('MM/DD/YYYY');
            return (
                <ItemStyles key={i}>
                    <img src={"http://localhost:3006/" + project.path.replace('resources', '')} alt="project" />
                    <Tags><b>{date}</b></Tags>
                </ItemStyles>
            )
        }) 
	}

	return (
        <Container>
            {data && (
                <>
                <h1>List of finished projects</h1>
                <ProjectListStyles>
                    {data}
                </ProjectListStyles>
                </>
            )}
            
        </Container>
    )
}

export default UserProjects;