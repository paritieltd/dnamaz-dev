"use client"
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navigation from "../components/Navbar/Navigation";
import Button from "../components/Button";
export default function LandingPage() {
    return (
      <div className="w-full h-full bg-gradient-to-r from-sky-100 via-white to-sky-100 font-lato">
        {/* <h1>I am not a oy</h1> */}
        <Navigation />
        {/* <Button text="hELLO MY NAMEME" /> */}
        <Hero />
        <Card />
        {/* <h1>I am not a oy</h1> */}
        <Footer />
        {/* <h1>I am not a oy</h1> */}
      </div>
    );
}