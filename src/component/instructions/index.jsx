import React from "react";

export default function index() {
  return (
    <div className="container pt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Welcome to our instruction page! Here you will find all the
            information you need to get started with this game.
          </h5>
          <h6 className="card-title">Getting Started:</h6>
          <p className="card-text">
            <ul>
              <li>
                Create an account: To use the game, you need to create an
                account. Go to our homepage (http://localhost:3001/game/) and
                click on the “Sign Up” button. Fill in your details and click on
                “Create Account”.
              </li>
              <li>
                Login: After creating your account, click on the “Sign In”
                button. Enter your username and password to access your account.
              </li>
              <li>
                Explore: Once you have logged in, you can start playing our
                game. Navigate through the menus to find the features you want
                to use.
              </li>
            </ul>
          </p>

          <h6 className="card-title">Features:</h6>
          <p className="card-text">
            <ul>
              <li>
                Home: After logging in, the home page is where you can start
                playing our game.
              </li>
              <li>
                Settings: You can change your account settings by clicking on
                the “Settings” menu. Here you can update your email, password,
                username.
              </li>
              <li>
                Hints: You can use hints to help you answer questions. Each hint
                deducts 5 points from your score.
              </li>
              <li>
                Random Dare: When you score 100 points in our game, you will be
                presented with a random dare. This is a fun way to challenge
                yourself and your friends.
              </li>
              <li>
                Next Question and Hint: If you don’t know the answer to a
                question, you can choose to skip it and move on to the next
                question. Alternatively, you can use a hint, which deducts 5
                points from your score. Remember, you can only make 5 mistakes
                before the question changes.
              </li>
              <li>
                Logout: Click on the “Logout” button located at the top right
                corner of the page to log out of your account.
              </li>
            </ul>
          </p>
          <h6 className="card-footer text-black">We hope this instruction page has been helpful in getting you started with the game.</h6>
        </div>
      </div>
    </div>
  );
}
