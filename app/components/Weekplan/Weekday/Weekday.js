import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import weekday from '../../../utils/weekday';
import styles from './styles';

export default (props) => {
  let weekdayText = weekday(props.day.date).toUpperCase();
  if (props.week !== 0) {
    weekdayText += ` (${moment(props.day.date).format('DD.MM.YY')})`;
  }
  const recipes = props.day.entries.map(entry => (
    <View key={entry._id}>
      <TouchableOpacity onPress={() => props.onPressEntry(entry)}>
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
};
