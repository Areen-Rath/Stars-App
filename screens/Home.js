import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            url: "https://087b-223-177-62-29.in.ngrok.io"
        }
    }

    getStars = () => {
        const { url } = this.state;
        axios.get(url)
            .then(response => {
                return this.setState({
                    listData: response.data.data
                });
            })
            .catch(error => {
                Alert.alert(error.message);
            })
    }

    renderItem = ({ item: index }) => (
        <ListItem
            key={index}
            title={`Star: ${item.name}`}
            subtitle={`Distance from Earth: ${item.distance}`}
            titleStyle={styles.title}
            containerStyle={styles.listContainer}
            bottomDivider
            chevron
            onPress={() => {
                this.props.navigation.navigate("Details", {star_name: item.name})
            }}
        />
    )

    keyExtractor = ({ item: index }) => index.toString()

    componentDidMount() {
        this.getStars();
    }

    render() {
        const { listData } = this.state;
        if(listData.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.loading}>Loading</Text>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <SafeAreaView />
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>Stars</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                        data={listData}
                        renderItem={this.renderItem()}
                        keyExtractor={this.keyExtractor()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    upperContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    lowerContainer: {
        flex: 0.9
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        fontSize: 20
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    listContainer: {
        backgroundColor: "gray"
    }
})