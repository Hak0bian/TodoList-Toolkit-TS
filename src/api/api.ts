import axios from "axios";
import { ITasks } from "../types";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const API = {
    getTodos(){
        return instance.get("/todos?_limit=5")
    },

    addTodo(newTask: ITasks){
        return instance.post("/todos", newTask)
    },

    updateTodo(id: number, newTitle: string){
        return instance.patch(`/todos/${id}`, {title: newTitle})
    },

    toggleComplete(id: number, completed: boolean){
        return instance.patch(`todos/${id}`, {completed: !completed})
    },

    deleteTodo(id: number){
        return instance.delete(`todos/${id}`)
    }
}