import React from "react";
import { Link } from "react-router";
import Icon1 from "../../images/1.svg";
import Icon5 from "../../images/5.svg";
import Icon3 from "../../images/3.svg";
import Icon4 from "../../images/4.svg";
import {
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesH2,
    ServicesIcon,
    ServicesP,
} from "./ServicesElements";

const Services = () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon5} />
                    <ServicesH2>Marriage Divorce</ServicesH2>
                    <ServicesP>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon1} />
                    <ServicesH2>Consumer Court</ServicesH2>
                    <ServicesP>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon4} />
                    <ServicesH2>Rent Agreement</ServicesH2>
                    <ServicesP>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3} />
                    <ServicesH2>Name Change</ServicesH2>
                    <ServicesP>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </ServicesP>
                </ServicesCard>
            </ServicesWrapper>
        </ServicesContainer>
    );
};

export default Services;
