import React, { useState } from "react";
import axios from "axios";

function UpdateUserForm(props) {
  // Create state variables for the form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a PATCH request to the server to update the user details
    try {
      const response = await axios.patch(`/users/${props.userId}`, {
        name,
        email,
        pic,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={pic}
          onChange={(event) => setPic(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateUserForm;
