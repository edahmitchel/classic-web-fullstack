import { Avatar, Img } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../context/chatProvider";
import ChatHeader from "../../images/chatHeader.jpg";
import "./danielUser.css";
import { UserDetailsModal } from "./UserDetailsModal";

const Danieluser = () => {
  const {
    user,
    setSelectedChat,
    chatList,
    setChatList,
    openProfile,
    setOpenProfile,
  } = ChatState();
  console.log("this is open profile,", openProfile);
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
          src={user.pic ? user.pic : ChatHeader}
          w="100px"
          height={"100px"}
        />

        {user.username ? <h1>{user.username}</h1> : <h1>Maria Snow</h1>}

        <div className="profile__info">
          {user.username ? (
            <small>@{user.username}</small>
          ) : (
            <small>@Maria__snow</small>
          )}

          <UserDetailsModal>
            <button className="user__btn" type="submit">
              Edit profile
            </button>
          </UserDetailsModal>
        </div>
      </section>

      <section className="bio">
        {user.bio ? (
          <p>{user.bio}</p>
        ) : (
          <p>Frontend Web developer.. Manutd👹🚧.. Practice makes progress🧩</p>
        )}

        <label htmlFor="email">Email</label>
        <p className="email">{user.email ? user.email : "maria@gmail.com"}</p>

        <label htmlFor="location">Location</label>
        <p className="location">SanFrancisco, CA</p>
      </section>
      <button onClick={() => setOpenProfile(false)}>close profile</button>
    </section>
  );
};

export default Danieluser;
