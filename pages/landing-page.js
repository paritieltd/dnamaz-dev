"use client"
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar/Navigation";
import Button from "../components/Button";
export default function LandingPage() {
    return (
      // <div className="w-full flex flex-col gap-[10rem] h-full bg-gradient-to-r from-[#DDFFF7]  via-[#DDEFFF]  to-[#DDEFFF] font-lato">
      <div className="w-full flex flex-col gap-[10rem] h-full bg-[linear-gradient(to_right,#DDFFF7,#FAFFF8,#FAFFF8,#FBFFFA,#DDEFFF)] font-lato">
        {/* <h1>I am not a oy</h1> */}
        <Navigation />
        {/* <Button text="hELLO MY NAMEME" / > */}
        <Hero />
        <Card />
        {/* <h1>I am not a oy</h1> */}
        <Footer />
        {/* <h1>I am not a oy</h1> */}
      </div>
    );
}