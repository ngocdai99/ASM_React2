import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/color'


const SMS = () => {
    
    const [num1, setNum1] = useState(list[0].num1)
    const [operator, setOperator] = useState(list[0].operator)
    const [num2, setNum2] = useState(list[0].num2)
    const [result, setResult] = useState(list[0].result)

    const [hiddenIndex, setHiddenIndex] = useState(Math.ceil(Math.random() * 4))


    console.log("hiddenIndex = ", hiddenIndex)

    const check = () => {
        let rightAnswer = false
        switch(operator){
            case "+": {
                rightAnswer = (num1 + num2 === result)
                break
            }
            case "-": {
                rightAnswer = (num1 - num2 === result)
                break
            }
            case "x": {
                rightAnswer = (num1 * num2 === result)
                break
            }
            case ":": {
                rightAnswer = (num1 / num2 === result)
                break
            }
        }
       
        console.log("rightAnswer = ", rightAnswer)
        if(rightAnswer){
            const randomSet = Math.round(Math.random() * list.length)
            setHiddenIndex(Math.ceil(Math.random() * 4))
            setNum1(list[randomSet].num1)
            setOperator(list[randomSet].operator)
            setNum2(list[randomSet].num2)
            setResult(list[randomSet].result)
        }else{
            console.log("Sai roi")
        }
    }

    return (
        <View>
            <Text>SMS</Text>

            <View style={styles.row}>

                <CustomTextInput
                    hiddenIndex={hiddenIndex}
                    index={1}
                    value={num1}
                    onChangeText={setNum1}
                />

                <CustomTextInput
                    hiddenIndex={hiddenIndex}
                    index={2}
                    value={operator}
                    keyboardType="default"
                    onChangeText={setOperator}
                />

                <CustomTextInput
                    hiddenIndex={hiddenIndex}
                    index={3}
                    value={num2}
                    onChangeText={setNum2}
                />


                <Text>=</Text>


                <CustomTextInput
                    hiddenIndex={hiddenIndex}
                    index={4}
                    value={result}
                    onChangeText={(text) => {
                        setResult(text)
                    }}
                />




            </View>

            <Button title="Check" onPress={() => { check() }} />

        </View>
    )
}


const CustomTextInput = (props) => {
    const { hiddenIndex, index, value, onChangeText, keyboardType = "numeric" } = props
    return (
        <TextInput
            editable={index === hiddenIndex}
            style={styles.textInput}
            keyboardType={keyboardType}
            // value={(index === hiddenIndex) ? "" : value.toString()}
            value={value.toString()}
            onChangeText={onChangeText}
        />
    )

}
const operators = [
    "+", "-"
]

const list = [
    {
        "num1": 1,
        "operator": "+",
        "num2": 3,
        "result": 4
    },
    {
        "num1": 3,
        "operator": "-",
        "num2": 1,
        "result": 2
    },
    {
        "num1": 4,
        "operator": "x",
        "num2": 1,
        "result": 4
    },

    {
        "num1": 6,
        "operator": ":",
        "num2": 2,
        "result": 3
    },

    {
        "num1": 2,
        "operator": "x",
        "num2": 3,
        "result": 6
    }
]

export default SMS

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10

    },
    textInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: 'black'
    }
})