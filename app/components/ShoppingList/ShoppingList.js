import React, { Component } from 'react';
import { RefreshControl, ScrollView, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox, FormInput } from 'react-native-elements';
import axios from 'axios';

import Alert from '../common/Alert/Alert';
import Loading from '../common/Loading/Loading';
import MessageScreen from '../common/MessageScreen/MessageScreen';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

class ShoppingList extends Component {
  static navigatorButtons = {
    leftButtons: [{
      id: 'sideMenu',
      buttonColor: colors.white,
    }],
  };

  static navigatorStyle = {
    navBarBackgroundColor: colors.primary,
    navBarTextColor: colors.white,
    navBarButtonColor: colors.white,
  };

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      refreshing: false,
    };
  }

  getRefresher = () => (
    <RefreshControl
      onRefresh={async () => {
        this.setState({ refreshing: true });
        await this.props.fetchShoppingList(this.props.listCode);
        this.setState({ refreshing: false });
      }}
      refreshing={this.state.refreshing}
    />
  )

  async addItem() {
    try {
      const list = this.props.shoppingList.concat([this.state.newItem]);
      this.setState({ newItem: '' });
      await axios.put(`/list/${this.props.listCode}`, {
        list,
      });
      this.props.updateShoppingList(list);
    } catch (error) {
      ToastAndroid.show('Keine Internetverbindung', ToastAndroid.SHORT);
    }
  }

  async removeItem(index) {
    try {
      const list = this.props.shoppingList.slice();
      list.splice(index, 1);
      await axios.put(`/list/${this.props.listCode}`, {
        list,
      });
      this.props.updateShoppingList(list);
    } catch (error) {
      ToastAndroid.show('Keine Internetverbindung', ToastAndroid.SHORT);
    }
  }

  render() {
    const message = 'Bitte fügen Sie in den Einstellungen einen Einkaufslisten Code hinzu, um die Einkaufsliste zu nutzen.';
    if (!this.props.listCode) {
      return (
        <MessageScreen
          message={message}
          buttonText="Zu den Einstellungen"
          onPress={() => this.props.navigator.push({ screen: 'my.Settings', title: 'Einstellungen' })}
        />
      );
    } else if (!this.props.shoppingList) return <Loading />;
    const list = this.props.shoppingList.map((item, index) => (
      <CheckBox
        key={item} title={item.trim()}
        textStyle={styles.text}
        containerStyle={styles.checkbox}
        onIconPress={() => this.removeItem(index)}
      />
    ));
    return (
      <View>
        <Alert />
        <ScrollView refreshControl={this.getRefresher()} contentContainerStyle={styles.container}>
          <FormInput
            placeholder="Hinzufügen"
            inputStyle={styles.input}
            value={this.state.newItem}
            onChangeText={text => this.setState({ newItem: text })}
            onSubmitEditing={() => this.addItem()}
          />
          {list}
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
  fetchShoppingList: code => dispatch(actions.fetchShoppingList(code)),
  updateShoppingList: list => dispatch(actions.updateShoppingList(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
