import { createContext, useContext, useEffect, useState } from "react";
import useTask from "../hooks/useTasks";

const GlobalContext = createContext()

const api = import.meta.env.VITE_API_URL

function GlobalProvider({ children }) {

    const [tasks, addTask, removeTask, updateTask] = useTask()

    const globalProviderValue = {
        tasks, addTask, removeTask, updateTask
    }

    return (
        <GlobalContext.Provider value={globalProviderValue}>
            {children}
        </GlobalContext.Provider>
    )
}


function useGlobalContext() {
    return useContext(GlobalContext)
}


export { useGlobalContext, GlobalProvider }