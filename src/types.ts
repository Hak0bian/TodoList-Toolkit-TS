export type ITasks = {
    userId? : number
    id : number,
    title : string,
    completed : boolean
}

export type TodoStateType = {
    text: string;
    tasks: ITasks[];
    loading: boolean;
    error: string | null;
}

export type TasksDivProps = {
    id: number;
    title: string;
    completed: boolean;
}