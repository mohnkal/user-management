import React from 'react';

const UserCard = ({ user }) => {
  return (
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
      </div>
    </div>
  );
};

export default UserCard;
