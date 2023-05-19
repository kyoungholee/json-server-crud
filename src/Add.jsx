import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    //생성하기 부분이기에 post로 만든다.

    axios
      .post("http://localhost:30300/users", inputData)
      .then((res) => {
        alert("Data Added successfully!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light-gray p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={(e) => {
                setInputData({ ...inputData, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => {
                setInputData({ ...inputData, email: e.target.value });
              }}
            />
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
