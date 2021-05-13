import React, { Component } from "react";
import note from "../../../../images/100.jpg";

export class PreviewRA extends Component {
    next = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    previous = (e) => {
        e.preventDefault();
        this.props.previousStep();
    };

    render() {
        const { values, handleChange, handleSubmit, getState } = this.props;
        const state = getState();
        console.log(state);
        const {
            landlord_fullname,
            landlord_number,
            landlord_email,
            landlord_state,
            landlord_city,
            landlord_stamp,
            tenant_fullname,
            tenant_parentname,
            tenant_number,
            tenant_email,
            tenant_address,
            floor,
            bhk,
            house_number,
            property_address,
            property_locality,
            property_pincode,
            agreement_start_date,
            monthly_rent,
            security_amount,
            notice_period,
            rent_increment_percent,
        } = state;
        return (
            <>
                <div className="ra-preview">
                    <center>
                        <h1>Agreement Preview</h1>
                        <img
                            src={note}
                            alt="Agreement"
                            width="700"
                            height="350"
                        />
                        <h4 style={{ textDecoration: "underline" }}>
                            LEASE DEED
                        </h4>
                    </center>
                    <div
                        style={{
                            display: "table",
                            margin: "0 auto",
                            maxWidth: "700px",
                            lineHeight: "150%",
                        }}
                    >
                        <ol>
                            <li>
                                Property Address:{" "}
                                <strong>{property_address}</strong>
                            </li>
                            <li>
                                Rent: Rs <strong>{monthly_rent}</strong> per
                                month from{" "}
                                <strong>{agreement_start_date}</strong>
                            </li>
                            <li>
                                Security Amount: Rs{" "}
                                <strong>{security_amount}</strong>
                            </li>
                            <li>
                                Electricity/Water Charges: As per Meters payable
                                as per the billing cycle before due dates
                            </li>
                        </ol>
                        <p>
                            This Lease Deed/Rent Agreement is executed at{" "}
                            <strong>{landlord_state}</strong> on{" "}
                            <strong>{agreement_start_date}</strong>.
                        </p>
                        <center>
                            <h4>Between</h4>
                        </center>
                        <p>
                            Mr./Mrs.<strong>{landlord_fullname}</strong> R/o{" "}
                            <strong>{landlord_city}</strong>
                            (Hereinafter called the Lessor and/ or the First
                            Party)
                        </p>
                        <center>
                            <h4>And</h4>
                        </center>
                        <p>
                            1.Mr./Mrs. <strong>{tenant_fullname}</strong> So/Do
                            Mr. <strong>{tenant_parentname}</strong> R/o{" "}
                            <strong>{tenant_address}</strong> (Hereinafter
                            called the Second Party)
                        </p>
                        <p>
                            Whereas the Lessor is the lawful owner in possession
                            of the premises located at{" "}
                            <strong>{property_address}</strong>(hereinafter
                            called the 'demised premises'). The expression
                            Lessor and Lessee shall mean and include their
                            respective heirs, successors, representatives, and
                            assignees.
                        </p>
                        <p>
                            Whereas on the request of the Lessee, the Lessor has
                            agreed to let out the said demised premises to the
                            LESSEE, and the LESSEE has agreed to take it on rent
                            w.e.f.<strong>{agreement_start_date}</strong> for
                            its bonafide residential use. Whereas the LESSOR has
                            represented that the said demised premises is free
                            from all encumbrances and the LESSOR has a clean and
                            unrestricted right to the said demised premises.
                            Whereas the Lessor and Lessee both represented that
                            they are legally competent to enter into this Lease
                            Agreement on the terms conditions contained herein.
                        </p>
                        <p>Now, these present witnesses as under:</p>
                        <ol>
                            <li>
                                That the second party shall pay the monthly rent
                                of <strong>{monthly_rent}</strong> in respect of
                                the demised premises located at{" "}
                                <strong>{property_address}</strong> The rent
                                shall be paid per month in advance through
                                advance rental on or before the4day of each
                                English calendar month. In case of TDS
                                deduction, the Lessee shall furnish the TDS
                                certificate to the Lessor at the end of each
                                calendar quarter well within time so as to
                                enable the Lessor to file his income tax return
                                within the stipulated timeframe. Each of the
                                parties will bear the consequences for any
                                non-compliance on account of the tax liability
                                of its part.
                            </li>
                            <li>
                                That the second party has deposited a sum of Rs{" "}
                                <strong>{security_amount}</strong> as interest
                                free refundable security deposit, which will be
                                refunded (Interest Free) at the time of vacating
                                the demised premises after deducting any
                                outstanding rent, electricity, water, sewerage
                                and maintenance charges, bills, etc., if any,
                                which are payable by the Lessee at the time of
                                vacating the demised premises. Lessee shall have
                                the right to adjust all the dues including but
                                not limited to rent, maintenance, electricity,
                                water, sewerage, etc. of the notice period from
                                the Refundable Security deposit.
                            </li>
                            <li>
                                That the electricity and water charges will be
                                paid timely regularly every month by the Lessee
                                as per actual bills provided by the service
                                provider. A copy of the payment receipts will be
                                provided by the Lessee to the Lessor on demand.
                            </li>
                            <li>
                                That the Lessor shall hand over the premises to
                                the Lessee in a habitable condition.
                            </li>
                            <li>
                                That in case any damage is caused by the LESSEE
                                to the aforesaid premises, fixtures, fittings,
                                etc.(except normal wear and tear), the LESSEE
                                shall be liable to make good the same to ensure
                                that those is restored in the same condition as
                                they were at the time of signing of this lease
                                other than the changes made by the LESSEE with
                                the consent of the LESSOR. In case of LESSEE
                                fails to do so, LESSOR shall be entitled to
                                deduct the costs of doing the same from the
                                interest free security deposit.
                            </li>
                            <li>
                                That the Second Party shall have no right, to
                                make any addition, alteration in the said
                                demised premises except furnishings. The Lessor
                                shall not be liable to pay any charges against
                                the expenses incurred by the Lessee for any
                                additional furnishing at the demised premises.
                            </li>
                            <li>
                                That the Second Party shall have no right to
                                sub-let the whole or part of demised premises to
                                any other person or entity at any time. Further,
                                The Lessor or his authorized representative has
                                the right to visit the demised premises on any
                                working day during business hours after taking
                                the Lessee’s permission.
                            </li>
                            <li>
                                That the demised premises shall be used by the
                                Lessee in a cordial and civilized manner without
                                causing any nuisance or disturbance to the other
                                occupants of the building complex. The Lessee
                                shall use the demised premises for its bonafide
                                legal purposes and shall not do or cause any
                                actions or activities of illegal, immoral,
                                unsocial nature in the said demised premises and
                                will not create any nuisance to the neighborhood
                                in any manner whatsoever.
                            </li>
                            <li>
                                That day-to-day repair such as fuses, leakage of
                                water taps, replacement of defective MCBs,
                                Bulbs, Tube lights, Tube light Fittings,
                                connecting sanitary pipes, doors, door locks,
                                etc. shall be done by the Lessee at its own
                                costs. However, major repairs such as leakage
                                from the wall/ceiling, etc. would be rectified
                                by the Lessor on the request of Lessee.
                            </li>
                            <li>
                                That in case the Lessee defaults in payment of
                                rent for any month or commits any breach of any
                                of the terms and conditions of this deed, the
                                LESSOR shall be entitled to get back the
                                possession of the demised premises after
                                providing reasonable notice to the Lessee.
                            </li>
                            <li>
                                That the Lessee shall make sure that all the
                                payments have been made on regular basis by them
                                to the Service Providers or Government
                                Authorities on account of any services utilized
                                by them or taxes/levies demanded by or payable
                                to Government Authorities on account of their
                                transactions. The Lessee shall be liable at all
                                times even after vacation of the said commercial
                                space for dues if any arising of the tenure of
                                occupation of the Lessee which is liable to be
                                paid by the Lessee.
                            </li>
                            <li>
                                That any outstanding amount towards rental or
                                maintenance, if not settled by the Lessee, will
                                be adjusted from the security deposit of Rs{" "}
                                <strong>{security_amount}</strong> provided to
                                the LESSOR. The notice period to be served by
                                either party would be of <strong>{"1"}</strong>{" "}
                                Month. Either the LESSOR or the LESSEE may
                                terminate this agreement without assigning any
                                reasons whatsoever by giving three month’s
                                advance notice to the other party.
                            </li>
                            <li>
                                The Lessor will ensure that all outstanding
                                bills/ charges on the above said demised
                                premises on account of electricity, water, and
                                any other incidentals prior to the start of
                                lease from{" "}
                                <strong>{agreement_start_date}</strong> are
                                settled and paid. Any payment on account of the
                                above pertaining to the period before the start
                                of lease w.e.f.{" "}
                                <strong>{agreement_start_date}</strong> will be
                                settled by the Lessor. In the unlikely instance
                                that the connection/s for electricity or water
                                is disconnected due to non- payment or
                                negligence of the LESSEE, the charges to
                                restoring such connections shall be borne fully
                                by the LESSEE and if not paid the same can be
                                deducted from the security deposit provided to
                                the Lessor.
                            </li>
                            <li>
                                That after the expiry of this Lease Deed, if the
                                LESSOR does not wish to renew it or to continue
                                further, the Lessee is bound to vacate the
                                demised premises immediately upon expiry of the
                                lease to the Lessor in all good faith and
                                handover the peaceful possession to the Lessor
                                failing which the Lessee will pay damages at the
                                rate of double the monthly rent as stipulated in
                                this Deed.
                            </li>
                            <li>
                                That the Lessor/ his authorized agents shall
                                acknowledge and give valid & duly stamped
                                receipts as and when requested by the LESSEE as
                                conclusive proof of rent payments on demand from
                                the Lessee. The registration charges and stamp
                                duty expenses will be shared by both parties in
                                an equal ratio.
                            </li>
                            <li>
                                It is further agreed between the parties that in
                                case of any dispute the{" "}
                                <strong>{landlord_state}</strong> court shall
                                have the exclusive jurisdiction over the
                                disputes.
                            </li>
                            <li>
                                This Deed shall be governed by and interpreted
                                in accordance with the laws of India. All
                                disputes, differences, disagreements,
                                controversies or claims arising out of or in
                                connection with this Deed, including the
                                validity, effect, and interpretation thereof,
                                shall, at the request of either party, be
                                referred to the sole arbitrator mutually
                                appointed by both the parties, who shall conduct
                                the arbitration proceedings in English and in
                                accordance with the provisions of the
                                Arbitration and Conciliation Act, 1996, or any
                                amendment or statutory modification or
                                replacement/substitution thereof. Any award made
                                by the arbitrator shall be final and binding on
                                the Parties. The cost and expenses of the
                                arbitration proceedings, including fees of the
                                arbitrators, shall be borne equally by the
                                Parties. The venue of arbitration shall be as
                                mutually decided by the parties.
                            </li>
                            <li>
                                Without any prejudice to a Party’s other rights
                                and claims under this Lease or otherwise, if one
                                party breaches any of its representations,
                                obligations, warranties, covenants or
                                undertakings or violates any provision
                                hereunder, it shall indemnify and keep the other
                                Party and/or service providers harmless against
                                all direct damages and costs suffered or borne
                                by it/them thereby including but not limited to
                                costs incurred in defending all claims/actions,
                                or proceedings that may arise or may be
                                otherwise necessary to ensure exclusive, quiet
                                and peaceful access, occupation and use of the
                                Leased Premises in accordance with this Deed.
                                Without prejudice to other rights enjoyed by
                                either Party (non- defaulting Party) under the
                                Deed and Applicable Laws, the other Party
                                (Defaulting Party) shall be responsible for and
                                will indemnify against all claims, demands,
                                suits, proceedings, judgments, direct damage,
                                and relevant costs that the non-defaulting Party
                                may suffer or incur in connection with loss of
                                life and/or personal injury to the occupants of
                                the Leased Premises and/or damage to the
                                Building if the same arise from any
                                wrongful/negligent act or omission of the
                                defaulting Party.
                            </li>
                            <li>
                                Force Majeure: If the whole or any part of the
                                said Premises shall at any time during the term
                                of the lease be destroyed or damaged due to any
                                force majeure circumstances including storm,
                                tempest, flood, Act of God, an act of terrorism,
                                war or any other irresistible force or the
                                Lessee is deprived of the use of the said
                                Premises for reasons not attributable to the
                                Lessee, the Lessor hereby undertakes to restore
                                the said Premises as expeditiously as possible
                                or, as the case may be, to remove the impediment
                                in its use and occupation as expeditiously as
                                possible. Notwithstanding the foregoing, upon
                                the happening of any such event as aforesaid,
                                the Lessee shall not be liable to pay Lease Rent
                                during the period the Lessee is deprived of the
                                use of the said Premises or any part thereof.
                                The Lessee shall also have the option to
                                terminate the Lease after the event by giving
                                one month’s notice and without payment of any
                                rent in lieu thereof and without incurring any
                                liability to pay any other amount whatsoever to
                                the Lessor.
                            </li>
                            <li>
                                Notice: Any notice or communication to be
                                addressed by one party to the other shall be in
                                writing and shall be served at the addresses as
                                given hereinabove by registered post with A/D or
                                at such other addresses as may be notified in
                                writing by one party to another. Any change in
                                such address shall be promptly notified to the
                                other party in writing.
                            </li>
                            <li>
                                Miscellaneous:
                                <ol>
                                    <li>
                                        This Lease Agreement constitutes the
                                        entire agreement concerning the subject
                                        matter hereof between the Lessor and the
                                        Lessee and supersedes any prior
                                        representations or agreements, whether
                                        written or oral between the Lessor and
                                        Lessee. No modification or amendment of
                                        this Agreement or waiver of any of its
                                        provisions shall be binding upon the
                                        parties hereto unless made in writing
                                        and duly signed by both Parties.
                                    </li>
                                    <li>
                                        If any provision of this Agreement is
                                        held to be unenforceable, the remaining
                                        provisions of this Agreement shall
                                        continue to remain in full force and
                                        effect.
                                    </li>
                                    <li>
                                        Leegality is the e-witness to this
                                        rental agreement.
                                    </li>
                                </ol>
                            </li>
                        </ol>
                        <p>Signature of the Lessor / First Party</p>
                        <p>Signature of the Lessee / Second Party</p>
                    </div>
                    <div className="ra-btn-container">
                        <button className="next-btn" onClick={this.previous}>
                            Print
                        </button>
                        <button className="next-btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default PreviewRA;
