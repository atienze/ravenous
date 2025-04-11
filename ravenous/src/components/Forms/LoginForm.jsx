import React from 'react';
import './Forms.css';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, Outlet } from 'react-router-dom';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice'

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email format"}).nonempty({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm
  ({  
    resolver: zodResolver(formSchema)
  })
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((key, index) => {
      setTimeout(() => {
        toast.error(errors[key].message);
      }, (index + 1) * 1000);
    });
  }, [errors]);


  const onSubmit = (data) => {
    setIsLoading(true);

    try{
      fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      .then(response => {
        if(response.ok){
          return response.json();
        }
      })
      .then((data) => {
        dispatch(login(data.user));
        toast.success("Login successful.")
        navigate("/account");
      })
      .catch(err => {
        toast.error(`Login failed: ${err.message}`);
      })
    }
    catch (err) {
      toast.error("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tippy content="Home" animation="fade" arrow={true}>
            <h2 className="title">
              <Link to="/">Ravenous</Link>
            </h2>
          </Tippy>
          <p className="or">
            <span></span>
          </p>
          <div>
            <h2 className="title"> Login</h2>
          </div>
          <div className="email-login">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="name@abc.com"
              name="email"
              {...register("email")}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="8+ (a, A, 1, #)"
              {...register("password")}
              name="password"
            />
          </div>
          <button className="cta-btn" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
          <Link className="forget-pass" to="/signup">
            Create an Account
          </Link>
        </form>
      </div>
      <Outlet />
    </>
  );
};
 
export default LoginForm;