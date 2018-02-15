import React, { Component } from 'react';
import { ScrollView, Text, ToastAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de';

import Weekday from './Weekday/Weekday';
import Loading from '../common/Loading/Loading';
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
    rightButtons: [{
      id: 'new',
      icon: AddIcon,
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
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    const res = await axios.get(`https://georgs-recipes.herokuapp.com/api/plan/${this.props.planCode}`);
    const weekplan = res.data.plan;
    this.props.updateWeekplan(weekplan);
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'new') {
        this.props.navigator.push({ screen: 'my.WeekplanForm', title: 'Neuer Eintrag' });
      }
    }
  }

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

  editEntry = (entry) => {
    this.props.navigator.push({
      screen: 'my.WeekplanForm',
      title: 'Eintrag bearbeiten',
      passProps: { entry },
    });
  }

  deleteEntry = async (id) => {
    const plan = this.props.weekplan.filter(e => e._id !== id);
    await axios.put(`https://georgs-recipes.herokuapp.com/api/plan/${this.props.planCode}`, {
      plan,
    });
    this.props.updateWeekplan(plan);
    ToastAndroid.show('Eintrag gelöscht', ToastAndroid.SHORT);
  }

  weekText = () => {
    const weekOfYear = moment().add(this.state.week, 'w').isoWeek();
    return this.state.week === 0 ? 'Diese Woche' : `Woche ${weekOfYear}`;
  }

  render() {
    if (!this.props.weekplan) return <Loading />;
    const week = this.getWeek(this.state.week).map(day => (
      <Weekday
        key={day.date}
        week={this.state.week} day={day}
        onPressEntry={entry => this.goToRecipe(entry)}
        onEditEntry={entry => this.editEntry(entry)}
        onDeleteEntry={id => this.deleteEntry(id)}
      />
    ));
    return (
      <ScrollView>
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
    );
  }
}

const mapStateToProps = state => ({
  planCode: state.settings.weekplan,
  weekplan: state.user.weekplan,
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  updateWeekplan: plan => dispatch(actions.updateWeekplan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weekplan);
