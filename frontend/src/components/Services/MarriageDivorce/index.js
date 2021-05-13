import React, { Component } from "react";
import "./MarriageDivorce.css";
import Server from "../../../webConfig";
import swal from "sweetalert";
import { Redirect } from "react-router";
import axios from "axios";

export class MarriageDivorce extends Component {
    state = {
        city: "",
        domDay: "",
        domMonth: "",
        domYear: "",
        pomBanquet: "",
        pomCity: "",
        husbandName: "",
        wifeName: "",
        husbandReligion: "",
        wifeReligion: "",
        husbandFatherName: "",
        wifeFatherName: "",
        husbandDob: "",
        wifeDob: "",
        husbandContact: "",
        wifeContact: "",
        husbandEmail: "",
        wifeEmail: "",
        husbandPreResidence: "",
        wifePreResidence: "",
        postResidence: "",
        husbandCurrentResidence: "",
        wifeCurrentResidence: "",
        haveChildren: "",
        settleMaintenance: "",
        settleAssets: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        // const saveRA = axios.post();
        const casesResponse = await axios.post(
            `${Server}/mutualdivorce/create`,
            this.state,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );

        if (casesResponse) {
            swal("", "Submitted Successfully", "success");
            <Redirect to={"/center"} />;
        }
    };

