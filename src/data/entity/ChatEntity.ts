class ChatListEntity {
    name: string;
    email: string;
    is_group: boolean;
    unread: number;
    last_chat: number;
    member: string[]

    constructor(object: ChatListEntity) {
        this.name = object.name;
        this.email = object.email;
        this.is_group = object.is_group;
        this.unread = object.unread;
        this.last_chat = object.last_chat;
        this.member = object.member;
    }
}

class ChattingEntity {
    date: string;
    list_chat : MessageEntity[]

    constructor(object: ChattingEntity) {
        this.date = object.date;
        this.list_chat = object.list_chat;
    }
}

class MessageEntity {
    name: string;
    message : string;
    time: string;

    constructor(object: MessageEntity) {
        this.name = object.name;
        this.message = object.message;
        this.time = object.time;
    }
}

export { ChatListEntity, ChattingEntity, MessageEntity };