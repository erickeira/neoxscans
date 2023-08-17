import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useState, createContext, useEffect, useRef} from "react";
export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [library, setLibrary] = useState(null)
    useEffect(() => {
        handleCheckLibrary()
    },[])   

    async function handleCheckLibrary(){
        const storageLibrary = await AsyncStorage.getItem('library')
        if(!storageLibrary){
          await AsyncStorage.setItem('library', 'neox')
          setLibrary('neox')
        }else{
          setLibrary(storageLibrary)
        }
    }

      
    return(
        <AuthContext.Provider 
            value={{
                library,
                handleCheckLibrary
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}