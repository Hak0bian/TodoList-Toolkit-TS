type ITasks = {
    userId? : number
    id : number,
    title : string,
    completed : boolean
}

export type TodoStateType = {
    text : string,
    tasks : Array<ITasks>,
}

export type TasksDivProps = {
    id: number;
    title: string;
    completed: boolean;
}