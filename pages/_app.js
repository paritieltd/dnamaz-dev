import Script from "next/script";
import "../styles/globals.css";
import { createContext } from "react";
import "aos/dist/aos.css";
import {
  boardMembers,
  shariaAdvisers,
  teamMembers,
} from "../datas/MembersData";
import { FaWhatsapp } from "react-icons/fa";

export const MembersContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  return (
    <MembersContext.Provider
      value={{ boardMembers, teamMembers, shariaAdvisers }}
    >
      <Component {...pageProps} />

      {/* WhatsApp Chat Button Script */}
      <a
        href="https://wa.me/2349164441444?text=Hello%2C%20I%20would%20like%20to%20ask%20some%20questions."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#25D366",
          color: "#fff",
          padding: "12px",
          borderRadius: "50%",
          fontSize: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 9999,
        }}
      >
        <FaWhatsapp size={20} />
      </a>
    </MembersContext.Provider>
  );
};

export default MyApp;
