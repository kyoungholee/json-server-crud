import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //업데이트 하는 부분
    axios
      .get("http://localhost:30300/users/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const UpdateNameHandler = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const UpdateEmailHandler = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:30300/users/" + id, data).then((res) => {
      alert("Data Changed Successfully!");
      navigate("/");
    });
  };

  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light-gray p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              disabled
              name="id"
              value={data.id}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={data.name}
              className="form-control"
              onChange={UpdateNameHandler}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={data.email}
              className="form-control"
              onChange={UpdateEmailHandler}
            />
          </div>
          <br />
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
