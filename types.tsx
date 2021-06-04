
export type User = {
    id:String;
    name:String;
    imageUri:String;
    status:String;
}


export type Message = {
    id:String;
    content:string;
    createdAt:string;
    user:User;
}

export type ChatRoom = {
    id:String;
    users:User[];
    lastMessage:Message;
}