import React from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';

import RecipePreview from './components/RecipePreview/RecipePreview';
import Searchbar from './components/Searchbar/Searchbar';
import SearchIcon from './assets/icons/search_white.png';
import styles from './styles';

export default class App extends React.Component {
  static navigatorButtons = {
    leftButtons: [{
      id: 'sideMenu',
      buttonColor: '#ffffff',
    }],
    rightButtons: [{
      id: 'search',
      icon: SearchIcon,
    }],
  };

  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      searchActive: false,
      searchValue: '',
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    const res = await axios.get('https://georgs-recipes.herokuapp.com/api/recipes');
    this.setState({ recipes: res.data });
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'search') {
        this.setState({ searchActive: true });
        this.props.navigator.setStyle({
          navBarHidden: true,
        });
      }
    }
  }

  render() {
    if (!this.state.recipes) return <Text>Lädt...</Text>;
    const searchbar = this.state.searchActive ? (
      <Searchbar
        value={this.props.searchValue}
        onChange={searchValue => this.setState({ searchValue })}
        onClear={() => this.setState({ searchValue: '' })}
        onBack={() => {
          this.setState({ searchActive: false });
          this.props.navigator.setStyle({
            navBarHidden: false,
          });
        }}
      />
    ) : null;
    return (
      <View style={styles.container}>
        {searchbar}
        <FlatList
          data={this.state.recipes}
          renderItem={({ item }) => <RecipePreview recipe={item} />}
          keyExtractor={item => item._id}
          removeClippedSubviews
        />
      </View>
    );
  }
}
