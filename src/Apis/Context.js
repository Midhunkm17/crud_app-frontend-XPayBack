import React, { createContext, useState } from 'react'

//view item
export const addResponseContext=createContext()
export const editResponseContext=createContext()
export const viewResponseContext=createContext()
function Context({children}) {
    const [addUpdate,setAddUpdate]=useState([])
    const [editUpdate,setEditUpdate]=useState([])
    const [viewItem,setViewItem]=useState([])
  return (
    <>
    <addResponseContext.Provider value={{addUpdate,setAddUpdate}}>
    <editResponseContext.Provider value={{editUpdate,setEditUpdate}}>
    <viewResponseContext.Provider value={{viewItem,setViewItem}}>
        {children}
    </viewResponseContext.Provider>
    </editResponseContext.Provider>
    </addResponseContext.Provider>
    </>
  )
}

export default Context