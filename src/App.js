import { useEffect, useState } from "react";
import ParticipantForm from "./components/ParticipantForm";
import ParticipantTable from "./components/ParticipantTable";
import { BASE_URL } from "./config/config";

function App() {
  const [participants, setParticipant] = useState([]);//used to store the data received from the API request
  const [error, setError] = useState(null);//is used to store any errors that occur during the API request
  const [loading, setLoading] = useState(true);// is used to indicate whether the data is currently being loaded from the API request

  // getData makes an HTTP get request to the Hicoders-API to get all existing participants 
  const getData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      if (response.ok) {
        setParticipant(json);// store participants if the server's response is ok to our request
      }
    } catch (error) {
      setError(error);
      console.error(participants)
    } finally {
      setLoading(false);
    }
  };

  //this fetches the data when the page loads
  useEffect(() => {
    getData();
  }, []);
  ///loading screen
  if (loading) {
    return <p style={{color:"white"}}>Loading...</p>;
  }
  ////show error
  if (error) {
    return <p style={{color:"white"}}>An error occurred: {error.message}</p>;
  }

  return (
    <div className="App m-5 p-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-12  text-start ">
            <ParticipantForm getData={getData}  />
          </div>
          <div className="col-lg-7  col-12">
            <ParticipantTable participants={participants} getData={getData} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;