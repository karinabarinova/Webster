import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet

export default function FeedbackWidget() {
    return <Feedback 
        projectId="60f9502d79fbfe00047ad478"
        email={true} 
        emailRequired={false}
        postSubmitButtonMsg={"Thanks for sharing!"}
        projectName="Webster"
        primaryColor="#6C63FF"
    />;
}

