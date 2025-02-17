import React from 'react';
import './Forms.css';
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from 'react-router-dom';
//IMPORT THE LINK FROM REACH ROUTER DOM
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const LoginForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!email) {
        toast.error("Please enter your email address.");
        return;
      }
      toast.success("You've been successfully subscribed!", {
        style: {
          border: '1px solid #cca353',
          padding: '16px',
          color: '#cca353',
        },
        iconTheme: {
          primary: '#cca353',
          secondary: '#FFFAEE',
        },
      });
      setEmail(""); // Reset email field after submission
    };
    return (
        <>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <Tippy content="Home" animation="fade" arrow={true}>
                        <h2 className="title"><Link to="/" >Ravenous</Link></h2>
                    </Tippy>
                    <p className="or"><span></span></p>
                    <div>
                        <h2 className="title"> Login</h2>
                    </div>
                    <div className="email-login">
                        <label htmlFor="email"> <b>Email</b></label>
                        <input type="text" placeholder="name@abc.com" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="8+ (a, A, 1, #)" name="password" />
                    </div>
                    <button className="cta-btn">Login</button>
                    <Link className="forget-pass" to="/signup">Create an Account</Link>
                </form>
            </div>
        </>
    );

}
 
export default LoginForm;