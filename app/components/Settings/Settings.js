import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, FormLabel, FormInput } from 'react-native-elements';

import * as actions from '../../actions';
import { setSettings } from '../../storage';
import colors from '../../config/colors';
import styles from './styles';

class Settings extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.white,
    navBarButtonColor: colors.white,
  };

  constructor(props) {
    super(props);
    this.state = { ...props.settings };
  }

  formatCode = code => code.toLowerCase().replace(/[^(a-z|0-9)]+/g, '')

  updateSettings = async () => {
    const settings = {
      shoppingList: this.formatCode(this.state.shoppingList),
      weekplan: this.formatCode(this.state.weekplan),
    };
    await setSettings(settings);
    const { shoppingList, weekplan } = this.props.settings;
    if (settings.shoppingList !== shoppingList) {
      this.props.fetchShoppingList(settings.shoppingList);
    }
    if (settings.weekplan !== weekplan) {
      this.props.fetchWeekplan(settings.weekplan);
    }
    this.props.updateSettings(settings);
    this.props.navigator.pop();
  }

  render() {
    return (
      <View>
        <FormLabel labelStyle={styles.label}>Einkauflisten Code</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ shoppingList: text })}
          value={this.state.shoppingList}
          inputStyle={styles.input}
        />
        <FormLabel labelStyle={styles.label}>Wochenplan Code</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ weekplan: text })}
          value={this.state.weekplan}
          inputStyle={styles.input}
        />
        <Button
          title="SPEICHERN"
          textStyle={{ color: colors.white }}
          buttonStyle={{ height: 50, backgroundColor: colors.primary }}
          onPress={this.updateSettings}
          containerViewStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  fetchShoppingList: code => dispatch(actions.fetchShoppingList(code)),
  fetchWeekplan: code => dispatch(actions.fetchWeekplan(code)),
  updateSettings: settings => dispatch(actions.updateSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
