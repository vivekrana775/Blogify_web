import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Account = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="user_account_background">
      <div className="user_account">
        <div>Account Name :- {currentUser.name}</div>
        <div> Your Email: - {currentUser.email}</div>
        <div>Account created on {currentUser.createdAt}</div>
      </div>
    </div>
  );
};

export default Account;
