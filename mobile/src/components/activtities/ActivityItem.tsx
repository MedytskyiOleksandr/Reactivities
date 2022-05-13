import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import {Colors} from '../../constants/Colors';
import {Activity} from '../../models/activity';
import * as navigation from '../../navigation/Navigation';
import {activityDetails} from '../../redux/slices/ActionCreators';
import {useAppDispatch} from '../../redux/store/store';

interface Props {
  activity: Activity;
}

function ActivityItem({activity}: Props) {
  const dispatch = useAppDispatch();

  function selectedPlaceHandler() {
    dispatch(activityDetails(activity.id)).then(() => {
      navigation.navigate('ActivityDetail');
    });
  }

  return (
    <>
      <Pressable
        style={({pressed}) => [pressed && styles.pressed]}
        onPress={() => selectedPlaceHandler()}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={require('../../assets/user.png')}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.host}>Hosted by Bob</Text>
          </View>
        </View>
        <View style={styles.dateAndPlaceContainer}>
          <Icon name="clock" size={23} />
          <Text style={styles.cardText}>
            {activity.date.toString().split('T')[0]}
          </Text>
          <Icon name="location-pin" size={23} />
          <Text style={styles.cardText}>{activity.street}</Text>
        </View>
        <View style={styles.attendeesContainer}>
          <Text style={styles.cardText}>Attendees go here</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.cardText}>{activity.description}</Text>
        </View>
      </Pressable>
    </>
  );
}
export default ActivityItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: 12,
    backgroundColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.accent500,
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
  host: {
    fontSize: 16,
    color: Colors.gray700,
  },
  cardText: {
    fontSize: 16,
    color: Colors.gray700,
    paddingHorizontal: 5,
  },
  dateAndPlaceContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary700,
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray700,
  },
  attendeesContainer: {
    backgroundColor: Colors.primary500,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray700,
    padding: 10,
  },
  descriptionContainer: {
    backgroundColor: Colors.primary700,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderColor: Colors.gray700,
  },
});
