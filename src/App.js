import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  console.log(columns);

  useEffect(() => {
    axios.get("http://localhost:30300/users").then((res) => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to="/create" className="btn btn-primary">
          Add +
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((data, idx) => (
              <th key={idx}>{data}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item, idx) => (
            <tr key={idx}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <Link
                  to={`/update/${item.id}`}
                  className="btn btn-sm btn-success"
                >
                  Update
                </Link>
                <button
                  onClick={(e) => DeleteHandler(item.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  function DeleteHandler(id) {
    const conf = window.confirm("Do you want to delete?");

    if (conf) {
      axios
        .delete("http://localhost:30300/users/" + id)
        .then((res) => {
          alert("삭제 성공!!");
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }
}

export default App;
