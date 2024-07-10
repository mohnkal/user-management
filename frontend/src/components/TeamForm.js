import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import TeamDetails from './TeamDetails';

const TeamForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableDomains, setAvailableDomains] = useState([]);
  const [availableAvailabilities, setAvailableAvailabilities] = useState([]);
  const [createdTeam, setCreatedTeam] = useState(null); // State to hold created team details

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users);

      // Extract available domains and availabilities
      const domains = new Set();
      const availabilities = new Set();
      response.data.users.forEach(user => {
        domains.add(user.domain);
        availabilities.add(user.available);
      });
      setAvailableDomains(Array.from(domains));
      setAvailableAvailabilities(Array.from(availabilities));
    } catch (error) {
      console.error('Error fetching users for team creation:', error);
    }
  };

  const handleUserSelect = (userId) => {
    const user = users.find(u => u._id === userId);
    const isDomainUnique = selectedUsers.every(u => u.domain !== user.domain);
    
    if (isDomainUnique) {
      setSelectedUsers(prevUsers => [...prevUsers, user]);
    } else {
      alert('User cannot be added to the team. Ensure domain is unique.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/team', {
        name: 'New Team', // Replace with actual team name input
        userIds: selectedUsers.map(user => user._id)
      });
      console.log('Team created successfully:', response.data);
      setCreatedTeam(response.data); // Set the created team details
    } catch (error) {
      console.error('Error creating team:', error.response ? error.response.data : error.message);
      alert('Error creating team: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div className="container mt-4">
      {createdTeam ? (
        <TeamDetails team={createdTeam} /> // Render TeamDetails if team is created
      ) : (
        <div className="row">
          <div className="col-md-8">
            <h4>Select Users for Team:</h4>
            <div className="row">
              {users.map(user => (
                <div key={user._id} className="col-md-4 mb-4">
                  <div className="card">
                    <img src={user.avatar} className="card-img-top" alt={`${user.first_name} ${user.last_name}`} />
                    <div className="card-body">
                      <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                      <p className="card-text">
                        <strong>Email:</strong> {user.email}<br />
                        <strong>Gender:</strong> {user.gender}<br />
                        <strong>Domain:</strong> {user.domain}<br />
                        <strong>Availability:</strong> {user.available ? 'Available' : 'Not Available'}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUserSelect(user._id)}
                        disabled={!user.available}
                      >
                        Add to Team
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h4>Selected Users:</h4>
            <ul className="list-group">
              {selectedUsers.map(user => (
                <li key={user._id} className="list-group-item">
                  {user.first_name} {user.last_name} - {user.domain}
                </li>
              ))}
            </ul>
            <button className="btn btn-success mt-3" onClick={handleSubmit}>Create Team</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamForm;
