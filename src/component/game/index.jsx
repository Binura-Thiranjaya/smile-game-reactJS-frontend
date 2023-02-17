import React, { useState } from "react";
import Swal from "sweetalert2";
// json data
import Dares from "../../data/fakeDares.json";

export default function Index() {
  //fetch the api and store the question and solution
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [userName, setUserName] = useState("Your");
  //Onload fetch the data
  window.onload = function () {
    login();
    //redirect to login
    fetchData();
  };
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
          if (count === 5) {
            fetchData();
          }
          setCount(count + 1);
          Swal.fire("Wrong!", "0 points", "error");
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
      if((score + value) === 100){
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
      title: 'Login Form',
      html: `<input type="text" id="login" class="swal2-input" placeholder="Username" required>
              <input type="password" id="password" class="swal2-input" placeholder="Password" required>`,
      confirmButtonText: 'Sign in',
      showCancelButton: true,
      cancelButtonText: 'Sign up',
      showLoaderOnConfirm: true,
      focusConfirm: false,
      allowOutsideClick: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return fetch(`http://localhost:3000/users/${login}/${password}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`)
        })
      }
      
      //cancel button

    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.name}'s Verified`,
      });
      setUserName(result.value.name);
    }
    else if(result.isDismissed){
      signUp();
    }
  });
  }
  function signUp() {
    Swal.fire({
      title: 'Sign up form',
      html: `
      <input type="text" id="name" class="swal2-input" placeholder="Name" required>
      <input type="text" id="login" class="swal2-input" placeholder="Username" required>
      <input type="password" id="password" class="swal2-input" placeholder="Password" required>
      <input type="password" id="password1" class="swal2-input" placeholder="Confirm Password" required>
            
              `,
      confirmButtonText: 'Sign up',
      showCancelButton: true,
      cancelButtonText: 'Sign in',
      cancelButtonColor: '#D7A1F9',
      showLoaderOnConfirm: true,
      focusConfirm: false,
      allowOutsideClick: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter login and password`)
      }
      return fetch(`http://localhost:3000/users/${login}/${password}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`)
        })
      }      
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.name}'s Verified`,
      });
      setUserName(result.value.name);
    }
    if (result.isDismissed) {
      login();
    }
  })
    
  }

      
  
  
  function gift(){
    //get a random dare
    const randomNum = Math.floor(Math.random() * 11);
    const randomDare = Dares.dares[randomNum];
    console.log(randomDare.dare);
    console.log(randomNum);

    Swal.fire({
      title: "Gift",
      text: "" + randomDare.dare + "",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      setScore(0);
      fetchData();
    });
      
      
  }
  return (
    <div className="container pt-4">
      <div className="card text-center">
        <div className="card-header">SMILE GAME</div>
        <div className="card-body">
          <h5 className="card-title">Question</h5>
          {loading ? (
            <img src={question} className="img-thumbnail" alt="question" />
          ) : (
            <div className="spinner-grow" role="status"></div>
          )}
        </div>
        <div className="card-footer ">
          <h5 className="card-title">Guess the Solution?</h5>
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
    </div>
  );
}
