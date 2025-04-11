import React, { useEffect, useState } from "react";
import "./Account.css";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs"; // Social icons
import { MdAccountCircle } from "react-icons/md"; // Account icon
import { useSelector } from "react-redux"; // Redux hook for accessing state

// Account component for user profile page
const Account = () => {
  // Fetching user details from Redux store
  const { user } = useSelector((state) => state.auth);

  // Local state for editing user details
  //20. Initialize local state variables (firstName, lastName, email, phoneNumber, company, designation, bio) using the useState hook to manage the form inputs.
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [bio, setBio] = useState("");

  // Populate local state with user details from store
  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    // Optional fields are set with fallbacks
    setPhoneNumber(user.phoneNumber || "");
    setCompany(user.company || ""); 
    setDesignation(user.designation || ""); 
    setBio(user.bio || "");
  }, [user]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="container userCard cardWidth">
          <div className="profile-tab-nav border-right">
            <div className="p-4">
              <div className="flex justify-center mb-3">
                <MdAccountCircle className="text-9xl" />
              </div>
              <h4 className="text-center text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h4>
            </div>
            <div className="flex justify-center">
              <ul className="flex space-x-2">
                <li>
                  <BsFacebook className="text-blue-600 text-2xl m-1 hover:cursor-pointer"/>
                </li>
                <li>
                  <BsLinkedin className="text-blue-500 text-2xl m-1 hover:cursor-pointer" />
                </li>
                <li>
                  <BsInstagram className="text-pink-500 text-2xl m-1 hover:cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content pp-4 p-md-5" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="account"
              role="tabpanel"
              aria-labelledby="account-tab"
            >
              <h3 className="myb-3 h3">Account Settings</h3>
              <div className="cardRow">
                <div className="cardRow-md">
                  <div className="form-gp">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-cont"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="cardRow-md">
                  <div className="form-gp">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-cont"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="cardRow-md">
                  <div className="form-gp">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-cont"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="cardRow-md">
                  <div className="form-gp">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-cont"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="cardRow-md">
                  <div className="form-gp">
                    <label>Company</label>
                    <input
                      type="text"
                      className="form-cont"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                <div className="cardRow-md">
                  <div className="form-gp">
                    <label>Designation</label>
                    <input
                      type="text"
                      className="form-cont"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="cardRow-md-12">
                <div className="form-gp">
                  <label>Bio</label>
                  <textarea
                    className="form-cont"
                    rows="4"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="cta-flex">
                <button className="cta-b">Save</button>
                <button className="cta-c">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;