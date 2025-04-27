import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoStateType } from "../../types";


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

        addTask(state){
            state.tasks = [
                ...state.tasks,
                {
                    id: Date.now(),
                    title: state.text,
                    completed: false
                }
            ]
        },

        clearText(state){
            state.text = ""
        },

        clearAllTasks(state){
            state.tasks = []
        },

        updateTask(state, action: PayloadAction<{ id: number, newTitle: string }>) {
            const { id, newTitle } = action.payload;
            state.tasks = state?.tasks?.map((task) =>
                task.id === id ? { 
                        ...task, 
                        title: newTitle 
                    } 
                    : task
            );
        },

        toggleComplete(state, action: PayloadAction<number>){
            state.tasks = state?.tasks?.map((task) =>
                task.id === action.payload ? {
                    ...task,
                    completed: !task.completed
                }
                : task
            )
        },

        removeTaskAction(state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        }

    }
})

export const {changeText, addTask, clearText, clearAllTasks, updateTask, toggleComplete, removeTaskAction} = todoSlice.actions
export default todoSlice.reducer