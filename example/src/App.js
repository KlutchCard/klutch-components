import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Klutch from 'klutch-components';
export default function App() {
    const [result, setResult] = React.useState();
    return (React.createElement(View, { style: styles.container },
        React.createElement(Klutch.KText, null,
            "Result: ",
            result)));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});
