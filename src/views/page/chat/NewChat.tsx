import { useContext, useEffect, useState } from 'react';
import css from './NewChat.module.css';
import { useNavigate } from "react-router-dom";
import AppContext from '../../../Context';
import { ChatListEntity } from '../../../data/entity/ChatEntity';
import { IoChevronBack } from "react-icons/io5";

const NewChat = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const setContextUserEntity = context.setContextUserEntity;
    const contextUserEntity = context.contextUserEntity;

    const [usernameInput, setUsernameInput] = useState<string>("");

    const generateData = async () => {
        try {
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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", marginTop: "3dvh" }}>
                <div style={{ cursor: "pointer", padding: "5px 10px", border: "1px solid silver", borderRadius: "3px", color: "#18837D", fontWeight: "500" }}
                    onClick={() => { navigate(-1) }}
                ><IoChevronBack /></div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>Chatting</div>
                <div>&nbsp;</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", position: "relative", width: "90dvw", height: "75dvh", backgroundColor: "white", marginTop: "5dvh", borderRadius: "5px" }}>
                <div style={{ margin: "1dvh 2dvw", fontSize: "16px", fontWeight: "600" }}>Input Username</div>
                <div style={{ margin: "0.5dvh 2dvw", fontSize: "14px" }}>Input Username</div>
                <input style={{ margin: "0.5dvh 2dvw", border: "1px solid silver", padding: "5px", borderRadius: "5px", width: "86dvw" }}
                    type='text' placeholder='input username' value={usernameInput}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setUsernameInput(event.target.value) }}
                />
                <button style={{ backgroundColor: "#18837D", marginTop: "3dvh", padding: "1dvh 1dvw", width: "86dvw", borderRadius: "10px", color: "white", position: "absolute", bottom: "1dvh", margin: "0dvh 2dvw" }}
                    onClick={() => {
                        navigate('/chat/chatting', {
                            state: { name: usernameInput }
                        });
                    }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default NewChat;
