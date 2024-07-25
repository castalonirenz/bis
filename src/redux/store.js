"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import user from "./reducer/user";



const rootReducer = combineReducers({
  user: user,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,

 });
