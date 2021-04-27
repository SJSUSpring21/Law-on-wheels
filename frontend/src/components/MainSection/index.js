import React, { useState } from "react";
import Image from "../../images/law.jpg";
import { Button } from "../ButtonElement";
import {
    MainContainer,
    MainBg,
    VideoBg,
    MainContent,
    MainBtnWrapper,
    MainH1,
    MainP,
    ArrowForward,
    ArrowRight,
} from "./MainElements";
const MainSection = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };
    return (
        <MainContainer>
            <MainBg>
                <VideoBg autoplay loop muted src={Image} type="image" />
            </MainBg>
            <MainContent>
                <MainH1>Law Services Made Easy</MainH1>
                <MainP>
                    Sign up for a new account and get law services on your
                    mobile.
                </MainP>
                <MainBtnWrapper>
                    <Button
                        to="signup"
                        onMouseEnter={onHover}
                        onMouseLeave={onHover}
                        primary="true"
                        dark="true"
                        big="true"
                    >
                        Get started {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </MainBtnWrapper>
            </MainContent>
        </MainContainer>
    );
};

export default MainSection;
