import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Use this api :https://marcconrad.com/uob/smile/api.php?out=json and get the question and display  the question as image and store the solution

export default function Index() {
  //fetch the api and store the question and solution
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [answer, setAnswer] = UseState(null);
  // const [score, setScore] = UseState(0);
  

  // await
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://marcconrad.com/uob/smile/api.php?out=json"
      );
      const data = await response.json();
      setQuestion(data.question);
      setSolution(data.solution);
      // console.log(data);
      // console.log(data.question);
      // console.log(data.solution);
      setLoading(true);
    }
    fetchData();
  }, []);

  // check the answer
  function checkAnswer(answer) {
    console.log("Answer", answer);
    console.log("Solution", solution);
    console.log("Correct", answer === solution);
  }

  return (
    <div className="container pt-5">
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
        <h5 className="card-title">Solution</h5>
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
                onClick={() => checkAnswer(1)}
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
        </div>
      </div>
    </div>
  );
}
