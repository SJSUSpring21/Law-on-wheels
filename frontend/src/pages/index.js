import React, { useState } from "react";
import MainSection from "../components/MainSection";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Sidebar from "../components/Sidebar";
import SignUp from "../components/Signup";

const Landing = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <MainSection />
            <Services />
            <SignUp />
        </>
    );
};

export default Landing;
