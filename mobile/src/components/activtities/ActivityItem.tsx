import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {Activity} from '../../models/activity';

interface Props {
  activity: Activity;
  onSelect: (id: string, title: string) => void;
}

function ActivityItem({activity, onSelect}: Props) {
  // const [name, setName] = useState('');
  let name = activity.category;
  let path = require('../../../assets/categoryImages/culture.jpg');
  switch (name) {
    case 'culture':
      path = require('../../../assets/categoryImages/culture.jpg');
      break;
    case 'film':
      path = require('../../../assets/categoryImages/film.jpg');
      break;
    case 'music':
      path = require('../../../assets/categoryImages/music.jpg');
      break;
    case 'travel':
      path = require('../../../assets/categoryImages/travel.jpg');
      break;
    case 'drinks':
      path = require('../../../assets/categoryImages/drinks.jpg');
      break;
    case 'food':
      path = require('../../../assets/categoryImages/food.jpg');
      break;
  }

  return (
    <Pressable
      style={({pressed}) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect(activity.id, activity.title)}>
      <Image style={styles.image} source={path} />
      <View style={styles.info}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.title}>{activity.date}</Text>
      </View>
    </Pressable>
  );
}
export default ActivityItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
