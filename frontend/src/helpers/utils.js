export const displayStatusUsingStatusCode = (statusCode) => {
  switch (statusCode) {
    case "RENTAL_AGREEMENT":
      return "Rental agreement";
    case "MUTUAL_DIVORCE":
      return "Divorce";
    case "WAITING_FOR_REVIEW":
      return "Waiting for review";
    case "REVIEWING":
      return "A lawyer is currently reviewing your case";
    case "APPROVED":
      return "Case approved successfully";
    case "REJECTED":
      return "Case rejected";
    case "FILING_JOINT_PETITION":
      return "Filing Joint Petition";
    case "APPEAR_IN_COURT_FIRST_MOTION":
      return "Appear in court for first motion";
    case "APPEAR_IN_COURT_SECOND_MOTION":
      return "Appear in court for second motion";
    case "TENANT":
      return "Tenant";
    case "LANDLORD":
      return "Landlord";
  }
};
