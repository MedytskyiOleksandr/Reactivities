import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {images} from '../assets/index';
import {Colors} from '../constants/Colors';
import {useAppSelector} from '../redux/store/store';

function ActivityDetails() {
  const {selectedActivity: activity} = useAppSelector(
    state => state.activityReducer,
  );

  if (!activity) {
    return (
      <View>
        <Text>Error occured</Text>
      </View>
    );
  }

  let name = activity.category;
  let path = images[name] || images.culture;

  return (
    <ScrollView>
      <ImageBackground source={path} style={styles.image}>
        <View style={styles.imageTextContainer}>
          <Text style={styles.imageText}>Hosted by Bob</Text>
          <Text style={styles.imageText}>{activity.date.split('T')[0]}</Text>
        </View>
      </ImageBackground>
      <View style={styles.textContainer}>
        <View style={styles.iconTextStyle}>
          <Icon name="clock" size={23} />
          <Text style={styles.text}>
            {activity.date.toString().split('T')[0]}
          </Text>
        </View>
        <View style={styles.iconTextStyle}>
          <Icon name="location-pin" size={23} />
          <Text style={styles.text}>{activity.street}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default ActivityDetails;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  imageTextContainer: {
    margin: 25,
  },
  imageText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: Colors.gray700,
    paddingHorizontal: 5,
  },
  textContainer: {
    backgroundColor: Colors.primary700,
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray700,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  iconTextStyle: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
});
