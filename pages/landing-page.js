"use client"
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar/Navigation";
import Button from "../components/Button";

export default function LandingPage() {
    return (
      <div className="w-full flex flex-col max-md:gap-[3rem] max-lg:gap-[2rem] lg:gap-[10rem] h-full bg-[linear-gradient(to_right,#DDFFF7,#FAFFF8,#FAFFF8,#FBFFFA,#DDEFFF)] font-lato">
        <Navigation />
        {/* <Button text="hELLO MY NAMEME" /> */}
        <Hero />
        <Card />
        <Footer />
      </div>
    );
}