import React, { useState, useEffect, useCallback, } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import TeamDetails from "./TeamDetails.js";
import "./TeamForm.css"; 
import { useDispatch } from 'react-redux';
import { updateTeam } from "../store/slices/UserSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../helpers/url.js";

const UserManagement = () => {

// base url
  const url = BASE_URL;

// Create a dispatcher
  const dispatch = useDispatch();

  // create a navigator\
  const navigate = useNavigate();

  // Get the current team from the Redux store
  // const currentTeam = useSelector((state) => state.users.userTeam);

  // Handle form submission
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [createdTeam, setCreatedTeam] = useState(null); 


  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/users`, {
        params: {
          page: currentPage,
          search: searchTerm,
          domain: filters.domain,
          gender: filters.gender,
          availability: filters.availability,
        },
      });
      // console.log(response.data);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [currentPage, searchTerm, filters, url]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUserSelect = (userId) => {
    const user = users.find((u) => u._id === userId);
    const isDomainUnique = selectedUsers.every((u) => u.domain !== user.domain);

    if (isDomainUnique) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    } else {
      alert("User cannot be added to the team. Ensure domain is unique.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/api/team`, {
        name: "New Team", // Replace with actual team name input
        userIds: selectedUsers.map((user) => user._id),
      });
      console.log("Team created successfully:", response.data);
      setCreatedTeam(response.data); // Set the created team details
      dispatch(updateTeam(response.data));

      // Move to team detail
      navigate(`/team`)
      
    } catch (error) {
      console.error(
        "Error creating team:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error creating team: " +
        (error.response ? error.response.data : error.message)
      );
    }
  };


  const handleRemoveTeammate = (userId) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <>
      <div className="user-text">
        <h1>User Management System</h1>
      </div>
      <div className="user-management-container mt-4">
        {createdTeam ? (
          <TeamDetails team={createdTeam} onRemoveTeammate={handleRemoveTeammate} /> // Render TeamDetails if team is created
        ) : (
          <>
            <div className="search-filter-row row">
              <div className="search-column col-md-8">
                <input
                  type="text"
                  className="search-input form-control mb-3"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="filter-column col-md-4">
                <div className="filter-item mb-3">
                  <select
                    className="filter-select form-control"
                    name="domain"
                    value={filters.domain}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Domain</option>
                    <option value="IT">IT</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div className="filter-item mb-3">
                  <select
                    className="filter-select form-control"
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="filter-item mb-3">
                  <select
                    className="filter-select form-control"
                    name="availability"
                    value={filters.availability}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Availability</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="user-cards-row row">
              {users.map((user) => (
                <div key={user._id} className="user-card-column col-md-4 mb-4">
                  <UserCard user={user} />
                  <button
                    className="add-to-team-btn btn btn-primary"
                    onClick={() => handleUserSelect(user._id)}
                    disabled={!user.available || selectedUsers.some((u) => u._id === user._id)}
                  >
                    {selectedUsers.some((u)=> u._id === user._id) ? "Added" : "Add to Team"}
                  </button>
                </div>
              ))}
            </div>

            <div className="pagination-row row">
              <div className="pagination-column col-md-12">
                <nav>
                  <ul className="pagination-list pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={`pagination-item page-item ${currentPage === i + 1 ? "active" : ""
                          }`}
                      >
                        <button
                          className="pagination-link page-link"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="selected-users-row row">
              <div className="selected-users-column col-md-12">
                <h4>Selected Users:</h4>
                <ul className="selected-users-list list-group">
                  {selectedUsers.map((user) => (
                    <li
                      key={user._id}
                      className="selected-user-item list-group-item"
                    >
                      {user.first_name} {user.last_name} - {user.domain}
                    </li>
                  ))}
                </ul>
                <button
                  className="create-team-btn btn btn-success mt-3"
                  onClick={handleSubmit}
                >
                  Create Team
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserManagement;
