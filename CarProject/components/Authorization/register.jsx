import React, { useState } from 'react';
import firebase from 'firebase/app'; 
import 'firebase/auth'; 

if (!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig); 
}

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password); 

        const user = userCredential.user; 
        console.log('User registered: ', user); 
    } catch ( error ) {
        cosole.error('Error register: ', user.message); 
    }
  };

  return (
    <div className='auth-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" 
          placeholder="Your Full Name"
          id="name"
          name="name"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="pwd">Password</label>
        <input
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          type="password"
          placeholder="********"
          id="pwd"
          name="pwd"
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => props.onFormSwitch('register')}>Already have an account? Log in.</button>
    </div>
  );
};
