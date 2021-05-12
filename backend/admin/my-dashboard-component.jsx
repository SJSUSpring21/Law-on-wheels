// my-dashboard-component.jsx
import { ApiClient } from "admin-bro";
import { Box } from "@admin-bro/design-system";

const api = new ApiClient();

const Dashboard = () => {
  //   const [data, setData] = useState({});

  //   useEffect(() => {
  //     api.getDashboard().then((response) => {
  //       setData(response.data);
  //     });
  //   }, []);

  console.log("INSIDE DASHBOARD");

  return (
    <div>
      {/* //   <div class="card">
    //     <div class="container">
    //       <h4>
    //         <b>John Doe</b>
    //       </h4>
    //       <p>Architect & Engineer</p>
    //     </div>
    //   </div> */}

      <Box
        variant="grey"
        className="box-card"
        style={{ boxShadow: "0 4px 8px rgba(0,0,0.2)", transition: "0.3s" }}
      >
        <Box variant="white">"HELLO"</Box>
      </Box>
      <Box variant="grey">
        <Box variant="white">"HELLO"</Box>
      </Box>
      <Box variant="grey">
        <Box variant="white">"HELLO"</Box>
      </Box>
      <Box variant="grey">
        <Box variant="white">"HELLO"</Box>
      </Box>
      <Box variant="grey">
        <Box variant="white">"HELLO"</Box>
      </Box>
    </div>
  );
};

export default Dashboard;
