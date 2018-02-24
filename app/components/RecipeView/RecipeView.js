import React, { Component } from 'react';
import { Image, ScrollView, Text, ToastAndroid, TouchableNativeFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown';
import ImagePicker from 'react-native-image-picker';
import KeepAwake from 'react-native-keep-awake';
import axios from 'axios';

import Alert from '../common/Alert/Alert';
import BottomGradient from '../common/BottomGradient/BottomGradient';
import Loading from '../common/Loading/Loading';
import Servings from '../common/Servings/Servings';
import calcServings from '../../utils/calcServings';
import * as actions from '../../actions';
import CalendarIcon from '../../assets/icons/calendar_black.png';
import colors from '../../config/colors';
import styles from './styles';

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servings: props.servings || props.recipe.servings,
      uploading: false,
    };
    if (props.planCode) this.setButtons();
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.planCode && nextProps.planCode) this.setButtons();
    else if (this.props.planCode && !nextProps.planCode) this.setButtons(false);
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

  setButtons = (visible = true) => {
    this.props.navigator.setButtons({
      rightButtons: visible ? [{
        id: 'weekplan',
        icon: CalendarIcon,
      }] : [],
    });
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
      if (!response.didCancel && !response.error) {
        const data = new FormData();
        data.append('fileUpload', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        try {
          const url = 'https://www.filestackapi.com/api/store/S3?key=AwD48ceQaWtGBs9plMog7z';
          this.setState({ uploading: true });
          const res = await axios.post(url, data);
          await this.updateImage(res.data.url);
          this.setState({ uploading: false });
        } catch (error) {
          this.setState({ uploading: false });
          ToastAndroid.show('Es ist ein Fehler beim Hochladen des Bildes aufgetreten', ToastAndroid.SHORT);
          console.error(error.message);
        }
      }
    });
  }

  updateImage = async (url) => {
    const handle = url.split('/').pop();
    const heroImage = `https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/${handle}`;
    await axios.put(`/recipe/${this.props.recipe._id}`, { heroImage }, { json: true });
    const updated = this.props.recipes.map((recipe) => {
      if (recipe._id === this.props.recipe._id) return { ...recipe, heroImage };
      return recipe;
    });
    this.props.updateRecipes(updated);
  }

  render() {
    if (this.state.uploading) {
      return <Loading message="Bild wird hochgeladen" />;
    }
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
        <KeepAwake />
        <ScrollView>
          <TouchableNativeFeedback onLongPress={this.pickImage}>
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
          </TouchableNativeFeedback>
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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  recipe: state.recipes.find(recipe => recipe._id === ownProps.id),
  recipes: state.recipes,
  listCode: state.settings.shoppingList,
  planCode: state.settings.weekplan,
  shoppingList: state.user.shoppingList,
});

const mapDispatchToProps = dispatch => ({
  updateRecipes: recipes => dispatch(actions.updateRecipes(recipes)),
  updateShoppingList: list => dispatch(actions.updateShoppingList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeView);
