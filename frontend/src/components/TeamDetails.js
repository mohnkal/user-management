// src/components/TeamDetails.js
import React from 'react';

const TeamDetails = ({ team }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <h3>Team Details</h3>
          <p><strong>Team Name:</strong> {team.name}</p>
          <h4>Members:</h4>
          <ul className="list-group">
            {team.users.map(member => (
              <li key={member._id} className="list-group-item">
                {member.first_name} {member.last_name} - {member.domain}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
