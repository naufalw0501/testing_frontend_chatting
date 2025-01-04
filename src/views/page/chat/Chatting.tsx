import { useContext, useEffect, useState } from 'react';
import css from './Chatting.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from '../../../Context';
import { IoChevronBack } from "react-icons/io5";
import { HiDotsVertical, HiOutlineChatAlt } from "react-icons/hi";
import { ChattingEntity } from '../../../data/entity/ChatEntity';
const Chatting = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const setContextUserEntity = context.setContextUserEntity;
    const contextUserEntity = context.contextUserEntity;
    const location = useLocation();
    const name: string | undefined = location.state?.name;
    const email: string | undefined = location.state?.email;
    const [chatting, setChatting] = useState<ChattingEntity[]>([])
    const [inputChat, setInputChat] = useState<string>("")

    const handleAddMessage = () => {
        if (inputChat.trim()) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const newMessage = {
                name: "You",
                message: inputChat,
                time: currentTime
            };

            setChatting(prevChatting => {
                const updatedChatting = prevChatting.map(chat => {
                    if (chat.date.startsWith("Today")) {
                        return {
                            ...chat,
                            list_chat: [...chat.list_chat, newMessage]
                        };
                    }
                    return chat;
                });

                return updatedChatting;
            });

            setInputChat(""); 
        }
    };

    const generateData = async () => {
        try {
            let get_chatting = [
                {
                    date: "Sunday, July 15",
                    list_chat: [
                        {
                            name: name ?? "",
                            message: "Halo, saya mendapat laporan dari pengguna, ada yang bisa saya bantu?",
                            time: "13:30"
                        }, {
                            name: "You",
                            message: "Halo, saya butuh bantuan di bagian A",
                            time: "13:32"
                        },
                    ]
                },
                {
                    date: "Today, July 17",
                    list_chat: [
                        {
                            name: name ?? "",
                            message: "Halo, saya mendapat laporan dari pengguna, ada yang bisa saya bantu?",
                            time: "13:30"
                        }
                    ]
                },
            ]
            setChatting(get_chatting)
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
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "90dvw", marginTop: "3dvh" }}>
                <div style={{ cursor: "pointer", padding: "5px 10px", border: "1px solid silver", borderRadius: "3px", color: "#18837D", fontWeight: "500" }}
                    onClick={() => { navigate(-1) }}
                ><IoChevronBack />
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px", alignItems: "center", width: "60dvw" }}>
                        <div style={{ backgroundColor: "#7B1FA2", height: "35px", width: "35px", fontSize: "17px", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                            {name ? name[0].toUpperCase() : ""}
                        </div>
                        <div style={{ flex: "40%", display: "flex", flexDirection: "column", textAlign: "left" }}>
                            <div style={{ fontWeight: "600", fontSize: "14px" }}>{name}</div>
                            <div style={{ color: "#5F6368", fontSize: "14px" }}>
                                {email ? email : name ? name.toLowerCase().replace(/\s+/g, '.') + "@gmail.com" : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ cursor: "pointer", padding: "5px 10px", border: "1px solid silver", borderRadius: "3px", color: "#18837D", fontWeight: "500" }}><HiDotsVertical /></div>
            </div>

            {/* Chatting */}
            <div style={{ maxHeight: "80dvh", overflowY: "auto" }}>
                {chatting.map((chat, index) => (
                    <div key={index}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90dvw" }}>
                            <div style={{ flex: 1, backgroundColor: "#8593A8", height: "2px" }}></div>
                            <div style={{ flex: 1, color: "#8593A8" }}>{chat.date}</div>
                            <div style={{ flex: 1, backgroundColor: "#8593A8", height: "2px" }}></div>
                        </div>
                        {chat.list_chat.map((message, idx) => (
                            <div key={idx} style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: message.name === "You" ? "flex-end" : "flex-start", // Conditional alignment
                                marginBottom: "10px",
                            }}>
                                <div style={{
                                    width: "90dvw",
                                    textAlign: message.name === "You" ? "right" : "left", // Conditional text alignment
                                    fontWeight: "500",
                                    color: "#18837D"
                                }}>
                                    {message.name}
                                </div>
                                <div style={{
                                    backgroundColor: message.name === "You" ? "#18837D" : "white",
                                    color: message.name === "You" ? "white" : "black",
                                    maxWidth: "80dvw",
                                    borderRadius: message.name === "You" ? "15px 15px 0px 15px" : "15px 15px 15px 0px", // Adjust bubble corners for 'You'
                                    textAlign: message.name === "You" ? "right" : "left", // Conditional message alignment
                                    padding: "10px",
                                    marginLeft: message.name === "You" ? "auto" : "0", // Move 'You' message to the right
                                }}>
                                    <div>{message.message}</div>
                                    <div style={{ fontSize: "12px", color: "#5F6368" }}>{message.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", position: "fixed", bottom: "0px", height: "10dvh", width: "100dvw", borderRadius: "10px 10px 0px 0px", padding: "0dvh 10dvw", }}>
                <div style={{ cursor: "pointer", color: "#5F6368", fontSize: "20px", fontWeight: "700" }}>+</div>
                <input type='text' placeholder='Text Message' value={inputChat} style={{ backgroundColor: '#F9F9F9', padding: "10px", borderRadius: "5px" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInputChat(event.target.value) }}
                />
                <div
                    onClick={() => { handleAddMessage() }}
                    style={{ cursor: "pointer", color: "#5F6368", fontSize: "20px" }}><HiOutlineChatAlt /></div>
            </div>
        </div>
    );
}

export default Chatting;
