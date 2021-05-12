// // my-dashboard-component.jsx
// import { ApiClient } from "admin-bro";
// import { Box } from "@admin-bro/design-system";
// const models = require("../models/modelsStore");
// const config = require("../configuration/config");

// const api = new ApiClient();

// const Dashboard = async () => {
//   // Get All the data
//   // const allRentalAgreements = await models.rentalAgreements.find();
//   // const allMutualDivorces = await models.mutualDivorces.find();
//   // const allLawyers = await models.lawyers.find();
//   // const allUsers = await models.users.find();

//   // const approvedLawyers = allLawyers.filter(
//   //   (lawyer) => lawyer.isApprovedByAdmin
//   // ).length;
//   // const unApprovedLawyers = allLawyers.filter(
//   //   (lawyer) => !lawyer.isApprovedByAdmin
//   // ).length;
//   // const totalUsersRegistered = allUsers.length;
//   // const completedCases =
//   //   allRentalAgreements.filter((rentalAgreement) => {
//   //     rentalAgreement.status === config.APPROVED_STATUS;
//   //   }).length +
//   //   allMutualDivorces.filter((rentalAgreement) => {
//   //     rentalAgreement.status === config.APPROVED_STATUS;
//   //   }).length;

//   // const ongoingCases =
//   //   allRentalAgreements.filter((rentalAgreement) => {
//   //     rentalAgreement.status !== config.APPROVED_STATUS &&
//   //       rentalAgreement.status !== config.REJECTED_STATUS;
//   //   }).length +
//   //   allMutualDivorces.filter((rentalAgreement) => {
//   //     rentalAgreement.status !== config.APPROVED_STATUS &&
//   //       rentalAgreement.status !== config.REJECTED_STATUS;
//   //   }).length;

//   // const rejectedCases =
//   //   allRentalAgreements.filter((rentalAgreement) => {
//   //     rentalAgreement.status === config.REJECTED_STATUS;
//   //   }).length +
//   //   allMutualDivorces.filter((rentalAgreement) => {
//   //     rentalAgreement.status === config.REJECTED_STATUS;
//   //   }).length;

//   // return (
//   //   <div>
//   //     {/* //   <div class="card">
//   //   //     <div class="container">
//   //   //       <h4>
//   //   //         <b>John Doe</b>
//   //   //       </h4>
//   //   //       <p>Architect & Engineer</p>
//   //   //     </div>
//   //   //   </div> */}

//   //     <Box variant="grey">
//   //       <Box variant="white">{approvedLawyers}</Box>
//   //     </Box>
//   //     <Box variant="grey">
//   //       <Box variant="white">{unApprovedLawyers}</Box>
//   //     </Box>
//   //     <Box variant="grey">
//   //       <Box variant="white">{totalUsersRegistered}</Box>
//   //     </Box>
//   //     <Box variant="grey">
//   //       <Box variant="white">{completedCases}</Box>
//   //     </Box>
//   //     <Box variant="grey">
//   //       <Box variant="white">{ongoingCases}</Box>
//   //     </Box>
//   //     <Box variant="grey">
//   //       <Box variant="white">{rejectedCases}</Box>
//   //     </Box>
//   //   </div>
//   // );
//   return (
//     <div>
//       <Box variant="grey">
//         <Box variant="white">"HELLO"</Box>
//       </Box>
//     </div>
//   );
// };

// export default Dashboard;

// my-dashboard-component.jsx
import { ApiClient } from "admin-bro";
import { Box } from "@admin-bro/design-system";

const api = new ApiClient();

const Dashboard = () => {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   api.getDashboard().then((response) => {
  //     setData(response.data);
  //   });
  // }, []);

  return (
    <Box variant="grey">
      <meta http-equiv="refresh" content="0; URL=/admin/resources/Lawyer" />
      <Box variant="white">Admin Panel</Box>
    </Box>
  );
};

export default Dashboard;
