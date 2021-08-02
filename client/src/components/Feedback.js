import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet
import { useTranslation } from 'react-i18next';

export default function FeedbackWidget() {
    const { t } = useTranslation('common');

    return <Feedback 
        projectId="60f9502d79fbfe00047ad478"
        email={true} 
        emailRequired={false}
        postSubmitButtonMsg={t("THANKS")}
        projectName="Webster"
        primaryColor="#6C63FF"
        submitButtonMsg	={t("SEND_FEEDBACK")}
    />;
}

