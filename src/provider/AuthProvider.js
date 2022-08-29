import { useContext ,  createContext,  } from "react";
import {useProvideAuth} from '../hook'
const initialState={
    user:null,
    login:()=>{},
    logout:()=>{},
    loading:true,
    signup: () => {},
    updateUser:()=>{},
    updateUserFriends:()=>{},

}

 export const AuthContext=createContext(initialState);

//  export  const AuthProvider=({childern})=>{
//         const auth=useProvideAuth();
//          return(<AuthContext.Provider value={auth}>{childern}</AuthContext.Provider>);
//  }
 export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  };
