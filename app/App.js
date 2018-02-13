import React from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';
import Fuse from 'fuse.js';

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
    this.fuse = null;
    this.initialRecipes = null;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    const res = await axios.get('https://georgs-recipes.herokuapp.com/api/recipes');
    const recipes = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    this.initialRecipes = recipes;
    this.setState({ recipes });
    this.fuse = new Fuse(recipes, {
      shouldSort: true,
      threshold: 0.33,
      keys: [
        'title',
        'ingredients.name',
      ],
      minMatchCharLength: 2,
    });
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
        onChange={(searchValue) => {
          const recipes = searchValue ? this.fuse.search(searchValue) : this.initialRecipes;
          this.setState({ recipes, searchValue });
        }}
        onClear={() => this.setState({ searchValue: '' })}
        onBack={() => {
          this.setState({ searchActive: false, recipes: this.initialRecipes });
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
