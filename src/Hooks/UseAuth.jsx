import React, { useContext } from 'react';
import { AuthContext } from '../Page/Contexts/AuthContext';


const UseAuth = () => {
  
    const authInfo = useContext(AuthContext)
    return authInfo

};

export default UseAuth;