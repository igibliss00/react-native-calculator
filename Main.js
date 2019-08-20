import React from 'react'
import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableOpacity,
} from 'react-native'

export default class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            resultText: '',
            calculationText: '',
        }
        this.operations = ['D', '+', '-', '*', '/']
    }

    calculateResult() {
        const text = this.state.resultText
        this.setState({
            calculationText: eval(text)
        })
        console.log(this.state.calculationText)
    }

    buttonPressed(text) {
        if(text == '='){
            return this.validate() && this.calculateResult(this.state.resultText)
        }
        this.setState({
            resultText: this.state.resultText + text
        })
    }

    validate() {
        const text = this.state.resultText
        switch(text.slice(-2)) {
            case '+':
            case '-':
            case '*':
            case '/':
                return false
        }
        return true
    }

    operate(operation) {
        switch(operation) {
            case 'D':
                console.log(this.state.resultText)
                let text = this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText: text.join('')
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':
                const lastChar = this.state.resultText.split('').pop()
                if(this.operations.indexOf(lastChar) > 0) return 
                if(this.state.text == "") return
                this.setState({
                    resultText: this.state.resultText + operation
                })

        }
    }

    render() {
        let rows = []
        let nums = [[1,2,3], [4,5,6], [7,8,9], [0, 0, '=']]
        for(let i = 0; i < 4; i++) {
            let row = []
            for(let j = 0; j < 3; j++){
                row.push(
                <TouchableOpacity 
                    style={styles.row} 
                    key={Math.random()}
                    onPress={() => this.buttonPressed(nums[i][j])}
                >
                    <Text style={styles.btnText}>{nums[i][j]}</Text>
                </TouchableOpacity>
                )
            }
            rows.push(<View style={styles.row} key={Math.random()}>{row}</View>)
        }

        let operations = ['D', '+', '-', '*', '/']
        let ops = []

        for(let i = 0; i < 5; i++) {
            ops.push(
                <TouchableOpacity 
                    style={styles.btn}
                    key={Math.random()}
                    onPress={() => this.operate(operations[i])}
                >
                    <Text 
                        style={[styles.btnText, styles.white]}
                        key={Math.random()}
                    >{operations[i]}
                    </Text>
                </TouchableOpacity>
                )
        }
        return (
            <View style={styles.container}>
                <View style={styles.result}>
                    <Text style={styles.resultText}>{this.state.resultText}</Text>
                </View>
                <View style={styles.calculation}>
                    <Text style={styles.calculationText}>{this.state.calculationText}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.numbers}>
                        {rows}
                    </View>
                    <View style={styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultText: {
        fontSize: 30,
        color: 'white'
    },
    calculationText: {
        fontSize: 30,
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 30,
    },
    white: {
        color: 'white',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    result: {
        flex: 2,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calculation: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttons: {
        flex: 7,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
        backgroundColor: 'yellow',
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'black',
    }
})