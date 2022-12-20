import React from "react";
import "./forgetPassword.css";

const ForgetPassword = ({ setCurrentTab }) => {
  return (
    <section className="container">
      <form className="form">
        <h1>Forgot Password</h1>
        <p>Enter your Email to request a new password.</p>

        <label htmlFor="email">Email</label>
        <input type="email" className="email" placeholder="Enter your email" />
        <button className="btn">Submit</button>
        <span>
          New member? <a onClick={() => setCurrentTab("auth")}>Sign In</a>
        </span>

        <small>
          By submitting you agree to our <a>Privacy Policy</a> and
          <a>Terms</a>
        </small>
      </form>
    </section>
  );
};

export default ForgetPassword;
