import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../config/colors';
import styles from './styles';

export default props => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => {
        props.navigator.toggleDrawer({ side: 'left' });
        props.navigator.resetTo({ screen: 'my.HomeScreen', title: 'Rezepte' });
      }}
    >
      <View style={styles.drawerItem}>
        <Icon reverse name="home" color={colors.primary} />
        <Text style={styles.drawerText}>Rezepte</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.drawerItem}>
      <Icon reverse name="shopping-cart" color={colors.primary} />
      <Text style={styles.drawerText}>Einkaufsliste</Text>
    </View>
    <View style={styles.drawerItem}>
      <Icon reverse name="date-range" color={colors.primary} />
      <Text style={styles.drawerText}>Wochenplan</Text>
    </View>
    <View style={styles.drawerItem}>
      <Icon reverse name="settings" color={colors.primary} />
      <Text style={styles.drawerText}>Einstellungen</Text>
    </View>
  </View>
);
