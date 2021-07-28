import CookieConsent from "react-cookie-consent";

export default function CookieConsentWidget() {
    return <CookieConsent
        location="top"
        buttonText="Got it!"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#6C63FF", color: '#ffffff', fontSize: "18px" }}
        buttonStyle={{ color: "#6C63FF", fontSize: "18px", backgroundColor: '#ffffff', borderRadius: '5px' }}
        expires={150}
    >
        This website uses cookies to enhance the user experience.
    </CookieConsent>
}