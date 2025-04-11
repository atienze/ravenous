import { useState, useEffect } from 'react';
import './Forms.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';


const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format"}).nonempty({ message: "Email is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters"})
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  })
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // Optionally watch password fields if needed
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
 
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);

  const onSubmit = (data) => {
    if(data.password !== data.confirmPassword){
      toast.error("Passwords do not match")
    }

    try{
      setIsLoading(true);
  
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => {
        if(response.ok){
          toast.success("Signup successful. Please login.");
          navigate("/login");
        }
      })
      .catch(err => {
        console.log(err);
        toast.error("An error occurred during signup.");
      })
    }
    catch (error) {
      console.error("Signup error: ", error);
      toast.error("An error occurred during signup. Please try again.");
    } 
    finally {
      setIsLoading(false);
    }

    //storing data on client side local storage for simulation purposes
    console.log("Signup data: ", data);

    // OPTIONAL: dispatch(login(data))
  };

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tippy content="Home" animation="fade" arrow={true}>
          <h2 className="title"><Link to="/">Ravenous</Link></h2>
        </Tippy>
        <div>
          <h2 className="title">Sign up</h2>
        </div>
        <div className="email-login">
          <label htmlFor="firstName"><b>First Name</b></label>
          <input type="text" placeholder="John" {...register("firstName")}/>
          
          <label htmlFor="lastName"><b>Last Name</b></label>
          <input type="text" placeholder="Doe" {...register("lastName")}/>
          
          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="name@abc.com" {...register("email")}/>
          
          <label htmlFor="phoneNumber"><b>Phone Number</b></label>
          <input type="text" placeholder="1234567890" {...register("phoneNumber")}/>
          
          <label htmlFor="designation"><b>Designation</b></label>
          <input type="text" placeholder="Your job title" {...register("designation")}/>
          
          <label htmlFor="password"><b>Password</b></label>
          <input type="password" placeholder="8+ characters" {...register("password")}/>
          
          <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
          <input type="password" placeholder="Repeat your password" {...register("confirmPassword")}/>
        </div>
        <button type="submit" className="cta-btn" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <p className="subtitle">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
};

export default SignupForm;