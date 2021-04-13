import React from "react"
import { Modal, ModalProps } from "react-native"


export const KModal: React.FC<ModalProps> =  (props: ModalProps) =>     
    <KModalContext.Provider value={{modal: true}}>
        <Modal statusBarTranslucent {...props} />
    </KModalContext.Provider>

export const KModalContext = React.createContext({modal: false})

export default KModal