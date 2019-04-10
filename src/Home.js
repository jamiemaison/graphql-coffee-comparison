import * as React from 'react';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';

export class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.header} source={require('../assets/header.png')} />
        <View style={{ marginLeft: 30, marginTop: 30 }}>
          <Text style={styles.title}>COFFEE</Text>
          <Text style={styles.subtitle}>SELECTION</Text>
        </View>
        <FlatList
          style={styles.list}
          data={[{"key": "placeholder", "name": "PLACEHOLDER", "price": "$0.00", "blend": "PLACEHOLDER", "color": "#D0D0D0", "productImage": "https://github.com/jamiemaison/hosted/raw/master/blend-placeholder.png"},{"key": "placeholder", "name": "PLACEHOLDER", "price": "$0.00", "blend": "PLACEHOLDER", "color": "#D0D0D0", "productImage": "https://github.com/jamiemaison/hosted/raw/master/blend-placeholder.png"}]}
          renderItem={({ item }) => <TouchableOpacity style={styles.block} onPress={() => this.props.navigation.navigate('CoffeePage', { item: item })}>
            <Image style={styles.productImage} source={{ uri: item.productImage }} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>}
          numColumns={2}
        />
      </View>
    );
  }
}

const vw = Dimensions.get('screen').width;
const vh = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    height: vh,
    width: vw,
    backgroundColor: '#fdfdfd'
  },
  header: {
    width: vw,
    height: vw / 1.6,
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'maven-pro-bold',
    fontSize: vw / 22,
    color: '#252525'
  },
  subtitle: {
    fontFamily: 'maven-pro-bold',
    fontSize: vw / 22,
    color: '#bf200b'
  },
  list: {
    margin: vw / 15
  },
  block: {
    flex: 1,
    height: vh / 4,
    margin: vw / 40
  },
  productImage: {
    width: '100%',
    height: vh / 7,
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  name: {
    fontFamily: 'maven-pro-bold',
    fontSize: vw / 22,
    color: '#252525',
    width: '80%',
    marginTop: 15
  },
  price: {
    fontFamily: 'maven-pro-bold',
    fontSize: vw / 22,
    color: '#bf200b',
    marginTop: 7
  }
});
