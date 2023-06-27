import { useState } from "react";
import { supabase } from "../supabase/supabase";


const Login = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await supabase.auth.signInWithOtp({
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div className="box-login">
      <h1>Login</h1>
      <form className="form-login" onSubmit={handleSubmit}>
        <input
          className="input-login"
          type="email"
          name="email"
          placeholder="emailexample13@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-login">send</button>
      </form>
    </div>
  );
};

export default Login;
