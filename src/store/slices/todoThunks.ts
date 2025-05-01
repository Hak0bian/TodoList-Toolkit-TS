import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../../api/api"
import { ITasks } from "../../types"

export const getTodosThunk = createAsyncThunk(
    "getTodosThunk",
    async () => {
        const res = await API.getTodos()
        return res.data
    }
)

export const addTaskThunk = createAsyncThunk(
    "addTaskThunk",
    async (newTask: ITasks) => {
        const res = await API.addTodo(newTask)
        return res.data
    }
)

export const updateTaskThunk = createAsyncThunk(
    "updateTaskThumk",
    async ({ id, newTitle }: { id: number, newTitle: string }) => {
        const res = await API.updateTodo(id, newTitle)
        return res.data
    }
)

export const toggleCompleteThunk = createAsyncThunk(
    "toggleCompleteThunk",
    async ({ id, completed }: { id: number, completed: boolean }) => {
        const res = await API.toggleComplete(id, completed)
        return res.data
    }
)

export const removeTaskThunk = createAsyncThunk(
    "removeTaskThunk",
    async (id: number) => {
        const res = await API.deleteTodo(id)
        return res.data
    }
)