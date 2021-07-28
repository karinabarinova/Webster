import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage(props) {
    const token = props.location.search.split('=')[1];
    if (!token)
        return (<div>
                <p>Sorry, you must supply a token</p>
                <RequestReset />
            </div>)
    return (
        <div>
            <Reset token={token}/>
        </div>
    )
}