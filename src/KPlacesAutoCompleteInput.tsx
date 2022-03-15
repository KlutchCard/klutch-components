import { Address } from "@klutch-card/klutch-js"
import axios from "axios"
import Constants from 'expo-constants'
import React, { useState } from "react"
import { View, StyleSheet, Pressable, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native"
import KlutchTheme from "./KlutchTheme"
import KText from "./KText"
import KTextInput, { KTextInputProps } from "./KTextInput"


export interface KPlacesAutoCompleteInputProps extends KTextInputProps {
    onAddressCompleted?: (address: Address) => void
}

type AutoComplete = Array<{name: string, placeId: string}>

export const KPlacesAutoCompleteInput: React.FC<KPlacesAutoCompleteInputProps> = 
    React.forwardRef(({onAddressCompleted, onChangeText, onSubmitEditing, ...props}: KPlacesAutoCompleteInputProps, ref) => {

    const [predictions, setPredictions] = useState<AutoComplete>([])

    const autoCompleteChangeText = (text: string) => {
        getAutoComplete(text).then(pr => setPredictions(pr))
        
        if (onChangeText) {
            onChangeText(text)
        }
    }
    

    const renderPredictions = () => {
        if (predictions.length == 0) {
            return null;
        }

        return (
            <View style={style.predictionView}>                    
                {predictions.map((p, i) => 
                    <Pressable key={`pressable-${p.placeId}`} onPress={() => predictionClicked(p.placeId)} hitSlop={10}>
                        <KText style={[style.predictionItemText, i % 2 ? style.even : style.odd]} key={p.placeId}>{p.name}</KText>
                    </Pressable>
                )}
            </View>
        )
    }

    const predictionClicked = (placeId: string) => {
        setPredictions([])
        getDetails(placeId).then(a  => {
            if (onAddressCompleted && a) {
                onAddressCompleted(a) 
            }
        })
    }

    const submitEditingPressed = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        setPredictions([])
        if (onSubmitEditing) {
            onSubmitEditing(e)
        }
        
    }

    return (
        <>
            <KTextInput 
                onChangeText={autoCompleteChangeText}
                ref={ref as any}
                onSubmitEditing={submitEditingPressed}
                {...props} /> 
                {renderPredictions()}
        </>
    )




})


export default KPlacesAutoCompleteInput


const style = StyleSheet.create({
    predictionView: {
        position: "absolute",
        top: 60,
        height: 200,
        backgroundColor: KlutchTheme.backgroundColor,
        width: "100%",
        zIndex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: KlutchTheme.form.label.color,
        justifyContent: "space-evenly",
        paddingLeft: 10,        
    },
    predictionItemText: {
        paddingVertical: 5        
    },
    even: {
        backgroundColor: "#fbfbfb"
    },
    odd: {

    }
})

const googleKey = Constants?.manifest?.extra?.googleApiKey



async function getAutoComplete(text: string): Promise<AutoComplete> {    
    const resp = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=address&components=country:us&key=${googleKey}`)    
    if (resp.data && resp.data.status === "OK") {
        const predictions = resp.data.predictions
        return predictions.map((p: any) => ({placeId: p.place_id, name: p.description}))
    }
    return []
}

async function getDetails(placeId: string): Promise<Address | null> {
    const resp = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleKey}`)
    if (resp.data && resp.data.status === "OK") {
        const addr =resp.data.result.address_components
        const streetNumber = addr.find((c: any) => c.types.includes("street_number"))?.long_name
        const street = addr.find((c:any) => c.types.includes("route"))?.long_name
        const city = addr.find((c:any) => c.types.includes("locality"))?.long_name
        const state = addr.find((c:any) => c.types.includes("administrative_area_level_1"))?.short_name
        const zipCode = addr.find((c:any) => c.types.includes("postal_code"))?.long_name
        return new Address({streetNumber, street, city, state, zipCode})
    }
    return null
}