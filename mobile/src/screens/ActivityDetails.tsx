import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import {Activity} from '../models/activity';
const CultureImg = require('../../assets/categoryImages/culture.jpg');
const images: {[name: string]: ImageSourcePropType} = {culture: CultureImg};

interface Props {
  route: {
    params: {
      activity: Activity;
    };
  };
}

function ActivityDetails({route}: Props) {
  let name = route.params.activity.category;
  let path = images[name] || images.culture;
  //let path = require('../../assets/categoryImages/culture.jpg');
  // switch (name) {
  //   case 'culture':
  //     path = require('../../assets/categoryImages/culture.jpg');
  //     break;
  //   case 'film':
  //     path = require('../../assets/categoryImages/film.jpg');
  //     break;
  //   case 'music':
  //     path = require('../../assets/categoryImages/music.jpg');
  //     break;
  //   case 'travel':
  //     path = require('../../assets/categoryImages/travel.jpg');
  //     break;
  //   case 'drinks':
  //     path = require('../../assets/categoryImages/drinks.jpg');
  //     break;
  //   case 'food':
  //     path = require('../../assets/categoryImages/food.jpg');
  //     break;
  // }

  return (
    <ScrollView>
      <Image style={styles.image} source={path} />
      <Text style={styles.date}>{route.params.activity.date}</Text>
      <Text style={styles.description}>
        {route.params.activity.description}
      </Text>
    </ScrollView>
  );
}

export default ActivityDetails;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  textContainer: {
    flex: 1,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
  },
});
