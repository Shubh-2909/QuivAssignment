import React, { useState } from 'react';
import { Provider } from 'react-redux';

import toast from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useLoginMutation } from '../../redux/api/userAPI';
import store from '../../redux/store';

const Firebase = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName,
        email: user.email,
        username,
        password,
      });
      if ('data' in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const message = error.data;
        toast.error(message.message);
      }
      console.log(user);
    } catch (error) {
      toast.error('Sign In Failed');
    }
  };

  return (
    <div className="login flex flex-col gap-5 items-center justify-center h-screen">
      <main className="flex flex-col items-center">
        <h1 className="heading text-white">Login</h1>
        <div>
          <label className="text-white">Username</label>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div>
          <label className="text-white">Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <p className="text-white">Or Signed In With Google</p>
          <button onClick={loginHandler} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md">
            <FcGoogle className="mr-2" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

const FirebaseWrapper = () => (
  <Provider store={store}>
    <Firebase />
  </Provider>
);

export default FirebaseWrapper;
