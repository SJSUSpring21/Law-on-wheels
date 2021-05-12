import React, { Component } from "react";

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
                    <div className="ra-window">
                        {landlord_fullname}
                        LEASE DEED Property Address: Flat no: 11,
                        csaascecowkckmclasmcklmlk, mlkmcs, 390009. Bilaspur,
                        Chhattisgarh (House type - 3 BHK, Floor no: 0) Rent: Rs
                        10000 per month from 6/5/2021 Period of Lease: Eleven
                        (11) months (6/5/2021 to 6/4/2022) Security Amount: Rs
                        10000 Electricity/Water Charges: As per Meters payable
                        as per the billing cycle before due dates Escalation
                        after expiry: 1 % This Lease Deed/Rent Agreement is
                        executed atBilaspur on day4 of May 2021. Between
                        Mr./Mrs. Rakesh RanjanSo/Do Mr. RakeshR/o XYZ
                        (Hereinafter called the Lessor and/ or the First Party)
                        And 1.)Mr./Mrs. acascsaSo/Do Mr. sacasascR/o
                        sacascascknsajncjksancjsankjcnascjkasnc (Hereinafter
                        called the Second Party)) Whereas the Lessor is the
                        lawful owner in possession of the premises located
                        atFlat no: 11, csaascecowkckmclasmcklmlk, mlkmcs,
                        390009. Bilaspur, Chhattisgarh (House type - 3 BHK,
                        Floor no: 0)(hereinafter called the 'demised premises').
                        The expression Lessor and Lessee shall mean and include
                        their respective heirs, successors, representatives, and
                        assignees. Whereas on the request of the Lessee, the
                        Lessor has agreed to let out the said demised premises
                        to the LESSEE, and the LESSEE has agreed to take it on
                        rent w.e.f.6/5/2021for its bonafide residential use.
                        Whereas the LESSOR has represented that the said demised
                        premises is free from all encumbrances and the LESSOR
                        has a clean and unrestricted right to the said demised
                        premises. Whereas the Lessor and Lessee both represented
                        that they are legally competent to enter into this Lease
                        Agreement on the terms conditions contained herein. Now,
                        these present witnesses as under: That the second party
                        shall pay the monthly rent ofRs 10000in respect of the
                        demised premises located atFlat no: 11,
                        csaascecowkckmclasmcklmlk, mlkmcs, 390009. Bilaspur,
                        Chhattisgarh (House type - 3 BHK, Floor no: 0)The rent
                        shall be paid per month in advance through advance
                        rental on or before the2day of each English calendar
                        month. In case of TDS deduction, the Lessee shall
                        furnish the TDS certificate to the Lessor at the end of
                        each calendar quarter well within time so as to enable
                        the Lessor to file his income tax return within the
                        stipulated timeframe. Each of the parties will bear the
                        consequences for any non-compliance on account of the
                        tax liability of its part. That the second party has
                        deposited a sum ofRs 10000as interest free refundable
                        security deposit, which will be refunded (Interest Free)
                        at the time of vacating the demised premises after
                        deducting any outstanding rent, electricity, water,
                        sewerage and maintenance charges, bills, etc., if any,
                        which are payable by the Lessee at the time of vacating
                        the demised premises. Lessee shall have the right to
                        adjust all the dues including but not limited to rent,
                        maintenance, electricity, water, sewerage, etc. of the
                        notice period from the Refundable Security deposit. That
                        the electricity and water charges will be paid timely
                        regularly every month by the Lessee as per actual bills
                        provided by the service provider. A copy of the payment
                        receipts will be provided by the Lessee to the Lessor on
                        demand. That the Lessor shall hand over the premises to
                        the Lessee in a habitable condition. The detailed list
                        of items provided as part of this lease is enumerated as
                        ANNEXURE 1 to this Deed. That in case any damage is
                        caused by the LESSEE to the aforesaid premises,
                        fixtures, fittings, etc.(except normal wear and tear),
                        the LESSEE shall be liable to make good the same to
                        ensure that those is restored in the same condition as
                        they were at the time of signing of this lease other
                        than the changes made by the LESSEE with the consent of
                        the LESSOR. In case of LESSEE fails to do so, LESSOR
                        shall be entitled to deduct the costs of doing the same
                        from the interest free security deposit. That after the
                        expiry of the monthly rent shall be increased at the
                        escalation of1 %or at mutually agreed by both parties at
                        the time of renewal in the discussion as per prevailing
                        market conditions. That the Second Party shall have no
                        right, to make any addition, alteration in the said
                        demised premises except furnishings. The Lessor shall
                        not be liable to pay any charges against the expenses
                        incurred by the Lessee for any additional furnishing at
                        the demised premises. That the Second Party shall have
                        no right to sub-let the whole or part of demised
                        premises to any other person or entity at any time.
                        Further, The Lessor or his authorized representative has
                        the right to visit the demised premises on any working
                        day during business hours after taking the Lessee’s
                        permission. That the demised premises shall be used by
                        the Lessee in a cordial and civilized manner without
                        causing any nuisance or disturbance to the other
                        occupants of the building complex. The Lessee shall use
                        the demised premises for its bonafide legal purposes and
                        shall not do or cause any actions or activities of
                        illegal, immoral, unsocial nature in the said demised
                        premises and will not create any nuisance to the
                        neighborhood in any manner whatsoever. That day-to-day
                        repair such as fuses, leakage of water taps, replacement
                        of defective MCBs, Bulbs, Tube lights, Tube light
                        Fittings, connecting sanitary pipes, doors, door locks,
                        etc. shall be done by the Lessee at its own costs.
                        However, major repairs such as leakage from the
                        wall/ceiling, etc. would be rectified by the Lessor on
                        the request of Lessee. That in case the Lessee defaults
                        in payment of rent for any month or commits any breach
                        of any of the terms and conditions of this deed, the
                        LESSOR shall be entitled to get back the possession of
                        the demised premises after providing reasonable notice
                        to the Lessee. That the Lessee shall make sure that all
                        the payments have been made on regular basis by them to
                        the Service Providers or Government Authorities on
                        account of any services utilized by them or taxes/levies
                        demanded by or payable to Government Authorities on
                        account of their transactions. The Lessee shall be
                        liable at all times even after vacation of the said
                        commercial space for dues if any arising of the tenure
                        of occupation of the Lessee which is liable to be paid
                        by the Lessee. That any outstanding amount towards
                        rental or maintenance, if not settled by the Lessee,
                        will be adjusted from the security deposit ofRs
                        10000provided to the LESSOR. The notice period to be
                        served by either party would be of2 Month. Either the
                        LESSOR or the LESSEE may terminate this agreement
                        without assigning any reasons whatsoever by giving two
                        month’s advance notice to the other party. The Lessor
                        will ensure that all outstanding bills/ charges on the
                        above said demised premises on account of electricity,
                        water, and any other incidentals prior to the start of
                        lease from6/5/2021are settled and paid. Any payment on
                        account of the above pertaining to the period before the
                        start of lease w.e.f.6/5/2021will be settled by the
                        Lessor. In the unlikely instance that the connection/s
                        for electricity or water is disconnected due to non-
                        payment or negligence of the LESSEE, the charges to
                        restoring such connections shall be borne fully by the
                        LESSEE and if not paid the same can be deducted from the
                        security deposit provided to the Lessor. That after the
                        expiry of this Lease Deed, if the LESSOR does not wish
                        to renew it or to continue further, the Lessee is bound
                        to vacate the demised premises immediately upon expiry
                        of the lease to the Lessor in all good faith and
                        handover the peaceful possession to the Lessor failing
                        which the Lessee will pay damages at the rate of double
                        the monthly rent as stipulated in this Deed. That the
                        Lessor/ his authorized agents shall acknowledge and give
                        valid & duly stamped receipts as and when requested by
                        the LESSEE as conclusive proof of rent payments on
                        demand from the Lessee. The registration charges and
                        stamp duty expenses will be shared by both parties in an
                        equal ratio. It is further agreed between the parties
                        that in case of any dispute the Bilaspur court shall
                        have the exclusive jurisdiction over the disputes. This
                        Deed shall be governed by and interpreted in accordance
                        with the laws of India. All disputes, differences,
                        disagreements, controversies or claims arising out of or
                        in connection with this Deed, including the validity,
                        effect, and interpretation thereof, shall, at the
                        request of either party, be referred to the sole
                        arbitrator mutually appointed by both the parties, who
                        shall conduct the arbitration proceedings in English and
                        in accordance with the provisions of the Arbitration and
                        Conciliation Act, 1996, or any amendment or statutory
                        modification or replacement/substitution thereof. Any
                        award made by the arbitrator shall be final and binding
                        on the Parties. The cost and expenses of the arbitration
                        proceedings, including fees of the arbitrators, shall be
                        borne equally by the Parties. The venue of arbitration
                        shall be as mutually decided by the parties. Without any
                        prejudice to a Party’s other rights and claims under
                        this Lease or otherwise, if one party breaches any of
                        its representations, obligations, warranties, covenants
                        or undertakings or violates any provision hereunder, it
                        shall indemnify and keep the other Party and/or service
                        providers harmless against all direct damages and costs
                        suffered or borne by it/them thereby including but not
                        limited to costs incurred in defending all
                        claims/actions, or proceedings that may arise or may be
                        otherwise necessary to ensure exclusive, quiet and
                        peaceful access, occupation and use of the Leased
                        Premises in accordance with this Deed. Without prejudice
                        to other rights enjoyed by either Party (non- defaulting
                        Party) under the Deed and Applicable Laws, the other
                        Party (Defaulting Party) shall be responsible for and
                        will indemnify against all claims, demands, suits,
                        proceedings, judgments, direct damage, and relevant
                        costs that the non-defaulting Party may suffer or incur
                        in connection with loss of life and/or personal injury
                        to the occupants of the Leased Premises and/or damage to
                        the Building if the same arise from any
                        wrongful/negligent act or omission of the defaulting
                        Party. Force Majeure: If the whole or any part of the
                        said Premises shall at any time during the term of the
                        lease be destroyed or damaged due to any force majeure
                        circumstances including storm, tempest, flood, Act of
                        God, an act of terrorism, war or any other irresistible
                        force or the Lessee is deprived of the use of the said
                        Premises for reasons not attributable to the Lessee, the
                        Lessor hereby undertakes to restore the said Premises as
                        expeditiously as possible or, as the case may be, to
                        remove the impediment in its use and occupation as
                        expeditiously as possible. Notwithstanding the
                        foregoing, upon the happening of any such event as
                        aforesaid, the Lessee shall not be liable to pay Lease
                        Rent during the period the Lessee is deprived of the use
                        of the said Premises or any part thereof. The Lessee
                        shall also have the option to terminate the Lease after
                        the event by giving one month’s notice and without
                        payment of any rent in lieu thereof and without
                        incurring any liability to pay any other amount
                        whatsoever to the Lessor. Notice: Any notice or
                        communication to be addressed by one party to the other
                        shall be in writing and shall be served at the addresses
                        as given hereinabove by registered post with A/D or at
                        such other addresses as may be notified in writing by
                        one party to another. Any change in such address shall
                        be promptly notified to the other party in writing.
                        Miscellaneous: This Lease Agreement constitutes the
                        entire agreement concerning the subject matter hereof
                        between the Lessor and the Lessee and supersedes any
                        prior representations or agreements, whether written or
                        oral between the Lessor and Lessee. No modification or
                        amendment of this Agreement or waiver of any of its
                        provisions shall be binding upon the parties hereto
                        unless made in writing and duly signed by both Parties.
                        If any provision of this Agreement is held to be
                        unenforceable, the remaining provisions of this
                        Agreement shall continue to remain in full force and
                        effect. Leegality is the e-witness to this rental
                        agreement. Signature of the Lessor / First Party
                        Signature of the Lessee / Second Party
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
