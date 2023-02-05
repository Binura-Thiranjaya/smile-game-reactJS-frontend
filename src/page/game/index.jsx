import React, { useState } from "react";
import Swal from "sweetalert2";

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
  getUserName();  
  fetchData();
}
 function fetchData(){
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
          if(count === 5){
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
      title: ""+userName+" Score is : " + (score+value) + "",
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
      fetchData();
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
function next(){
  fetchData();
}
function getUserName(){
  Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
      setUserName(result.value.login)
    }
  })
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
            <button className="btn btn-outline-info" type="button" onClick={hint}>
              Hint
            </button>
            <button className="btn btn-outline-danger" type="button" onClick={next}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
