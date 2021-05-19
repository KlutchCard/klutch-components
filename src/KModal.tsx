import React, { PropsWithChildren } from "react"
import { Modal, ModalProps, StyleSheet, View } from "react-native"


export const KModal: React.FC<ModalProps> =  ({style, children, ...props}: PropsWithChildren<ModalProps>) =>     
    <KModalContext.Provider value={{modal: true}}>
        <Modal statusBarTranslucent  {...props}>
            <View style={[st.modal, style]}>
                {children}
            </View>
        </Modal>
    </KModalContext.Provider>

export const KModalContext = React.createContext({modal: false})

export default KModal


const st = StyleSheet.create({
    modal: {
        marginBottom: 30
    }
})