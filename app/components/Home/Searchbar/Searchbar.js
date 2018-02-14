import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import colors from '../../../config/colors';
import styles from './styles';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.search = null;
  }

  componentDidMount() {
    this.search.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="arrow-back"
          color={colors.white}
          containerStyle={styles.backButton}
          onPress={() => this.props.onBack()}
        />
        <SearchBar
          ref={(search) => { this.search = search; }}
          value={this.props.value}
          noIcon
          clearIcon={{ color: colors.white, name: 'close' }}
          placeholder="Suchen..."
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor={colors.white}
          onChangeText={text => this.props.onChange(text)}
          onClearText={() => this.props.onClear()}
        />
      </View>
    );
  }
}
