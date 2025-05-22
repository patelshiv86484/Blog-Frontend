import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null,
}

const authslice=createSlice({
    name:'auth',
    initialState:initialState,//initialState:initialState
    reducers:{
        login:(state,action)=>{//action consist of .type(function name) and .payload(holds the data associated with that action)
             console.log(action.payload)
             state.status=true; 
             state.userData=action.payload
        },
        logout:(state)=>{
        state.status=false;
        state.userData=null;
        }
    }
})

export  const {login,logout}=authslice.actions
export default authslice.reducer//not reducers, only reducer