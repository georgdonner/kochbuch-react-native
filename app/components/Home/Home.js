import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Fuse from 'fuse.js';

import RecipePreview from './RecipePreview/RecipePreview';
import Searchbar from './Searchbar/Searchbar';
import SearchIcon from '../../assets/icons/search_white.png';
import { getSettings } from '../../storage/settings';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

class Home extends Component {
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

  static navigatorStyle = {
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.white,
  };

  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      searchActive: false,
      searchValue: '',
    };
    this.fuse = null;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    let { recipes, settings } = this.props;
    if (!settings) {
      settings = await getSettings();
      this.props.updateSettings(settings);
    }
    if (!recipes) {
      const res = await axios.get('https://georgs-recipes.herokuapp.com/api/recipes');
      recipes = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      this.props.updateRecipes(recipes);
    }
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
        value={this.state.searchValue}
        onChange={(searchValue) => {
          const recipes = searchValue ? this.fuse.search(searchValue) : this.props.recipes;
          this.setState({ recipes, searchValue });
        }}
        onClear={() => this.setState({ searchValue: '' })}
        onBack={() => {
          this.setState({ searchActive: false, recipes: this.props.recipes });
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
          renderItem={
            ({ item }) => <RecipePreview recipe={item} navigator={this.props.navigator} />
          }
          keyExtractor={item => item._id}
          removeClippedSubviews
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  updateRecipes: recipes => dispatch(actions.updateRecipes(recipes)),
  updateSettings: settings => dispatch(actions.updateSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
