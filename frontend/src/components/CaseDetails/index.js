import React, { Component } from "react";
import axios from "axios";
import Server from "../../webConfig";
import Token from "../../bearerToken";

export class Casedetail extends Component {
    componentDidMount = () => {
        const case_id = localStorage.getItem("case_id");
        console.log(case_id);
    };
    render() {
        return (
            <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis beatae, eos facere atque blanditiis facilis sunt
                vitae saepe quod, pariatur similique eum. Quos eaque ullam
                voluptatibus! Ab nihil quibusdam at!
            </div>
        );
    }
}

export default Casedetail;
