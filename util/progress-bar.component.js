//Fonte: https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

import React from "react";
import {Text, View} from 'react-native'; 

function ProgressBar(props) {
    const completed  = props.completed;
    const bgcolor = "#b31de0";

    const containerStyles = {
        height: 40,
        width: '90%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 10,
        marginLeft: 10,
        marginRight: 10
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 30,
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    }

    const labelStyles = {
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

    return (
        <View style = {containerStyles}>
                
            <View style= {fillerStyles}>
            <Text style= {labelStyles}>{`${completed}%`}</Text>
            </View>
        </View>
    );
}

export default ProgressBar;