import CookieConsent from "react-cookie-consent";

export default function CookieConsentWidget() {
    return <CookieConsent
        location="top"
        buttonText="Got it!"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#FF0000", color: '#ffffff', fontSize: "18px" }}
        buttonStyle={{ color: "#FF0000", fontSize: "18px", backgroundColor: '#ffffff', borderRadius: '5px' }}
        expires={150}
    >
        This website uses cookies to enhance the user experience.
    </CookieConsent>
}