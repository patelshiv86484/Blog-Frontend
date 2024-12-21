import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authslice.js"
const store=configureStore({
    reducer:{
        auth: authSlice//authslice handle's authentication store as data is stored in initial state of authslice.
        //TODO: add more slices here for posts
    }
})
export default store