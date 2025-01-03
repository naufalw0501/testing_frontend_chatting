import { useContext, useState } from 'react';
import css from './ChatList.module.css';
import { useNavigate } from "react-router-dom";
import AppContext from '../../../Context';

const ChatList = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const setContextUserEntity = context.setContextUserEntity;
    const contextUserEntity = context.contextUserEntity
    const [chatList, setChatList] = useState<{ name: string, email: string, is_group: boolean, unread: number, last_chat: number, member: string[] }[]>([
        { name: "Naufal Wijaya", email: "naufal.wijaya9a@gmail.com", is_group: false, last_chat: 1, unread: 6, member: [] },
        { name: "Wijaya Naufal", email: "wijaya.naufal9a2@gmail.com", is_group: false, last_chat: 3, unread: 8, member: [] },
        { name: "M. Wijaya Naufal", email: "mwijaya.naufal9a3@gmail.com", is_group: false, last_chat: 0, unread: 10, member: [] },
    ])

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
                <div style={{ backgroundColor: "#F9F9F9", height: "35px", width: "35px", fontSize: "15px", fontWeight: "600", color: "#18837D", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    +
                </div>
            </div>

            {/* Filter */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", marginTop: "1.5dvh", alignItems: "center", padding: "0dvh 0dvw", backgroundColor: "white" }}>
                <div style={{ color: "#18837D", borderBottom: "4px solid #18837D", flex: "33%", padding: "0.5dvh 0dvw" }}>All</div>
                <div style={{ color: "#5F6368", borderBottom: "4px solid #E8E8E8", flex: "33%", padding: "0.5dvh 0dvw" }}>Groups</div>
                <div style={{ color: "#5F6368", borderBottom: "4px solid #E8E8E8", flex: "33%", padding: "0.5dvh 0dvw" }}>Unread</div>
            </div>

            {/* List Chat */}
            {chatList.map((account, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", gap: "10px", alignItems: "center", padding: "1.5dvh 5dvw", backgroundColor: "white", marginTop: "1.5dvh" }}>
                    <div style={{ backgroundColor: "#7B1FA2", height: "35px", width: "35px", fontSize: "17px", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                        {account.name[0].toUpperCase()}
                    </div>
                    <div style={{ flex: "40%", display: "flex", flexDirection: "column", textAlign: "left" }}>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>{account.name}</div>
                        <div style={{ color: "#5F6368", fontSize: "14px" }}>{account.email}</div>
                    </div>
                    <div style={{ flex: "30%", display: "flex", flexDirection: "column", textAlign: "right", alignItems: "end" }}>
                        <div style={{ fontSize: "12px" }}>{ account.last_chat === 0 ? "Today" : account.last_chat === 1 ? "Yesterday" : `${account.last_chat} days`}</div>
                        <div style={{ backgroundColor: "#18837D", height: "20px", width: "20px", fontSize: "10px", fontWeight: "600", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                            {account.unread}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ChatList;
