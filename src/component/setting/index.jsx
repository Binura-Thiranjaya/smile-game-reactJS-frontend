import { React, useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index() {
  const [userId, setUserId] = useState("");
  const [name, getName] = useState("");
  const [password, getPassword] = useState("");
  const [email, getEmail] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const url = window.location.href;
    const id = url.split("?ID=")[1];
    setUserId(id);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/smile_game/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        getName(data.name);
        getPassword(data.password);
        getEmail(data.email);
        console.log(data);
        setLoading(true);
      });
  }, [userId]);

  function changeClick() {
    var username = document.getElementById("username").value;
    var Password1 = document.getElementById("password").value;
    var email1 = document.getElementById("email").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    console.log(username);
    console.log(Password1);
    console.log(email1);
    console.log(confirmPassword)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if(result.isConfirmed){
        if(Password1 === confirmPassword){
          update(username,Password1,email1);
        }else{
          Swal.fire({
            title: "Error!",
            text: "Please check your passwords.",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
      }
    })

  }
  async function update(username,Password1,email1){
    console.log("update username",username);
    console.log("update password",Password1);
    console.log("update email",email1);

    const res = await fetch(`http://localhost:3000/smile_game/users/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password: Password1,
        email: email1
      }),
    });
    const data = await res.json();
    console.log(data);
    Swal.fire({
      title: "Success!",
      text: "Your setting has been changed.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `./game`;
      }
    });
  }
  function backClick() {
    window.location.href = `./game`;
  }

  return (
    <div className="container pt-4 w-50 ">
      {/* User can change username and password */}
      <div className="card ">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fa fa-gear"></i> Setting
          </h3>
        </div>
        {loading ? (
          <div className="card-body">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={name}
              />

              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                id="email"
              />

              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                id="password"

              />

              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                id="confirmPassword"
              />

              <button
                type="submit"
                className="btn btn-secondary mt-3 float-end"
                onClick={backClick}
              >
                Back
              </button>

              <button
                type="submit"
                className="btn btn-warning mt-3 "
                onClick={changeClick}
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex  justify-content-center">
            <div className="spinner-grow " role="status"></div>
          </div>
        )}
      </div>
    </div>
  );
}
