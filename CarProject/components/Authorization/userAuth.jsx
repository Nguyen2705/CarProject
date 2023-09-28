import React, {useEffect} from "react";
import { getAuth, onAuthStateChange, User} from "firebase/auth"

const auth = getAuth(); 

export function useAuth() {
    const [user, setUser] = React.useState<User>(); 

    
}