require("dotenv").config(); // load environment variables from .env file

const express = require("express");    // import express framework
const cors = require("cors");          // import cors middleware
const bodyParser = require("body-parser"); // import body-parser
const bcrypt = require("bcryptjs");      // import bcrypt for password hashing
const jwt = require("jsonwebtoken");   // import json web token for authentication
//1.======== Import the Mongoose library to enable interaction with MongoDB in your server-side application.
const mongoose = require("mongoose");   //import mongoose for database interaction

const app = express();
const PORT = process.env.PORT || 3000;       
const DATABASE_URL = process.env.DATABASE_URL;                                               

//2.==========  MongoDB connection===============
// Ensure you have a `.env` file at the root of your project with a variable `DATABASE_URL` that contains your MongoDB connection string.
// Use `mongoose.connect` to initiate the connection, which requires your database's connection string.
// Upon successful connection to the database, a message "âœ” Connected to MongoDB..." is logged to the console,
// indicating that the connection has been established successfully.
// If the connection attempt fails for any reason (e.g., incorrect connection string, network issues, etc.),
// an error message "ðŸ¤” Could not connect to MongoDB..." is logged to the console, helping to diagnose the connection issue.

mongoose.connect(DATABASE_URL)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));

//3.========= Define User schema==========
//Define the User Schema and Model:
//Replace the temporary users array with a Mongoose schema and model for user data. Define a User Schema where you specify types and requirements for firstName, lastName, email, phoneNumber, company, designation, and password. Ensure the email field is marked as unique.
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    phoneNumber: {type: String, required: true},
    company: {type: String},
    designation: {type: String, required: true},
    password: {type: String, required: true},
})


//4.============= Create User Model==========
// Use the schema to create a User model. This model will interface directly with the MongoDB users collection.
const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());

//5. password validation utility function
// rule: password must be at least 6 characters long and contain at least one letter and one number
function validatePassword(password) {
  const minLength = 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= minLength && hasLetter && hasNumber;
}

// signup endpoint - saves user data to mongodb
app.post("/api/signup", async (req, res) => {
  const { email, password, ...rest } = req.body;
  
  // check if email and password are provided
  if (!email || !password) {
    //5.============ If either 'email' or 'password' is missing, respond with a 400 Bad Request status,
    // indicating that the client's request is incomplete or malformed. (message:Please fill all required fields )
    res.status(400).json({message: "Please fill all required fields"});
  }
  
  try {
    // attempt to find an existing user with the same email
    const user = await User.findOne({ email });
    if (user) {
     //6. If a user with the provided email already exists, respond with a 400 Bad Request status,
    // indicating that the request cannot be processed because it would result in a duplicate resource. (message:User already exists)
    res.status(400).json({message: "Please fill all required fields"})
    }
    
    // validate the password
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "password must be at least 6 characters long and contain at least one letter and one number",
      });
    }
    
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // create a new user document with the hashed password
    const newUser = new User({ ...rest, email, password: hashedPassword });
    //7. Save the new user document to the database using the save method.
    await newUser.save();
    
    res.status(201).json({ message: "user created successfully", user: { ...newUser._doc, password: undefined } });
  } catch (error) {
    return res.status(500).json({ message: error.message || "error while signup" });
  }
});

// login endpoint - authenticates user and generates a jwt token
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  
  // Check for the presence of email and password in the request.
  // If either is missing, return a 400 Bad Request status to indicate client error.
  if (!email || !password) {
    return res.status(400).json({ message: "please fill all required fields" });
  }
  
  try {
    // Attempt to find a user in the database with the provided email.
    //8.============ This uses the User model's findOne method to search for a single user by email.  
    const user = await User.findOne({ email });
        
    // If no user is found with the provided email, return a 401 Unauthorized status.
    // This indicates that the login attempt was not successful due to invalid user credentials.
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    
   // If a user is found with the provided email, compare the provided password with the hashed password stored in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        //9.=========== If the passwords do not match, return a 401 Unauthorized status to indicate invalid credentials.    
        res.status(401).json({message: "Invalid credentials."})
    }
    
    // If the passwords match, generate a JWT token using the user's email as the payload.
    // Set the token to expire in 1 hour.
    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Return a 200 OK status with a success message, the generated token, and the user object.
    // This indicates a successful login.
    res.status(200).json({ message: "login successful", token, user });
  } catch (err) {
    // If an error occurs while finding the user, return a 500 Internal Server Error status.
    // This helps to handle unexpected errors that may occur during the database query operation.
    return res.status(500).json({ message: "error finding user" });
  }
});

app.get("/", (req, res) => {
  res.send("root path");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));