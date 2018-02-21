import React, { Component } from 'react';
import { DatePickerAndroid, ScrollView, Text, TimePickerAndroid, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, FormInput, FormLabel, List, ListItem } from 'react-native-elements';
import axios from 'axios';
import Fuse from 'fuse.js';
import moment from 'moment';

import Servings from '../common/Servings/Servings';
import Loading from '../common/Loading/Loading';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

class WeekplanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      time: '19:30',
      servings: 2,
      custom: '',
      recipeInput: '',
      recipe: null,
      ...props.entry,
    };
    if (props.entry && props.entry.date) this.state.date = new Date(props.entry.date);
    this.fuse = null;
  }

  async componentDidMount() {
    this.fuse = new Fuse(this.props.recipes, {
      shouldSort: true,
      threshold: 0.33,
      keys: [
        'title',
        'ingredients.name',
        'categories',
      ],
      minMatchCharLength: 2,
    });
  }

  pickDate = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ date: new Date(year, month, day) });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  pickTime = async () => {
    try {
      const time = this.state.time.split(':');
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: +time[0],
        minute: +time[1],
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const h = hour > 9 ? hour : `0${hour}`;
        const m = minute > 9 ? minute : `0${minute}`;
        this.setState({ time: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  selectRecipe = (recipe) => {
    this.setState({
      recipe: {
        title: recipe.title,
        id: recipe._id,
      },
      custom: '',
    });
  }

  saveEntry = async () => {
    let plan = this.props.weekplan;
    if (this.props.entry._id) {
      plan = this.props.weekplan.map((entry) => {
        if (entry._id === this.props.entry._id) {
          const updated = {
            _id: entry._id,
            date: this.state.date.toISOString(),
            time: this.state.time,
            servings: this.state.servings,
            custom: this.state.custom,
          };
          if (this.state.recipe) updated.recipe = this.state.recipe;
          return updated;
        }
        return entry;
      });
    } else {
      const entry = {
        date: this.state.date.toISOString(),
        time: this.state.time,
        servings: this.state.servings,
        custom: this.state.custom,
      };
      if (this.state.recipe) entry.recipe = this.state.recipe;
      plan = this.props.weekplan.concat([entry]);
    }
    const res = await axios.put(`/plan/${this.props.planCode}`, {
      plan,
    });
    this.props.updateWeekplan(res.data.plan);
    this.props.navigator.pop();
  }

  render() {
    if (!this.props.recipes || !this.props.weekplan) {
      return <Loading />;
    }
    const searchResults = !this.state.recipe && this.state.recipeInput.length > 2 ?
      this.fuse.search(this.state.recipeInput) : null;
    const recipes = searchResults ? (
      <List>
        {searchResults.map(recipe => (
          <ListItem
            key={recipe._id} title={recipe.title}
            onPress={() => this.selectRecipe(recipe)}
          />
        ))}
      </List>
    ) : null;
    const recipe = this.state.recipe ? (
      <View style={styles.recipe}>
        <Text style={styles.recipeTitle}>{this.state.recipe.title}</Text>
        <Button
          title="ÄNDERN"
          textStyle={{ color: colors.darkGray }}
          buttonStyle={styles.changeRecipe}
          onPress={() => this.setState({ recipe: null })}
        />
      </View>
    ) : (
      <View>
        <FormLabel labelStyle={styles.label}>Rezept suchen</FormLabel>
        <FormInput
          editable={!this.state.custom}
          value={this.state.recipeInput}
          onChangeText={text => this.setState({ recipeInput: text })}
          inputStyle={styles.input}
          placeholder="Suche..."
        />
      </View>
    );
    const save = this.state.custom || this.state.recipe ? (
      <Button
        title="SPEICHERN"
        textStyle={{ color: colors.white }}
        buttonStyle={{ height: 50, backgroundColor: colors.primary }}
        onPress={this.saveEntry}
        containerViewStyle={{ marginTop: 20 }}
      />
    ) : null;
    return (
      <ScrollView>
        <TouchableOpacity onPress={this.pickDate}>
          <FormLabel labelStyle={styles.label}>Datum</FormLabel>
          <Text style={styles.dateTime}>{moment(this.state.date).format('DD.MM.YYYY')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pickTime}>
          <FormLabel labelStyle={styles.label}>Uhrzeit</FormLabel>
          <Text style={styles.dateTime}>{this.state.time}</Text>
        </TouchableOpacity>
        <Servings
          servings={this.state.servings}
          onDecrement={() => this.setState({ servings: this.state.servings - 1 || 1 })}
          onIncrement={() => this.setState({ servings: this.state.servings + 1 })}
        />
        <FormLabel labelStyle={styles.label}>Eigenes Rezept</FormLabel>
        <FormInput
          editable={!this.state.recipeInput}
          value={this.state.custom}
          onChangeText={text => this.setState({ custom: text })}
          inputStyle={styles.input}
          placeholder="z.B. Pizza"
        />
        {recipe}
        {save}
        {recipes}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  weekplan: state.user.weekplan,
  planCode: state.settings.weekplan,
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  updateWeekplan: plan => dispatch(actions.updateWeekplan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekplanForm);
