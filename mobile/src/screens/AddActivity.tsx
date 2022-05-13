import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import * as navigation from '../navigation/Navigation';
import {Colors} from '../constants/Colors';
import {Activity} from '../models/activity';
import CustomButton from '../components/UI/CustomButton';
import {useAppDispatch, useAppSelector} from '../redux/store/store';
import {
  createActivity,
  deleteActivity,
  editActivity,
} from '../redux/slices/ActionCreators';

function AddActivity() {
  const {isLoading, isDeleting, selectedActivity} = useAppSelector(
    state => state.activityReducer,
  );
  const dispatch = useAppDispatch();

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    street: '',
  };

  const [activity, setActivity] = useState<Activity>(initialState);
  const [date, setDate] = useState(new Date());

  function onChangeHandler(
    keyValue: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    const {text} = e.nativeEvent;
    setActivity({...activity, [keyValue]: text});
  }

  async function saveActivityHandler() {
    if (activity.id) {
      dispatch(editActivity(activity)).then(() => {
        navigation.navigate('ActivityDetail', {activity});
      });
    } else {
      dispatch(createActivity(activity)).then(() => {
        navigation.goBack();
      });
    }
  }

  async function deleteActivityHandler() {
    dispatch(deleteActivity(activity.id)).then(() => {
      navigation.navigate('Activities');
    });
  }

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChange={event => onChangeHandler('title', event)}
        value={activity.title}
      />
      <Text style={styles.label}>Date</Text>
      <View style={styles.datePicker}>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          textColor={Colors.primary100}
        />
      </View>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        numberOfLines={4}
        multiline={true}
        onChange={event => onChangeHandler('description', event)}
        value={activity.description}
        enablesReturnKeyAutomatically={true}
        returnKeyType="next"
      />
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        onChange={event => onChangeHandler('category', event)}
        value={activity.category}
      />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        onChange={event => onChangeHandler('city', event)}
        value={activity.city}
      />
      <Text style={styles.label}>Street</Text>
      <TextInput
        style={styles.input}
        placeholder="Street"
        onChange={event => onChangeHandler('street', event)}
        value={activity.street}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={'Save'}
          onPress={saveActivityHandler}
          isLoading={isLoading}
          color={Colors.primary100}
          textColor={Colors.gray700}
        />
        {!!activity.id && (
          <CustomButton
            buttonText={'Delete'}
            onPress={deleteActivityHandler}
            isLoading={isDeleting}
            color="red"
            textColor="#000000"
          />
        )}
      </View>
    </ScrollView>
  );
}

export default AddActivity;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary200,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
