import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [apiData, setApiData] = useState([]);
  const [inData, setInData] = useState();
  const [opt, setOpt] = useState("name");
  const api_Url = "https://gorest.co.in/public/v2/users";
  const handleInput = (e) => {
    setInData(e.target.value);
  };
  useEffect(() => {
    fetch(api_Url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        console.log(data, apiData);
      })
      .catch((e) => {
        console.log("Error Occured", e);
      });
  }, []);
  const filter = (d) => {
    let status = false;
    d[opt].toString().toLowerCase().includes(inData)
        ? (status = true)
        : (status = false);
    return status;
  };

  return (
    <div className="App">
      <h2>Search Operation</h2>
      <div style={{ margin: "10px" }}>
        <input type="text" onChange={handleInput} />  
        <select name="selectedFruit" onChange={(e) => setOpt(e.target.value)}>
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="gender">Gender</option>
          <option value="status">Status</option>
        </select>
      </div>
      {/* <div>{inData ? `${inData}   ${opt}` : ""}</div> */}
      <div className="display_section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inData
              ? apiData &&
                apiData.map((d) =>
                  filter(d) ? (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.gender}</td>
                      <td>{d.status}</td>
                    </tr>
                  ) : null
                )
              : apiData &&
                apiData.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.gender}</td>
                    <td>{d.status}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
