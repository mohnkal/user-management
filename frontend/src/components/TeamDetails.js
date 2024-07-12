// src/components/TeamDetails.js
import React, { useState, useEffect } from "react";
import UserCard from "./UserCard.js";
import axios from "axios";
import "./TeamDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { updateTeam } from "../store/slices/UserSlice.js";
import { useNavigate } from "react-router-dom";

const TeamDetails = () => {
  // Create a dispatcher
  const dispatch = useDispatch();

  // Navigate
  const navigate = useNavigate();

  // Get team data
  let currentTeam = useSelector((state) => state.users.userTeam);

  let _id = currentTeam._id;

  const removeTeammate = (userId) => {
    currentTeam = {
      users: currentTeam.users.filter((user) => user._id !== userId),
      _id: _id,
    };

    // Dispatch the action
    dispatch(updateTeam(currentTeam));
    console.log(currentTeam);
  };

  const handleRemoveTeammate = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/team/remove/${_id}/${userId}`
      );
      removeTeammate(userId);
    } catch (error) {
      console.error("Error removing teammate:", error.message);
      alert("Error removing teammate: " + error.message);
    }
  };

  useEffect(() => {

    if(currentTeam.users.length == 0){
      navigate("/")
    }
    

  }, [currentTeam]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h3 className="team-details">Team Details</h3>
          <p className="team-name">
            <strong>Team Name:</strong> Dev Team
          </p>
          <h4 className="members">Members:</h4>
          <ul className="list-group">
            {currentTeam.users.map((member) => (
              <li key={member._id} className="list-group-item">
                {/* {member.first_name} {member.last_name} - {member.domain} */}
                <UserCard user={member} />
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveTeammate(member._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
