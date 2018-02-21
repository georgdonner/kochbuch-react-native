import React, { Component } from 'react';
import { RefreshControl, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de';

import Weekday from './Weekday/Weekday';
import Alert from '../common/Alert/Alert';
import Loading from '../common/Loading/Loading';
import MessageScreen from '../common/MessageScreen/MessageScreen';
import AddIcon from '../../assets/icons/add_white.png';
import * as actions from '../../actions';
import colors from '../../config/colors';
import styles from './styles';

moment.locale('de');

class Weekplan extends Component {
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
      week: 0,
      refreshing: false,
    };
    if (props.planCode) this.setButtons();
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.planCode && nextProps.planCode) this.setButtons();
    else if (this.props.planCode && !nextProps.planCode) this.setButtons(false);
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'new') {
        this.props.navigator.push({ screen: 'my.WeekplanForm', title: 'Neuer Eintrag' });
      }
    }
  }

  setButtons = (visible = true) => {
    this.props.navigator.setButtons({
      rightButtons: visible ? [{
        id: 'new',
        icon: AddIcon,
      }] : [],
    });
  }

  getRefresher = () => (
    <RefreshControl
      onRefresh={async () => {
        this.setState({ refreshing: true });
        await this.props.fetchWeekplan(this.props.planCode);
        this.setState({ refreshing: false });
      }}
      refreshing={this.state.refreshing}
    />
  )

  getWeek = (offset = 0) => {
    const start = moment().startOf('isoWeek').add(offset, 'w');
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      const date = moment(start).add(i, 'd').hours(12);
      week.push({
        date,
        entries: this.getEntries(date),
      });
    }
    return week;
  }

  getEntries = date => (
    this.props.weekplan.filter(entry => moment(entry.date).isSame(moment(date), 'day'))
  )

  goToRecipe = (entry) => {
    if (entry.recipe) {
      const recipe = this.props.recipes.find(r => r._id === entry.recipe.id);
      if (recipe) {
        this.props.navigator.push({
          screen: 'my.Recipe',
          title: recipe.title,
          passProps: {
            recipe,
            servings: entry.servings,
          },
        });
      }
    }
  }

  newEntry = (date) => {
    this.props.navigator.push({
      screen: 'my.WeekplanForm',
      title: 'Neuer Eintrag',
      passProps: { entry: { date } },
    });
  }

  editEntry = (entry) => {
    this.props.navigator.push({
      screen: 'my.WeekplanForm',
      title: 'Eintrag bearbeiten',
      passProps: { entry },
    });
  }

  deleteEntry = async (id) => {
    try {
      const plan = this.props.weekplan.filter(e => e._id !== id);
      await axios.put(`/plan/${this.props.planCode}`, {
        plan,
      });
      this.props.updateWeekplan(plan);
      ToastAndroid.show('Eintrag gelöscht', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Keine Internetverbindung', ToastAndroid.SHORT);
    }
  }

  weekText = () => {
    const weekOfYear = moment().add(this.state.week, 'w').isoWeek();
    return this.state.week === 0 ? 'Diese Woche' : `Woche ${weekOfYear}`;
  }

  render() {
    const message = 'Bitte fügen Sie in den Einstellungen einen Wochenplan Code hinzu, um den Wochenplan zu nutzen.';
    if (!this.props.planCode) {
      return (
        <MessageScreen
          message={message}
          buttonText="Zu den Einstellungen"
          onPress={() => this.props.navigator.push({ screen: 'my.Settings', title: 'Einstellungen' })}
        />
      );
    } else if (!this.props.weekplan) return <Loading />;
    const week = this.getWeek(this.state.week).map(day => (
      <Weekday
        key={day.date}
        week={this.state.week} day={day}
        onPressDate={date => this.newEntry(date)}
        onPressEntry={entry => this.goToRecipe(entry)}
        onEditEntry={entry => this.editEntry(entry)}
        onDeleteEntry={id => this.deleteEntry(id)}
      />
    ));
    return (
      <View>
        <Alert />
        <ScrollView refreshControl={this.getRefresher()}>
          <View style={styles.weekNav}>
            <Icon
              name="arrow-back"
              color={colors.darkGray}
              onPress={() => this.setState({ week: this.state.week - 1 })}
            />
            <Text style={styles.weekNavText}>{this.weekText()}</Text>
            <Icon
              name="arrow-forward"
              color={colors.darkGray}
              onPress={() => this.setState({ week: this.state.week + 1 })}
            />
          </View>
          {week}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  planCode: state.settings.weekplan,
  weekplan: state.user.weekplan,
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  fetchWeekplan: code => dispatch(actions.fetchWeekplan(code)),
  updateWeekplan: plan => dispatch(actions.updateWeekplan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weekplan);
