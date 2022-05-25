import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            url: `https://087b-223-177-62-29.in.ngrok.io/star?name=${this.props.navigation.getParam()}`
        }
    }

    getDetails = () => {
        const { url } = this.state;
        axios.get(url)
            .then(response => {
                return this.setState({
                    details: response.data.data
                });
            })
            .catch(error => {
                Alert.alert(error.message);
            })
    }

    setDetails = starDetails => {
        this.setState({
            details: starDetails
        });
    }

    render(){
        const { details } = this.state;
        if(details.specifications) {
            return (
                <View style={styles.container}>
                    <Card
                        title={details.name}
                    />
                    <View>
                        <Text style={styles.cardItem}>{`Distance from Earth: ${details.distance}`}</Text>
                        <Text style={styles.cardItem}>{`Gravity: ${details.gravity}`}</Text>
                        <Text style={styles.cardItem}>{`Mass: ${details.mass}`}</Text>
                        <Text style={styles.cardItem}>{`Radius: ${details.radius}`}</Text>
                    </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardItem: {
        marginBottom: 10
    }
});