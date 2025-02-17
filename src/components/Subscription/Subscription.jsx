import React from 'react'
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'

function Subscription(props) {
  const[email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email){
      toast.error("Please enter your email address.")
    } 
    else{
      toast.success("You've been successfully subscribed!", {
        style: {
          border: '1px solid #cca353',
          padding: '16px',
          color: '#cca353'
        },
        iconTheme: {
          primary: '#cca353',
          secondary: 'FFFAEE'
        }
      });
      setEmail("")
    }
  }

  return (
    <div className="mx-auto">
      <div className="relative isolate overflow-hidden px-6 py-10 shadow bg-[#FFE7B9]">
        
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Keep Updated
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8">
          Keep pace with Hotel advancements! Join our mailing list for selective, noteworthy updates.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-x-4 ">
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email" 
            id="email-address" 
            name="email" 
            type="email" 
            className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-black shadow-sm  sm:text-sm sm:leading-6" 
          />

          <button 
            type="submit" 
            className="flex-none rounded-md bg-[#cca353] px-3.5 py-2.5 text-sm font-semibold border-0 text-white shadow-sm hover:bg-[#a7874b]"
          >
            Notify me
          </button>
        </form>

      </div>
      <Toaster/> 
    </div>
  );
}

export default Subscription;