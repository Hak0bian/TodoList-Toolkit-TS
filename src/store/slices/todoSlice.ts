import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoStateType } from "../../types";
import { getTodosThunk, addTaskThunk, updateTaskThunk, toggleCompleteThunk, removeTaskThunk } from "./todoThunks"


const initialState : TodoStateType = {
    text: "",
    tasks: []
}

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        changeText(state, action : PayloadAction<string>){
            state.text = action.payload
        },

        clearAllTasks(state){
            state.tasks = []
        }
    },


    extraReducers: (builder) => {
        builder.addCase(getTodosThunk.fulfilled, (state, action) => {
            state.tasks = action.payload
        })

        builder.addCase(addTaskThunk.fulfilled, (state, action) => {
            state.tasks = [...state.tasks, action.payload]
            state.text = ""
        })

        builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? { 
                        ...task, 
                        title: action.payload.title 
                    } 
                    : task
            );
        })

        builder.addCase(toggleCompleteThunk.fulfilled, (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? {
                    ...task,
                    completed: action.payload.completed
                }
                : task
            )
        })

        builder.addCase(removeTaskThunk.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        })
    }
})

export const {changeText, clearAllTasks} = todoSlice.actions
export default todoSlice.reducer