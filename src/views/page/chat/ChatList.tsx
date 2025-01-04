import { useContext, useEffect, useState } from 'react';
import css from './ChatList.module.css';
import { useNavigate } from "react-router-dom";
import AppContext from '../../../Context';
import { ChatListEntity } from '../../../data/entity/ChatEntity';

const ChatList = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const setContextUserEntity = context.setContextUserEntity;
    const contextUserEntity = context.contextUserEntity;

    const [cacheChatList, setCacheChatList] = useState<ChatListEntity[]>([]);

    const [chatList, setChatList] = useState<ChatListEntity[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');

    const truncateString = (str: string, length: number) => {
        return str.length > length ? str.substring(0, length) + "..." : str;
    }

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);

        if (filter === 'Groups') {
            setChatList(cacheChatList.filter(chat => chat.is_group));
        } else if (filter === 'Unread') {
            setChatList(cacheChatList.filter(chat => chat.unread > 0));
        } else {
            setChatList(cacheChatList);
        }
    }

    const generateData = async () => {
        try {
            const data_from_api = [
                { name: "Deden Iqbal", email: "deden.iqbal9b@gmail.com", is_group: false, last_chat: 1, unread: 6, member: [] },
                { name: "Muhammad Afif", email: "muhammad.afif9c@gmail.com", is_group: false, last_chat: 3, unread: 8, member: [] },
                { name: "Arif Wicaksana", email: "arif.wicaksana9d@gmail.com", is_group: false, last_chat: 0, unread: 0, member: [] },
                { name: "9A Class", email: "", is_group: true, last_chat: 0, unread: 30, member: ["Deden", "Eka", "Doni", "Sifa", "Alfi", "Felix", "Rafi"] },
                { name: "Ekstrakulikuler Voli", email: "", is_group: true, last_chat: 0, unread: 30, member: ["Afif", "Yogi", "Dwi"] },
            ]
            setCacheChatList(data_from_api)
            setChatList(data_from_api)
        } catch (error: any) {
            //Alert If Get Data Error
        }
    }

    useEffect(() => {
        generateData()
        // eslint-disable-next-line
    }, []);

    return (
        <div className={css.container}>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#18837D", textAlign: "left", padding: "1dvh 0dvw", width: "90dvw" }}>Chats</div>

            {/* Profile */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", gap: "10px", alignItems: "center", padding: "1.5dvh 5dvw", backgroundColor: "white" }}>
                <div style={{ backgroundColor: "#7B1FA2", height: "35px", width: "35px", fontSize: "17px", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    {contextUserEntity?.name ? contextUserEntity.name[0].toUpperCase() : ""}
                </div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>{contextUserEntity?.name}</div>
                    <div style={{ color: "#5F6368", fontSize: "14px" }}>{contextUserEntity?.email}</div>
                </div>
                <div onClick={() => { navigate("/chat/new_chat") }} style={{ cursor: "pointer", backgroundColor: "#F9F9F9", height: "35px", width: "35px", fontSize: "15px", fontWeight: "600", color: "#18837D", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    +
                </div>
            </div>

            {/* Filter */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", marginTop: "1.5dvh", alignItems: "center", padding: "0dvh 0dvw", backgroundColor: "white" }}>
                <div
                    onClick={() => handleFilterChange('All')}
                    style={{ cursor: "pointer", color: selectedFilter === 'All' ? "#18837D" : "#5F6368", borderBottom: selectedFilter === 'All' ? "4px solid #18837D" : "4px solid #E8E8E8", flex: "33%", padding: "0.5dvh 0dvw" }}
                >
                    All
                </div>
                <div
                    onClick={() => handleFilterChange('Groups')}
                    style={{ cursor: "pointer", color: selectedFilter === 'Groups' ? "#18837D" : "#5F6368", borderBottom: selectedFilter === 'Groups' ? "4px solid #18837D" : "4px solid #E8E8E8", flex: "33%", padding: "0.5dvh 0dvw" }}
                >
                    Groups
                </div>
                <div
                    onClick={() => handleFilterChange('Unread')}
                    style={{ cursor: "pointer", color: selectedFilter === 'Unread' ? "#18837D" : "#5F6368", borderBottom: selectedFilter === 'Unread' ? "4px solid #18837D" : "4px solid #E8E8E8", flex: "33%", padding: "0.5dvh 0dvw" }}
                >
                    Unread
                </div>
            </div>

            {/* List Chat */}
            {chatList.map((account, index) => (
                <div key={index} style={{ cursor: "pointer", display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", gap: "10px", alignItems: "center", padding: "1.5dvh 5dvw", backgroundColor: "white", marginTop: "1.5dvh" }}
                    onClick={() => {
                        navigate('/chat/chatting', {
                            state: { name: account.name, email : account.email }
                        });
                    }}
                >
                    <div style={{ backgroundColor: "#7B1FA2", height: "35px", width: "35px", fontSize: "17px", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                        {account.name[0].toUpperCase()}
                    </div>
                    <div style={{ flex: "40%", display: "flex", flexDirection: "column", textAlign: "left" }}>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>{account.name}</div>
                        <div style={{ color: "#5F6368", fontSize: "14px" }}>
                            {account.is_group
                                ? truncateString(account.member.join(", "), 20)
                                : account.email
                            }
                        </div>
                    </div>
                    <div style={{ flex: "30%", display: "flex", flexDirection: "column", textAlign: "right", alignItems: "end" }}>
                        <div style={{ fontSize: "12px" }}>{account.last_chat === 0 ? "Today" : account.last_chat === 1 ? "Yesterday" : `${account.last_chat} days`}</div>
                        <div style={{ backgroundColor: "#18837D", height: "20px", width: "20px", fontSize: "10px", fontWeight: "600", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                            {account.unread}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatList;
