import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import Testimonials from "../../components/landing/Testimonials";
import CtaBand from "../../components/landing/CtaBand";
import GlobalStyles from "../../styles/GlobalStyles";

export default function LandingPage() {
    useEffect(() => {
        document.title = "Genie — Study smarter with AI";
    }, []);

    return (
        <div className="min-h-screen bg-white font-body antialiased">
            <GlobalStyles />
            <Navbar />
            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <Testimonials />
                <CtaBand />
            </main>
            <Footer />
        </div>
    );
}