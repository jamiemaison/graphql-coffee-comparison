import * as React from 'react';
import { Home } from './src/Home';
import { CoffeePage } from './src/CoffeePage';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View } from 'react-native';
import { Font } from 'expo';

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
      <View style={{ flex: 1 }}>
        {this.state.isFontsLoaded ? <AppContainer /> : <View />}
      </View>
    );
  }
}
