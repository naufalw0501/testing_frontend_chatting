import { useLocation } from "react-router-dom";
import "./Navbar.css";
import { IoIosChatboxes, IoMdSettings } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Navbar(props: { [key: string]: any }) {
    //--------STATES VIEW--------//

    const location = useLocation()
    const navigate = useNavigate();

    //--------STATES VIEW--------//
    //---------FUNCTIONS---------//
    //---------FUNCTIONS---------//
    return (
        <>
            <div style={{ display: (location.pathname === "/" || location.pathname === "/chat/chatting") ? "none" : "flex" }}>
                <div className="container-navbar">
                    <button onClick={()=> navigate('/chat')} style={{color : ((location.pathname.startsWith("/chat") ? "#18837D" : "#5F6368"))}}>
                        <IoIosChatboxes size={24} />
                        <div>Chat</div>
                    </button>
                    <button onClick={()=> navigate('/setting')} style={{color : ((location.pathname.startsWith("/setting") ? "#18837D" : "#5F6368"))}}>
                        <IoMdSettings size={24} />
                        <div>Setting</div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;