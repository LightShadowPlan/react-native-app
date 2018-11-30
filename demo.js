import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '敲色块',
            num: 2,
            maxNum: 10,
            newCheckPoint: 1,
            finish: false

        }
    }
    render() {
        if(this.finish) return <Text style={styles.title} >通关啦</Text>
        return (
                <View style={styles.container}>
                    <Text style={styles.title}>{ this.state.title }</Text>
                    <View style={styles.colorBox}>
                        { this.startView(this.state.num) }
                    </View>
                    <Text style={styles.title}>关卡: { this.state.newCheckPoint }</Text>
                </View>
        );
    }

    checkColor = () => {
        return (i, index, num) => {
            if( i === index && num < this.state.maxNum ) {
                this.setState({ num: num + 1 })
            } else if( i === num ){
                this.setState({ finish: true })
            }
        }

    }
    startView = (num) => {
        let indexNum = parseInt( Math.random()*(num*num))
        let arr = [];
        let bgcolor = ''
        let color = (num) => {
            function getRandom(range){
                let colorNum = Math.random()*255
                return {
                    color: colorNum,
                    icolor: colorNum + ( 50 - range * 4 ) > 255 ? colorNum - ( 50 - range * 4 ) : colorNum + ( 50 - range * 4 )
                }
            }
            let R = getRandom(num)
            let G = getRandom(num)
            let B = getRandom(num)

            return {
                color: 'rgb('+ R.color +','+ G.color + ',' + B.color + ')',
                icolor: 'rgb('+ R.icolor +','+ G.icolor + ',' + B.icolor + ')'
            }
        }
        let allColor = color(num)
        for(let i =0;i<num*num; i++){
            i === indexNum ? bgcolor = allColor.icolor : bgcolor = allColor.color
            arr.push(<View key={i} style={{ width: 300/num, height: 300/num, backgroundColor: bgcolor, boxSizing: 'border-box', borderWidth: 1,borderColor: '#fff' }}>
                <Button
                        onPress={this.checkColor(i, indexNum, num)}
                        title=""
                        color="tomato"
                        style={{ padding: 0, margin: 0 ,width: '100%', height: '100%',opacity: 0}}
                />
            </View>)
        }

        return arr
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eee'
    },
    title: {
        width: 300,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
        lineHeight: 60,
        margin: 40,
        color: 'tomato',
        fontSize: 28,
        textAlign: 'center',
        borderRadius: 30
    },
    colorBox: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'pink'
    }
})