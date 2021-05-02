import React, { useState } from "react";
import MainNavbar from "../components/MainNavbar";
import MainSection from "../components/MainSection";
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
            <MainNavbar toggle={toggle} />
            <MainSection />
            <Services />
            <SignUp />
        </>
    );
};

export default Landing;