    render() {
        return (
            <>
                <section class="black-bg">
                    <div
                        class="container md-container align-items-center justify-content-center"
                        style={{
                            borderTop: "5px solid #D40436",
                            boxShadow: "0 5px 3px rgba(0,0,0,0.3)",
                            backgroundColor: "#252a36",
                        }}
                    >
                        <div class="row md-header">
                            <div class="col-lg-12 col-md-12">
                                <div class="section-title text-center">
                                    <h2>Mutual Consent Divorce Form</h2>
                                    <p class="md-p">
                                        If both Husband & Wife want divorce and
                                        have decided the terms of separation,
                                        then just fill-in these details below.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div class="row align-items-center justify-content-center">
                                <div class="col-md-8 col-md-offset-2">
                                    <div
                                        id="register-form"
                                        class="register-form"
                                    >
                                        <div class="section-field border-extra ">
                                            <h5>Select your city * </h5>
                                            <div class="field-widget">
                                                <div class="box">
                                                    <select
                                                        class="md-select"
                                                        id="city"
                                                        name="city"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    >
                                                        <option value="Delhi">
                                                            Delhi
                                                        </option>
                                                        <option value="Gurgaon">
                                                            Gurgaon
                                                        </option>
                                                        <option value="Bangalore">
                                                            Bangalore
                                                        </option>
                                                        <option value="Noida">
                                                            Noida
                                                        </option>
                                                        <option value="Ghaziabad">
                                                            Ghaziabad
                                                        </option>
                                                        <option value="Mumbai">
                                                            Mumbai
                                                        </option>
                                                        <option value="Pune">
                                                            Pune
                                                        </option>
                                                        <option value="Hyderabad">
                                                            Hyderabad
                                                        </option>
                                                        <option value="Chennai">
                                                            Chennai
                                                        </option>
                                                        <option value="Other">
                                                            Other
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>Date Of Marriage * </h5>
                                            <div class="row">
                                                <div class="section-field col-md-4">
                                                    <div class="box">
                                                        <select
                                                            class="md-select"
                                                            id="domDay"
                                                            name="domDay"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        >
                                                            <option value="Day">
                                                                Day
                                                            </option>
                                                            <option value="1">
                                                                1
                                                            </option>
                                                            <option value="2">
                                                                2
                                                            </option>
                                                            <option value="3">
                                                                3
                                                            </option>
                                                            <option value="4">
                                                                4
                                                            </option>
                                                            <option value="5">
                                                                5
                                                            </option>
                                                            <option value="6">
                                                                6
                                                            </option>
                                                            <option value="7">
                                                                7
                                                            </option>
                                                            <option value="8">
                                                                8
                                                            </option>
                                                            <option value="9">
                                                                9
                                                            </option>
                                                            <option value="10">
                                                                10
                                                            </option>
                                                            <option value="11">
                                                                11
                                                            </option>
                                                            <option value="12">
                                                                12
                                                            </option>
                                                            <option value="13">
                                                                13
                                                            </option>
                                                            <option value="14">
                                                                14
                                                            </option>
                                                            <option value="15">
                                                                15
                                                            </option>
                                                            <option value="16">
                                                                16
                                                            </option>
                                                            <option value="17">
                                                                17
                                                            </option>
                                                            <option value="18">
                                                                18
                                                            </option>
                                                            <option value="19">
                                                                19
                                                            </option>
                                                            <option value="20">
                                                                20
                                                            </option>
                                                            <option value="21">
                                                                21
                                                            </option>
                                                            <option value="22">
                                                                22
                                                            </option>
                                                            <option value="23">
                                                                23
                                                            </option>
                                                            <option value="24">
                                                                24
                                                            </option>
                                                            <option value="25">
                                                                25
                                                            </option>
                                                            <option value="26">
                                                                26
                                                            </option>
                                                            <option value="27">
                                                                27
                                                            </option>
                                                            <option value="28">
                                                                28
                                                            </option>
                                                            <option value="29">
                                                                29
                                                            </option>
                                                            <option value="30">
                                                                30
                                                            </option>
                                                            <option value="31">
                                                                31
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-4">
                                                    <div class="box">
                                                        <select
                                                            class="md-select"
                                                            id="domMonth"
                                                            name="domMonth"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        >
                                                            <option value="Month">
                                                                Month
                                                            </option>
                                                            <option value="Jan">
                                                                Jan
                                                            </option>
                                                            <option value="Feb">
                                                                Feb
                                                            </option>
                                                            <option value="Mar">
                                                                Mar
                                                            </option>
                                                            <option value="Apr">
                                                                Apr
                                                            </option>
                                                            <option value="May">
                                                                May
                                                            </option>
                                                            <option value="Jun">
                                                                Jun
                                                            </option>
                                                            <option value="Jul">
                                                                Jul
                                                            </option>
                                                            <option value="Aug">
                                                                Aug
                                                            </option>
                                                            <option value="Sep">
                                                                Sep
                                                            </option>
                                                            <option value="Oct">
                                                                Oct
                                                            </option>
                                                            <option value="Nov">
                                                                Nov
                                                            </option>
                                                            <option value="Dec">
                                                                Dec
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-4">
                                                    <div class="field-widget">
                                                        <input
                                                            type="text"
                                                            class="form-control md-input"
                                                            placeholder="Year"
                                                            id="domYear"
                                                            name="domYear"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>Place of Marriage</h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>
                                                        Name of Banquet Hall *
                                                    </label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="pomBanquet"
                                                            type="text"
                                                            id=""
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>City name *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="pomCity"
                                                            type="text"
                                                            id="pomCity"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Need the name of Husband and
                                                Wife
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>
                                                        HUSBAND NAME *
                                                    </label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandName"
                                                            type="text"
                                                            id="husbandName"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>WIFE NAME *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeName"
                                                            type="text"
                                                            id="wifeName"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>Mention your religion</h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandReligion"
                                                            type="text"
                                                            id="husbandReligion"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeReligion"
                                                            type="text"
                                                            id="wifeReligion"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Please enter the Father’s name
                                                of the Husband & Wife
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandFatherName"
                                                            type="text"
                                                            id="husbandFatherName"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeFatherName"
                                                            type="text"
                                                            id="wifeFatherName"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Date of Birth is required for
                                                both the parties
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandDob"
                                                            type="Date"
                                                            id="husbandDob"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeDob"
                                                            type="Date"
                                                            id="wifeDob"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Please share your contact
                                                numbers
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandContact"
                                                            type="number"
                                                            id="husbandContact"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeContact"
                                                            type="number"
                                                            id="wifeContact"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Please share your email address
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandEmail"
                                                            type="email"
                                                            id="husbandEmail"
                                                            class="form-control md-input"
                                                            placeholder="your email id"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeEmail"
                                                            type="email"
                                                            id="wifeEmail"
                                                            class="form-control md-input"
                                                            placeholder="your spouse email id"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Please provide us your residence
                                                address before marriage
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandPreResidence"
                                                            type="text"
                                                            id="husbandPreResidence"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifePreResidence"
                                                            type="text"
                                                            id="wifePreResidence"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Post-marriage address (where
                                                parties resided together after
                                                marriage) *{" "}
                                            </h5>
                                            <div class="field-widget">
                                                <input
                                                    name="postResidence"
                                                    type="text"
                                                    id="postResidence"
                                                    class="form-control md-input"
                                                    placeholder="Your answer"
                                                    required
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Please share your present
                                                address
                                            </h5>
                                            <div class="row">
                                                <div class="section-field col-md-6">
                                                    <label>Husband *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="husbandCurrentResidence"
                                                            type="text"
                                                            id="husbandCurrentResidence"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div class="section-field col-md-6">
                                                    <label>Wife *</label>
                                                    <div class="field-widget">
                                                        <input
                                                            name="wifeCurrentResidence"
                                                            type="text"
                                                            id="wifeCurrentResidence"
                                                            class="form-control md-input"
                                                            placeholder="Your answer"
                                                            required
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>Do you have children? *</h5>
                                            <div class="box">
                                                <select
                                                    name="haveChildren"
                                                    id="haveChildren"
                                                    class="md-select"
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="Yes">
                                                        Yes
                                                    </option>
                                                    <option value="No">
                                                        No
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Need settlement regarding
                                                Maintenance/Alimony{" "}
                                            </h5>
                                            <div class="box">
                                                <select
                                                    name="settleMaintenance"
                                                    id="settleMaintenance"
                                                    class="md-select"
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="Yes">
                                                        Yes
                                                    </option>
                                                    <option
                                                        selected="selected"
                                                        value="No"
                                                    >
                                                        No
                                                    </option>
                                                    <option value="No">
                                                        Maybe
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="section-field border-extra ">
                                            <h5>
                                                Need settlement regarding joint
                                                assets{" "}
                                            </h5>
                                            <div class="box">
                                                <select
                                                    name="settleAssets"
                                                    id="settleAssets"
                                                    class="md-select"
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="Yes">
                                                        Yes
                                                    </option>
                                                    <option
                                                        selected="selected"
                                                        value="No"
                                                    >
                                                        No
                                                    </option>
                                                    <option value="No">
                                                        Maybe
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Submit Your Details"
                                        class="md-button btn btn-success"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </>
        );
    }
}

export default MarriageDivorce;
