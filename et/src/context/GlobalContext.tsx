/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext, CSSProperties, useState } from "react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SyncLoader } from "react-spinners";

export const GlobalContext = React.createContext({} as any);

export const GlobalProvider = ({ children }: any) => {
    let [loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let [color, setColor] = useState("red");
    const override: CSSProperties = {
        margin: "0 auto",
        borderColor: "red",
    };

    //calculate incomes
    const showToastMsg = (type: string, msg: string) => {
        switch (type) {
            case ToastMsgType.SUCCESS:
                toast.success(msg);
                break;
            case ToastMsgType.INFO:
                toast.info(msg);
                break;
            case ToastMsgType.ERROR:
                toast.error(msg);
                break;
        }
    }

    return (
        <GlobalContext.Provider value={{
            showToastMsg,
            setLoading
        }}>
            {loading && <><div style={{
                position: "fixed",
                zIndex: "9999",
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center"

            }}>
                <SyncLoader	
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"

                />
            </div>
                <div
                    style={{
                        position: "fixed",
                        zIndex: "9998",
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        background: "black",
                        opacity: 0.2

                    }}
                ></div></>}
            {children}
        </GlobalContext.Provider >
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export enum ToastMsgType {
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success"
}