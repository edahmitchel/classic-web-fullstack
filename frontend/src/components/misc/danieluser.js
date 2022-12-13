import { Avatar, Img } from "@chakra-ui/react";
import React from "react";
import ChatHeader from "../../images/chatHeader.jpg";
import "./danielUser.css";

const Danieluser = () => {
  return (
    <section className="container">
      <header className="header">
        {/* <div className="header___img"> */}
        <Img
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center"
          src={ChatHeader}
          alt="headerImg"
        />
        {/* </div> */}
      </header>

      <section className="profile">
        <Avatar
          border="5px solid white"
          name="profileImg"
          src={ChatHeader}
          w="100px"
          height={"100px"}
        />

        <h1>Maria Snow</h1>

        <div className="profile__info">
          <small>@Maria__snow</small>

          <button className="user__btn" type="submit">
            Edit profile
          </button>
        </div>
      </section>

      <section className="bio">
        <p>Frontend Web developer.. Manutd👹🚧.. Practice makes progress🧩</p>

        <label htmlFor="email">Email</label>
        <p className="email"> maria@gmail.com</p>

        <label htmlFor="location">Location</label>
        <p className="location">SanFrancisco, CA</p>
      </section>
    </section>
  );
};

export default Danieluser;
