import React, {Component} from 'react';
import {Alert, TouchableHighlight, StyleSheet, Text, View} from 'react-native';

export default class FlatListBasics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '敲色块',
            num: 2,
            maxNum: 10,
            newPoint: 1,
            maxTouchPoints: 20,
            finish: false

        }
    }

    render() {
        if (this.state.finish) return <View>
            <Text style={styles.title}>通关啦</Text>
            <TouchableHighlight onPress={this.reGame}>
                <Text style={styles.title}>再来一局</Text>
            </TouchableHighlight>
        </View>
        return (
                <View style={styles.container}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <View style={styles.colorBox}>
                        {this.startView(this.state.num,this.state.newPoint)}
                    </View>
                    <Text style={styles.title}>关卡: {this.state.newPoint}</Text>
                </View>
        );
    }
    reGame () {
        this.setState({ num: 2 })
    }
    checkColor = (i, index, num, newPoint) => {
        return () => {
            if (i === index && newPoint < this.state.maxTouchPoints) {
                if( num < 10 ) {
                    num = ( newPoint % 2 === 1 ? num + 1 : num )
                }
                this.setState({
                    num: num,
                    newPoint: newPoint + 1
                })
            } else if (newPoint === this.state.maxTouchPoints) {
                this.setState({finish: true})
            }
        }

    }
    startView = (num,newPoint) => {
        let indexNum = parseInt(Math.random() * (num * num))
        let arr = [];
        let bgcolor = ''
        let color = (newPoint) => {
            function getRandom(range) {
                let colorNum = Math.random() * 255
                return {
                    color: colorNum,
                    icolor: colorNum + ( 25 - range ) > 255 ? colorNum - ( 25 - range ) : colorNum + ( 25 - range )
                }
            }

            let R = getRandom(newPoint)
            let G = getRandom(newPoint)
            let B = getRandom(newPoint)

            return {
                color: 'rgb(' + R.color + ',' + G.color + ',' + B.color + ')',
                icolor: 'rgb(' + R.icolor + ',' + G.icolor + ',' + B.icolor + ')'
            }
        }
        let allColor = color(newPoint)
        for (let i = 0; i < num * num; i++) {
            i === indexNum ? bgcolor = allColor.icolor : bgcolor = allColor.color
            arr.push(
                    <TouchableHighlight onPress={this.checkColor(i, indexNum, num, newPoint)}>
                        <View key={i} style={{
                            width: 300 / num,
                            height: 300 / num,
                            backgroundColor: bgcolor,
                            boxSizing: 'border-box',
                            borderWidth: 1,
                            borderColor: '#fff'
                        }}>
                        </View>
                    </TouchableHighlight>
            )
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