import React, { Component } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
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
    statusBarColor: colors.primaryDark,
  };

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      editItemIndex: -1,
      refreshing: false,
    };
    this.interval = null;
    this.view = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.view.flashScrollIndicators();
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    const { editItemIndex, newItem } = this.state;
    if (newItem !== '') {
      const list = this.props.shoppingList.slice();
      if (editItemIndex !== -1) list[editItemIndex] = newItem;
      else list.push(newItem);
      this.props.updateShoppingList(list);
      this.setState({ newItem: '', editItemIndex: -1 });
      try {
        await axios.put(`/list/${this.props.listCode}`, {
          list,
        });
      } catch (error) {
        this.props.fetchFailed();
      }
    }
  }

  async removeItem(index) {
    const item = this.props.shoppingList[index];
    try {
      const list = this.props.shoppingList.slice();
      list.splice(index, 1);
      this.props.updateShoppingList(list);
      await axios.put(`/list/${this.props.listCode}`, {
        list,
      });
    } catch (error) {
      this.props.fetchFailed();
      this.props.removeListItemOffline(item);
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
        onLongPress={() => this.setState({ newItem: item.trim(), editItemIndex: index })}
      />
    ));
    return (
      <View>
        <Alert />
        <ScrollView
          ref={(view) => { this.view = view; }}
          refreshControl={this.getRefresher()}
          contentContainerStyle={styles.container}
          stickyHeaderIndices={[0]}
        >
          <FormInput
            autoFocus
            showsVerticalScrollIndicator
            placeholder="Hinzufügen"
            inputStyle={styles.input}
            underlineColorAndroid="transparent"
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
  fetchFailed: () => dispatch(actions.fetchFailed()),
  removeListItemOffline: item => dispatch(actions.removeListItemOffline(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
