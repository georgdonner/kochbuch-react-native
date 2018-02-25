import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';

import RecipePreview from './RecipePreview/RecipePreview';
import Searchbar from './Searchbar/Searchbar';
import Alert from '../common/Alert/Alert';
import Loading from '../common/Loading/Loading';
import MessageScreen from '../common/MessageScreen/MessageScreen';
import FavoriteIcon from '../../assets/icons/favorite_white.png';
import FavoriteBorderIcon from '../../assets/icons/favorite_border_white.png';
import SearchIcon from '../../assets/icons/search_white.png';
import { getFavorites } from '../../storage';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

class Home extends Component {
  static navigatorButtons = {
    leftButtons: [{
      id: 'sideMenu',
      buttonColor: '#ffffff',
    }],
    rightButtons: [
      { id: 'search', icon: SearchIcon },
      { id: 'favorites', icon: FavoriteBorderIcon },
    ],
  };

  static navigatorStyle = {
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.white,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialRecipes: [],
      recipes: null,
      refreshing: false,
      searchActive: false,
      searchValue: '',
      favorites: false,
    };
    this.fuse = null;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    const { recipes } = this.props;
    if (recipes) this.init(recipes);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipes !== nextProps.recipes) this.init(nextProps.recipes);
  }

  onNavigatorEvent = async (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'search') {
        this.setState({ searchActive: true });
        this.props.navigator.setStyle({
          navBarHidden: true,
        });
      } else if (event.id === 'favorites') {
        this.props.navigator.setButtons({
          rightButtons: [
            { id: 'search', icon: SearchIcon },
            { id: 'favorites', icon: this.state.favorites ? FavoriteBorderIcon : FavoriteIcon },
          ],
          animated: true,
        });
        if (this.state.favorites) {
          this.init(this.props.recipes);
          this.setState({ favorites: false });
        } else {
          const favorites = await getFavorites();
          this.init(this.props.recipes.filter(recipe => favorites.includes(recipe._id)));
          this.setState({ favorites: true });
        }
      }
    } else if (event.id === 'willAppear' && this.state.favorites) {
      const favorites = await getFavorites();
      this.init(this.props.recipes.filter(recipe => favorites.includes(recipe._id)));
    } else if (event.id === 'willDisappear') {
      this.setState({ transition: true });
    } else if (event.id === 'didDisappear') {
      this.setState({ transition: false });
    }
  }

  init = (recipes) => {
    this.setState({ recipes, initialRecipes: recipes });
    if (!this.fuse) {
      this.fuse = new Fuse(recipes, {
        shouldSort: true,
        threshold: 0.33,
        keys: [
          'title',
          'ingredients.name',
          'categories',
        ],
        minMatchCharLength: 2,
      });
    } else {
      this.fuse.setCollection(recipes);
    }
  }

  showRecipe = (recipe) => {
    this.props.navigator.push({ screen: 'my.Recipe', title: recipe.title, passProps: { id: recipe._id } });
  }

  refresh = async () => {
    this.setState({ refreshing: true });
    await this.props.refresh();
    this.setState({ refreshing: false });
  }

  render() {
    if (!this.state.recipes || !this.props.shoppingList || this.state.transition) {
      return <Loading />;
    }
    const searchbar = this.state.searchActive ? (
      <Searchbar
        value={this.state.searchValue}
        onChange={(searchValue) => {
          const recipes = searchValue ? this.fuse.search(searchValue) : this.state.initialRecipes;
          this.setState({ recipes, searchValue });
        }}
        onClear={() => this.setState({ searchValue: '' })}
        onBack={() => {
          this.setState({ searchActive: false, searchValue: '' }, () => {
            this.props.navigator.setStyle({
              navBarHidden: false,
            });
          });
          this.init(this.state.initialRecipes);
        }}
      />
    ) : null;
    const recipes = this.state.recipes.length > 0 ? (
      <FlatList
        data={this.state.recipes}
        renderItem={
          ({ item }) => <RecipePreview recipe={item} onPress={this.showRecipe} />
        }
        keyExtractor={item => item._id}
        onRefresh={this.refresh}
        refreshing={this.state.refreshing}
        removeClippedSubviews
      />
    ) : <MessageScreen message="Keine Rezepte gefunden." />;
    return (
      <View style={styles.container}>
        {searchbar}
        <Alert />
        {recipes}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  shoppingList: state.user.shoppingList,
  fetchFailed: state.status.fetchFailed,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(actions.fetchRecipes()),
  updateRecipes: recipes => dispatch(actions.updateRecipes(recipes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
