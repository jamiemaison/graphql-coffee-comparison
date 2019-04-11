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

export const AppContext = React.createContext({ data: { coffee: { beans: [] } } });


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFontsLoaded: false
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
