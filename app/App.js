import React from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';

import RecipePreview from './components/RecipePreview/RecipePreview';
import styles from './styles';

export default class App extends React.Component {
  static navigatorButtons = {
    leftButtons: [{
      id: 'sideMenu',
      buttonColor: '#ffffff',
    }],
  };

  constructor(props) {
    super(props);
    this.state = { recipes: null };
  }

  async componentDidMount() {
    const res = await axios.get('https://georgs-recipes.herokuapp.com/api/recipes');
    this.setState({ recipes: res.data });
  }

  render() {
    if (!this.state.recipes) return <Text>Lädt...</Text>;
    return (
      <View style={styles.container}>
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
