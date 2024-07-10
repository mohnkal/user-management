// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UserCard from "./UserCard.js";
// import "./UsersLists.css";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     domain: "",
//     gender: "",
//     availability: "",
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users`, {
//         params: {
//           page: currentPage,
//           search: searchTerm,
//           domain: filters.domain,
//           gender: filters.gender,
//           availability: filters.availability,
//         },
//       });
//       console.log(response)
//       setUsers(response.data.users);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [currentPage, searchTerm, filters]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-8">
//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//         <div className="col-md-4">
//           <div className="mb-3">
//             <select
//               className="form-control"
//               name="domain"
//               value={filters.domain}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Domain</option>
//               {/* Add options dynamically based on your backend data */}
//               <option value="IT">IT</option>
//               <option value="Finance">Finance</option>
//               {/* Add more options as needed */}
//             </select>
//           </div>
//           <div className="mb-3">
//             <select
//               className="form-control"
//               name="gender"
//               value={filters.gender}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>
//           <div className="mb-3">
//             <select
//               className="form-control"
//               name="availability"
//               value={filters.availability}
//               onChange={handleFilterChange}
//             >
//               <option value="">Select Availability</option>
//               <option value="true">Available</option>
//               <option value="false">Not Available</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         {users.map((user) => (
//           <div key={user._id} className="col-md-4 mb-4">
//             <UserCard user={user} />
//           </div>
//         ))}
//       </div>

//       <div className="row">
//         <div className="col-md-12">
//           <nav>
//             <ul className="pagination">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <li
//                   key={i}
//                   className={`page-item ${
//                     currentPage === i + 1 ? "active" : ""
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersList;

// src/components/UsersList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard.js";
import "./UsersLists.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users`, {
        params: {
          page: currentPage,
          search: searchTerm,
          domain: filters.domain,
          gender: filters.gender,
          availability: filters.availability,
        },
      });
      console.log(response.data);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, filters]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4">
          <div className="mb-3">
            <select
              className="form-control"
              name="domain"
              value={filters.domain}
              onChange={handleFilterChange}
            >
              <option value="">Select Domain</option>
              {/* Add options dynamically based on your backend data */}
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-control"
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

      <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-4 mb-4">
            <UserCard user={user} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-12">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
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
    </div>
  );
};

export default UsersList;
