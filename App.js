import * as React from 'react';
import { Home } from './src/Home';
import { CoffeePage } from './src/CoffeePage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import { Font } from 'expo';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({ uri: 'https://yq42lj36m9.sse.codesandbox.io/' })

const QUERY = gql`
{
  coffee {
    beans {
      key
      name
      price
      blend
      color
      productImage
    }
  }
}
`

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  CoffeePage: { screen: CoffeePage },
}, { headerMode: 'none' });

const AppContainer = createAppContainer(MainNavigator);

export const AppContext = React.createContext({ data: 0 });


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontsLoaded: false,
      data: [
        { key: 'graphql-blend', name: 'GRAPHQL BLEND', price: '$2.99', blend: 'RICH', color: '#ef9431', productImage: 'https://github.com/jamiemaison/hosted/raw/master/graphql-blend.png' },
        { key: 'react-native-intense', name: 'REACT NATIVE INTENSE', price: '$5.99', color: '#2c2c2d', blend: 'BOLD', productImage: 'https://github.com/jamiemaison/hosted/raw/master/react-native-intense.png' },
        { key: 'javascript-single', name: 'JAVASCRIPT SINGLE ORIGIN', price: '$1.50', color: '#1c2941', blend: 'SMOOTH', productImage: 'https://github.com/jamiemaison/hosted/raw/master/javascript-single.png' },
        { key: 'react-roast', name: 'REACT ROAST', price: '$3.79', blend: 'SWEET', color: '#f6eae4', productImage: 'https://github.com/jamiemaison/hosted/raw/master/react-roast.png' },
      ]
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'maven-pro-regular': require('./assets/MavenPro-Regular.ttf'),
      'maven-pro-bold': require('./assets/MavenPro-Bold.ttf')
    });

    this.setState({ isFontsLoaded: true });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={QUERY} >
          {({ loading, error, data }) => {
            if (loading || error) return <View />
            return <AppContext.Provider value={data.coffee.beans} style={{ flex: 1 }}>
              {this.state.isFontsLoaded ? <AppContainer /> : <View />}
            </AppContext.Provider>
          }}
        </Query>
      </ApolloProvider>
    );
  }
}
