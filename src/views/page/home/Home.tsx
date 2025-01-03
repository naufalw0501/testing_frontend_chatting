import { useContext, useState } from 'react';
import css from './Home.module.css';
import { AuthService } from '../../../data/service/AuthService';
import backgroundImage from "../../asset/image/Backgorund.png"
import logoImage from "../../asset/image/Logo_Were_Chatting.png"
import onlyLogoImage from "../../asset/image/only_logo_were_chatting.png"
import googleImage from "../../asset/image/logo_google.png"
import { useNavigate } from "react-router-dom";
import AppContext from '../../../Context';
import Backdrop from '../../component/backdrop/Backdrop';
import { MdOutlineAccountCircle } from 'react-icons/md';

const Home = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const setContextUserEntity = context.setContextUserEntity;
    const [accountList, setAccountList] = useState<{ name: string, email: string }[]>([
        { name: "Naufal Wijaya", email: "naufal.wijaya9a@gmail.com" },
        { name: "Wijaya Naufal", email: "wijaya.naufal9a2@gmail.com" },
    ])
    const [stepPopup, setStepPopup] = useState<number>(1)
    const [showPopupStep, setShowPopupStep] = useState<boolean>(true)
    const [showPopupLogin, setShowPopupLogin] = useState<boolean>(false)

    const handleClickLogin = async (name: string, email: string) => {
        try {
            const result = await AuthService.login(name, email);
            if (result.name != null) {
                navigate('/chat');
                setContextUserEntity(result)
            }
        } catch (error: any) {
        }
    }

    return (
        <div className={css.container} style={{ backgroundColor: (showPopupStep ? "#F9F9F9" : "white") }}>

            {/* Logo Image */}
            <img src={logoImage} className={css.logoImage} />

            {/* Text If Popup Step Done Or Skipped */}
            {showPopupStep === false && showPopupLogin === false &&
                <>
                    <div style={{ zIndex: 4, marginTop: "2dvh", fontSize: "20px", color: "#252A30", fontWeight: "600", padding: "0dvh 15dvw" }}>Selamat datang di Aplikasi Were Chatting</div>
                    <button style={{ zIndex: 4, marginTop: "2dvh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#F2F8FD", width: "80%", padding: "1dvh 0dvw", borderRadius: "5px" }}
                        onClick={() => { setShowPopupLogin(true) }}
                    >
                        <img src={googleImage} style={{ height: "4dvh" }} />
                        <div style={{ color: "#5F6368" }}>Lanjutkan Dengan Google</div>
                    </button>
                </>
            }

            {/* Background Image */}
            <img src={backgroundImage} className={css.backgroundImage} />

            {/* Popup Step */}
            <div className={css.popupStep} id={showPopupStep ? undefined : css.hide} style={{ textAlign: "center" }}>
                {/* Message Step */}
                <div style={{ padding: "2dvh 10dvw" }}>
                    <div style={{ textAlign: "center", color: "#18837D", fontSize: "20px", fontWeight: "600" }}>Lorem ipsum dolor sit amet</div>
                    {stepPopup == 1 ?
                        <div style={{ fontSize: "16px", color: "#5F6368" }}>Atur manajemen kampanyemu dengan mudah</div>
                        : stepPopup == 2 ?
                            <div style={{ fontSize: "16px", color: "#5F6368" }}>Dive into a world of blissful massage services tailored to your preferences</div>
                            :
                            <div style={{ fontSize: "16px", color: "#5F6368" }}>Dive into a world of blissful massage services tailored to your preferences 2</div>
                    }
                </div>
                {/* Indicator Step */}
                <div style={{ display: "flex", flexDirection: "row", width: "20dvw", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                    <div style={{ flex: (stepPopup == 1 ? "50%" : "25%"), height: "5px", backgroundColor: (stepPopup == 1 ? "#18837D" : "#DFE0F3"), borderRadius: "2px" }}></div>
                    <div style={{ flex: (stepPopup == 2 ? "50%" : "25%"), height: "5px", backgroundColor: (stepPopup == 2 ? "#18837D" : "#DFE0F3"), borderRadius: "2px" }}></div>
                    <div style={{ flex: (stepPopup == 3 ? "50%" : "25%"), height: "5px", backgroundColor: (stepPopup == 3 ? "#18837D" : "#DFE0F3"), borderRadius: "2px" }}></div>
                </div>
                {/* Button */}
                <button style={{ backgroundColor: "#18837D", marginTop: "3dvh", padding: "1dvh 1dvw", width: "70dvw", borderRadius: "10px", color: "white" }}
                    onClick={() => {
                        if (stepPopup < 3) {
                            setStepPopup((prevStep) => prevStep + 1);
                        } else {
                            setShowPopupStep(false);
                        }
                    }}
                >
                    Next
                </button>
                <button style={{ marginTop: "3dvh", padding: "1dvh 1dvw", width: "70dvw", borderRadius: "10px", color: "#18837D" }}
                    onClick={() => setShowPopupStep(false)}
                >
                    Skip
                </button>
            </div>

            {/* Popup Login */}
            {showPopupLogin && <Backdrop close={() => setShowPopupLogin(false)} />}
            <div className={css.popupLogin} id={showPopupLogin ? undefined : css.hide} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", borderBottom: "1px solid silver", paddingBottom: "1dvh" }}>
                    <img src={googleImage} style={{ height: "3dvh" }} />
                    <div style={{ color: "#5F6368" }}>Lanjutkan Dengan Google</div>
                </div>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: "1.5dvh" }}>
                    <img src={onlyLogoImage} style={{ width: "20dvw" }} />
                    <div style={{ fontSize: "20px", fontWeight: "400" }}>Choose an account</div>
                    <div>to continue to <span style={{ color: "#18837D", fontWeight: "600" }}> Were Chatting </span></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0dvh 20dvw", marginTop: "1.5dvh" }}>
                    {accountList.map((account, index) => (
                        <button key={index} style={{ display: "flex", flexDirection: "row", width: "70dvw", borderBottom: "2px solid silver", gap: "10px", alignItems: "center", padding: "0.5dvh 0dvw", }}
                            onClick={() => { handleClickLogin(account.name, account.email) }}
                        >
                            <div style={{ backgroundColor: "#7B1FA2", height: "35px", width: "35px", fontSize: "17px", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                                {account.name[0].toUpperCase()}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                                <div style={{ fontWeight: "600", fontSize: "14px" }}>{account.name}</div>
                                <div style={{ color: "#5F6368", fontSize: "14px" }}>{account.email}</div>
                            </div>
                        </button>
                    ))}
                    <div style={{ display: "flex", flexDirection: "row", width: "70dvw", borderBottom: "2px solid silver", gap: "10px", alignItems: "center", padding: "0.5dvh 0dvw" }}>
                        <MdOutlineAccountCircle style={{ fontSize: "35px", color: "#5F6368" }} />
                        <div style={{ fontWeight: "500" }}>Use Another Account</div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "0dvh 5dvw", fontSize: "12px", marginTop: "2.5dvh", color: "#757575", fontWeight: "500" }}>
                    <div>English (United States)</div>
                    <div style={{ display: "flex", flexDirection: 'row', gap: "5px" }}>
                        <div>Help</div>
                        <div>Privacy</div>
                        <div>Terms</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
