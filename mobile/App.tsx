/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {ScrollView, SafeAreaView, Text, View} from 'react-native';

import axios from 'axios';

const App = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:3000/api/activities').then(responce => {
      setActivities(responce.data);
    });
  });

  return (
    <SafeAreaView>
      <ScrollView>
        {activities.map((activity: any) => (
          <View key={activity.id}>
            <Text>{activity.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
