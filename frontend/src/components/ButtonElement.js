import styled from "styled-components";
import { Link } from "react-scroll";

export const Button = styled(Link)`
    border-radius: 50px;
    background: #01BF71;
    padding : 12px 30px;
    color : #010606
    white-space: nowrap;
    font-size :20px;
    outline : none;
    cursor:pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    border:none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background : #fff
    }
`;
