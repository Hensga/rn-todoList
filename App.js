if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import Reactotron, { asyncStorage } from 'reactotron-react-native';
import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState(task);
  const [taskItems, setTaskItems] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('TASKS');
      Reactotron.log(jsonValue);
      setTaskItems(jsonValue != null ? JSON.parse(jsonValue) : null);

      // if (value !== null) {
      //   setTask(value);
      // }
    } catch (e) {
      alert(e);
    }
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(taskItems);
      await AsyncStorage.setItem('TASKS', jsonValue);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    storeData();
    setTask(null);
  };
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const bearyDustLogo = require('./assets/bearydust-logo-bear-with-text.png');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Aufgaben für heute */}

        <View style={styles.tasksWrapper}>
          <View style={styles.headerWrapper}>
            <Text style={styles.sectionTitle}>StandUp Aufgaben</Text>
            <Image style={styles.tinyLogo} source={bearyDustLogo}></Image>
          </View>
          <View style={styles.items}>
            {/* Aufgabenbereich */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeTask(index)}
                >
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Aufgabe erstellen */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Ey! Lass was machen'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity
          onPress={() => {
            handleAddTask();
          }}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfaf9',
  },
  headerWrapper: {
    flexDirection: 'row',
  },
  tinyLogo: {
    width: 120,
    height: 120,
    marginTop: -10,
    marginLeft: 15,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: '#333333',
  },
  items: {
    marginTop: 30,
  },
  scrollView: {
    flexGrow: 1,
  },
  writeTaskWrapper: {
    height: 130,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#508484',
    borderWidth: 1,
    width: 250,
    fontFamily: 'Courier New',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#508484',
    borderWidth: 1,
  },
  addText: {},
});
