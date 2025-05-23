import Script from "next/script";
import "../styles/globals.css";
import { createContext } from "react";
import "aos/dist/aos.css";
import {
  boardMembers,
  shariaAdvisers,
  teamMembers,
} from "../datas/MembersData";

export const MembersContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  return (
    <MembersContext.Provider
      value={{ boardMembers, teamMembers, shariaAdvisers }}
    >
      <Component {...pageProps} />

      {/* WhatsApp Chat Button Script */}
      <Script id="whatsapp" type="text/javascript">
        {`
          (function() {
            var whatsappLink = 'https://wa.me/2349164441444?text=Hello%2C%20I%20would%20like%20to%20ask%20some%20questions.';
            var chatButton = document.createElement("a");
            chatButton.href = whatsappLink;
            chatButton.target = "_blank";
            chatButton.style.position = "fixed";
            chatButton.style.bottom = "20px";
            chatButton.style.right = "20px";
            chatButton.style.background = "#25D366";
            chatButton.style.color = "#fff";
            chatButton.style.padding = "10px 20px";
            chatButton.style.borderRadius = "50px";
            chatButton.style.fontSize = "16px";
            chatButton.style.textDecoration = "none";
            chatButton.innerText = "Chat on WhatsApp";
            document.body.appendChild(chatButton);
          })();
        `}
      </Script>
    </MembersContext.Provider>
  );
};

export default MyApp;
