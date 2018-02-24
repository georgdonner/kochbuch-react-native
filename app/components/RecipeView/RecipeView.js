import React, { Component } from 'react';
import { Image, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import Alert from '../common/Alert/Alert';
import BottomGradient from '../common/BottomGradient/BottomGradient';
import Servings from '../common/Servings/Servings';
import calcServings from '../../utils/calcServings';
import * as actions from '../../actions';
import CalendarIcon from '../../assets/icons/calendar_black.png';
import colors from '../../config/colors';
import styles from './styles';

class RecipeView extends Component {
  static navigatorButtons = {
    rightButtons: [{
      id: 'weekplan',
      icon: CalendarIcon,
    }],
  };

  constructor(props) {
    super(props);
    this.state = {
      servings: props.servings || props.recipe.servings,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'weekplan') {
        const { title, _id } = this.props.recipe;
        this.props.navigator.push({
          screen: 'my.WeekplanForm',
          title: 'Neuer Eintrag',
          passProps: { entry: { recipe: { id: _id, title } } },
        });
      }
    }
  }

  addToShoppingList = async (item) => {
    try {
      const list = this.props.shoppingList.concat([item]);
      this.props.updateShoppingList(list);
      await axios.put(`/list/${this.props.listCode}`, {
        list,
      });
      ToastAndroid.show('Zutat hinzugefügt', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Keine Internetverbindung', ToastAndroid.SHORT);
    }
  }

  pickImage = () => {
    const options = {
      quality: 0.5,
      allowsEditing: true,
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      const data = new FormData();
      data.append('fileUpload', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
      });
      try {
        const url = 'https://www.filestackapi.com/api/store/S3?key=AwD48ceQaWtGBs9plMog7z';
        const res = await axios.post(url, data);
        const handle = res.data.url.split('/').pop();
        const heroImage = `https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/${handle}`;
        await axios.put(`/recipe/${this.props.recipe._id}`, { heroImage }, { json: true });
      } catch (error) {
        console.error(error.message);
      }
    });
  }

  render() {
    const categories = this.props.recipe.categories.map(cat => (
      <View key={cat}><Text style={styles.category}># {cat.toUpperCase()}</Text></View>
    ));
    const ingredients = this.props.recipe.ingredients.map((ingr) => {
      const { hint } = ingr;
      let converted = calcServings(ingr, this.props.recipe.servings, this.state.servings);
      if (hint) converted += ` (${ingr.hint})`;
      return (
        <View key={ingr.name} style={styles.ingredient}>
          <Text style={styles.ingredientText}>{converted}</Text>
          <Icon
            raised
            name="add-shopping-cart"
            color={colors.darkGray}
            size={20}
            onPress={() => this.addToShoppingList(converted)}
          />
        </View>
      );
    });
    return (
      <View>
        <Alert />
        <ScrollView>
          <View style={styles.image}>
            <Image
              source={{
                uri: this.props.recipe.heroImage ? this.props.recipe.heroImage.replace('w:2000', 'w:600') :
                'http://timgratton.com/wp-content/uploads/2018/01/placeholder-600x400.png',
              }}
              style={styles.image}
            />
            <BottomGradient />
            <Text style={styles.duration}>{this.props.recipe.duration} Min.</Text>
          </View>
          <Text style={styles.title}>{this.props.recipe.title}</Text>
          <View style={styles.categories}>{categories}</View>
          <Servings
            servings={this.state.servings}
            onDecrement={() => this.setState({ servings: this.state.servings - 1 || 1 })}
            onIncrement={() => this.setState({ servings: this.state.servings + 1 })}
          />
          <View style={styles.divider} />
          <Text style={styles.title}>Zutaten</Text>
          {ingredients}
          <Text style={styles.title}>Beschreibung</Text>
          <Markdown
            style={styles.description}
            styles={{
              paragraph: styles.descriptionParagraph,
              text: styles.descriptionText,
              view: styles.description,
            }}
          >
            {this.props.recipe.description}
          </Markdown>
          <Button
            title="Neues Titelbild"
            textStyle={{ color: colors.white }}
            buttonStyle={{ height: 50, backgroundColor: colors.primary }}
            onPress={this.pickImage}
            containerViewStyle={{ marginTop: 30 }}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  listCode: state.settings.shoppingList,
  shoppingList: state.user.shoppingList,
});

const mapDispatchToProps = dispatch => ({
  updateShoppingList: list => dispatch(actions.updateShoppingList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView);
