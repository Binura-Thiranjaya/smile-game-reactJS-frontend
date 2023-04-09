import React, { useState } from "react";
import Swal from "sweetalert2";
import "./style.css";
// json data

export default function Index() {
  //fetch the api and store the question and solution
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(1);
  const [userName, setUserName] = useState("Your");
  const [userID, setUserID] = useState(0);
  const [randomDare, setRandomDare] = useState(null);

  //Onload fetch the data
  window.onload = function () {
    login();
    //redirect to login
  };
  //set a timer to fetchData function 
  function fetchData() {
    fetch("https://marcconrad.com/uob/smile/api.php?out=json")
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.question);
        setSolution(data.solution);
        setLoading(true);
        console.log(data);
      });
  }

  // check the answer
  function checkAnswer(answer) {
    console.log("Answer", answer);
    console.log("Solution", solution);

    Swal.fire({
      title: "Are you sure?",
      text: "You have selected : " + answer + "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        if (answer.toString() === solution.toString()) {
          setScore(score + 10);
          Swal.fire("Correct!", "+10 points added : ", "success");
          showScore(10);
        } else {
          if (count === 2) {
            fetchData();
            setCount(1);
          }
          setCount(count + 1);
          //display the remaining attempts in a customize alert and make the number font bigger
          Swal.fire("Wrong!", "You have only "+count+" attempt!", "error");         
        }
      }
    });
  }
  function showScore(value) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "" + userName + " Score is : " + (score + value) + "",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
      fetchData();
      if (score + value === 20) {
        gift();
      }
    });
  }
  function hint() {
    Swal.fire({
      title: "Are you sure?",
      text: "Answer : " + solution + "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        setScore(score + 5);
        Swal.fire("Correct!", "-5 points deducted : ", "success");
        showScore(5);
      }
    });
  }
  function next() {
    fetchData();
  }
  function login() {
    Swal.fire({
      title: "Login Form",
      html: `<input type="text" id="login" class="swal2-input" placeholder="Username" required>
              <input type="password" id="password" class="swal2-input" placeholder="Password" required>`,
      confirmButtonText: "Sign in",
      showCancelButton: true,
      cancelButtonText: "Sign up",
      showLoaderOnConfirm: true,
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector("#login").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        return fetch(`http://localhost:3000/smile_game/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //capitalize the username
            username: login.toUpperCase(),
            password: password,

          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: Please try again`);
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.name}'s Verified`,
        });
        setUserName(result.value.name);
        setUserID(result.value._id);
        fetchData();
      } else if (result.isDismissed) {
        signUp();
      }
    });
  }
  function signUp() {
    Swal.fire({
      title: "Sign up form",
      html: `
      <input type="text" id="username" class="swal2-input" placeholder="Username" required>
      <input type="text" id="email" class="swal2-input" placeholder="Email" required>
      <input type="password" id="password" class="swal2-input" placeholder="Password" required>
      <input type="password" id="password1" class="swal2-input" placeholder="Confirm Password" required>
            
              `,
      confirmButtonText: "Sign up",
      showCancelButton: true,
      cancelButtonText: "Sign in",
      cancelButtonColor: "#D7A1F9",
      showLoaderOnConfirm: true,
      focusConfirm: false,
      allowOutsideClick: false,
      preConfirm: () => {
        const password = Swal.getPopup().querySelector("#password").value;
        const password1 = Swal.getPopup().querySelector("#password1").value;
        if (password !== password1) {
          Swal.showValidationMessage(`Password does not match`);
        } else {
          return fetch(`http://localhost:3000/smile_game/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: Swal.getPopup().querySelector("#username").value,
              password: Swal.getPopup().querySelector("#password").value,
              email: Swal.getPopup().querySelector("#email").value,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: Please try again`);
            });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.name}'s Verified`,
        });
        login();
        setUserName(result.value.name);
        setUserID(result.value._id);
      }
      if (result.isDismissed) {
        login();
      }
    });
  }

  function gift() {
    const randomNum = Math.floor(Math.random() * 11);
    // const randomDare = Dares.dares[randomNum];
    fetch("http://localhost:3000/smile_game/dares/" + randomNum)
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: "Gift",
          text: "" + data.dare + "",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
        }).then((result) => {
          if (result.isConfirmed) {
            continueAlert();
          } else {
            continueAlert();
          }
        });
      });
  }
  function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "You are now logged out.", "success");
        login();
        setUserName("");
        setUserID("");
        setScore(0);
      }
    });
  }
  function continueAlert() {
    Swal.fire({
      title: "Do you want to continue?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Next Person",
      denyButtonText: `Logout`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Thank you!", "", "success");
        setScore(0);
      } else if (result.isDenied) {
        Swal.fire("Logout", "", "info");
        logout();
      }
    });
  }
  function redirectToPage() {
    window.location.href = "/setting?ID="+userID;
  }
  return (
    <div className="container pt-4">
      <div className="card text-center">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <p className="h2">😂-Game</p>
            </div>

            <div className="col col-lg-2">
              <button type="button" className="btn btn-outline-success">
                <i className="fa fa-star ml-2">Score: {score}</i>
              </button>
            </div>
            {/* Profile */}
            <div className="col col-lg-2">
              <button type="button" className="btn btn-outline-primary" onClick={redirectToPage}>
                <i className="fa fa-user ml-2">Name: {userName}</i>
              </button>
            </div>
            <div className="col col-lg-1">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">Question</h5>
          {loading ? (
            <div>
              <img src={question} className="img-thumbnail" alt="question" />
              <div className="card-subtitle text-muted  mt-1 ">
                <div>
                  <i className="fa fa-user ml-2">ID: {userID}</i>
                </div>
              </div>
            </div>
          ) : (
            <div className="spinner-grow" role="status"></div>
          )}
        </div>
        <div className="card-footer ">
          <h4 className="card-title">Guess the Solution?</h4>
          <div className="row d-flex justify-content-center">
            <div className="col-2 pt-3">
              <input
                type="button"
                value="0"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>
            <div className="col-2 pt-3">
              <input
                type="button"
                value="1"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>

            <div className="col-2 pt-3">
              <input
                type="button"
                value="2"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>

            <div className="col-2 pt-3">
              <input
                type="button"
                value="3"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>

            <div className="col-2 pt-3">
              <input
                type="button"
                value="4"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <div className="col-2 pt-3">
              <input
                type="button"
                value="5"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>
            <div className="col-2 pt-3">
              <input
                type="button"
                value="6"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>
            <div className="col-2 pt-3">
              <input
                type="button"
                value="7"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>

            <div className="col-2 pt-3">
              <input
                type="button"
                value="8"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>
            <div className="col-2 pt-3">
              <input
                type="button"
                value="9"
                className="btn btn-outline-dark"
                onClick={(e) => checkAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto pt-4">
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={hint}
            >
              Hint
            </button>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={next}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Score Board */}
    </div>
  );
}
