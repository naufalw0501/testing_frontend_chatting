import { useContext, useState } from 'react';
import css from './Setting.module.css';
import { AuthService } from '../../../data/service/AuthService';
import { useNavigate } from "react-router-dom";
import AppContext from '../../../Context';
import { TbTriangleFilled } from "react-icons/tb";
import { MdOutlineAccountCircle } from 'react-icons/md';
import { RiLockPasswordLine } from "react-icons/ri";

const Setting = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const setContextUserEntity = context.setContextUserEntity;
    const contextUserEntity = context.contextUserEntity

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setContextUserEntity(null)
        } catch (error: any) {
        } finally {
        }
    }

    return (
        <div className={css.container}>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#18837D", textAlign: "left", padding: "1dvh 0dvw", width: "90dvw" }}>
                Setting
            </div>

            {/* Profile */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", gap: "10px", alignItems: "center", padding: "1.5dvh 5dvw", backgroundColor: "white" }}>
                <div style={{ backgroundColor: "#7B1FA2", height: "35px", width: "35px", fontSize: "17px", color: "white", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    {contextUserEntity?.name ? contextUserEntity.name[0].toUpperCase() : ""}
                </div>
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <div style={{ fontWeight: "600", fontSize: "14px" }}>{contextUserEntity?.name}</div>
                    <div style={{ color: "#5F6368", fontSize: "14px" }}>{contextUserEntity?.email}</div>
                </div>
                <div style={{ height: "35px", width: "35px", fontSize: "15px", fontWeight: "600", color: "#7E7E81", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <TbTriangleFilled style={{ rotate: "90deg" }} />
                </div>
            </div>

            {/* Change Username */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", gap: "10px", alignItems: "center", padding: "1.5dvh 5dvw", backgroundColor: "white", marginTop: "1.5dvh" }}>
                <MdOutlineAccountCircle style={{ fontSize: "25px", color: "#5F6368" }} />
                <div style={{ fontWeight: "500" }}>Use Another Account</div>
                <div style={{ height: "35px", width: "35px", fontSize: "15px", fontWeight: "600", color: "#7E7E81", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <TbTriangleFilled style={{ rotate: "90deg" }} />
                </div>
            </div>

            {/* Change Password */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90dvw", gap: "10px", alignItems: "center", padding: "1.5dvh 5dvw", backgroundColor: "white", marginTop: "1.5dvh" }}>
                <RiLockPasswordLine style={{ fontSize: "25px", color: "#5F6368" }} />
                <div style={{ fontWeight: "500" }}>Use Another Account</div>
                <div style={{ height: "35px", width: "35px", fontSize: "15px", fontWeight: "600", color: "#7E7E81", padding: "5px", borderRadius: "50%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <TbTriangleFilled style={{ rotate: "90deg" }} />
                </div>
            </div>

            {/* Logout*/}
            <button style={{ position: "fixed", bottom: "12dvh", backgroundColor: "white", marginTop: "3dvh", padding: "1dvh 1dvw", width: "90dvw", borderRadius: "5px", color: "#18837D" }}
                onClick={() => { handleLogout() }}
            >
                Logout
            </button>
        </div>
    )
}

export default Setting;
