import { createContext, useState } from "react";


const STATE = createContext({});

export const GlobalState = ({ children }:React.PropsWithChildren) => {

  const [commentCount,setCommentCount] = useState<number>(0)

  return (
    <STATE.Provider value={{ }}>{children}</STATE.Provider>
  );
};
export default STATE;
