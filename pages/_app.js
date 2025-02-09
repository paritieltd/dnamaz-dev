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

      {/* <Script id="tawk" type="text/javascript" name='LSg akjagshdas'> */}

      <Script id="tawk" type="text/javascript" name="LSg akjagshdas">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true
            s1.src='https://embed.tawk.to/62de85bb54f06e12d88b33ac/1g8qjkq5s';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </Script>
    </MembersContext.Provider>
  );
};

export default MyApp;

// 'https://embed.tawk.to/62de85bb54f06e12d88b33ac/1g8qjkq5s'
