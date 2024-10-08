import { createContext, ReactNode, useState } from "react";


const STATE = createContext({
  login:false,
  signup:false,
  logout:false,
 loginTrue:()=>{},
 loginFalse:()=>{},
 signupFalse:()=>{},
 signupTrue:()=>{},
 logoutTrue:()=>{},
 logoutFalse:()=>{},
});

export const GlobalState = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [logout, setLogout] = useState(false);
  const loginFalse=()=>{
    if(login){
        setLogin(false)
    }
    return;
  }
  const loginTrue=()=>{
    if(!login){
        setLogin(true)
    }
    return;
  }
  const signupFalse=()=>{
    if(signup){
        setSignup(false)
    }
    return;
  }
  const signupTrue=()=>{
    if(!signup){
        setSignup(true)
    }
    return;
  }
  const logoutFalse=()=>{
    if(logout){
        setLogout(false)
    }
    return;
  }
  const logoutTrue=()=>{
    if(!logout){
        setLogout(true)
    }
    return;
  }

  return (
    <STATE.Provider value={{ login, setLogin, loginFalse, loginTrue, signup, setSignup, signupFalse, signupTrue, logout, setLogout, logoutFalse, logoutTrue, }}>{children}</STATE.Provider>
  );
};
export default STATE;
