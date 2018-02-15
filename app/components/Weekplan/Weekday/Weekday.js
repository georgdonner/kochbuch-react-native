import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import weekday from '../../../utils/weekday';
import colors from '../../../config/colors';
import styles from './styles';

export default class Weekday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEntry: null,
    };
  }

  render() {
    const { day, week } = this.props;
    let weekdayText = weekday(day.date).toUpperCase();
    if (week !== 0) {
      weekdayText += ` (${moment(day.date).format('DD.MM.YY')})`;
    }
    const recipes = day.entries.map(entry => this.state.editEntry === entry._id ? (
      <View key={entry._id}>
        <View style={styles.edit}>
          <Icon
            containerStyle={styles.back}
            name="arrow-back" color={colors.darkGray}
            onPress={() => this.setState({ editEntry: null })}
          />
          <TouchableOpacity
            style={[styles.option, styles.center]}
            onPress={() => {}}
          >
            <Text style={styles.optionText}>Bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => this.props.onDeleteEntry(entry._id)}
          >
            <Text style={styles.optionText}>Löschen</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View key={entry._id}>
        <TouchableOpacity
          onPress={() => this.props.onPressEntry(entry)}
          onLongPress={() => this.setState({ editEntry: entry._id })}
        >
          <Text style={styles.meta}>
            {`${entry.time} | ${entry.servings} ${entry.servings > 1 ? 'PERSONEN' : 'PERSON'}`}
          </Text>
          <Text style={styles.title}>{entry.custom || entry.recipe.title}</Text>
        </TouchableOpacity>
      </View>
    ));

    return (
      <View style={styles.entry}>
        <Text style={styles.weekday}>{weekdayText}</Text>
        {recipes}
      </View>
    );
  }
}
