import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITasks, TodoStateType } from "../../types";
import { getTodosThunk, addTaskThunk, updateTaskThunk, toggleCompleteThunk, removeTaskThunk } from "./todoThunks"


const initialState : TodoStateType = {
    text: "",
    tasks: [],
    loading: false,
    error: ""
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
        // getTodosThunk
        builder.addCase(getTodosThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Fetching Error";
        })
        builder.addCase(getTodosThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        builder.addCase(getTodosThunk.fulfilled, (state, action: PayloadAction<ITasks[]>) => {
            state.tasks = action.payload
            state.loading = false
        })

        // addTaskThunk
        builder.addCase(addTaskThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error adding task";
        })
        builder.addCase(addTaskThunk.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(addTaskThunk.fulfilled, (state, action: PayloadAction<ITasks>) => {
            state.tasks = [...state.tasks, action.payload];
            state.text = "";
            state.loading = false;
        })
        
        // updateTaskThunk
        builder.addCase(updateTaskThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error updating task";
        })
        builder.addCase(updateTaskThunk.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(updateTaskThunk.fulfilled, (state, action: PayloadAction<ITasks>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id
                    ? {
                          ...task,
                          title: action.payload.title,
                      }
                    : task
            );
            state.loading = false;
        })

        // toggleCompleteThunk
        builder.addCase(toggleCompleteThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error updating task completion";
        })
        builder.addCase(toggleCompleteThunk.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(toggleCompleteThunk.fulfilled, (state, action: PayloadAction<ITasks>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id
                ? {
                        ...task,
                        completed: action.payload.completed,
                    }
                : task
            );
            state.loading = false;
        })
        
        // removeTaskThunk
        builder.addCase(removeTaskThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error removing task";
        })
        builder.addCase(removeTaskThunk.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(removeTaskThunk.fulfilled, (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            state.loading = false;
        })
    }
})

export const {changeText, clearAllTasks} = todoSlice.actions
export default todoSlice.reducer