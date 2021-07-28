import styled from "styled-components";
import RequestReset from "../components/RequestReset";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import VerifyToken from "../components/VerifyToken";
import GoogleAuth from "../components/GoogleAuth"

const GridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding-top: 2rem;
`;

export default function SingInPage() {
    return (
        <div>
            <GridStyles>
                <SignIn />
                <GoogleAuth />
                <SignUp />
                <VerifyToken />
                <RequestReset />
            </GridStyles>
            {/* <GridStyles>
            </GridStyles> */}
        </div>
        
    )
}
