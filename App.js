import React, { useState } from 'react';
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
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const bearyDustLogo = require('./assets/bearydust-logo-bear-with-text.png');

  return (
    <View style={styles.container}>
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
    </View>
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
    paddingTop: 80,
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
