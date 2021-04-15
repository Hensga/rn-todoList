import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Aufgaben für heute */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>StandUp Aufgaben</Text>

        <View style={styles.items}>
          {/* Aufgabenbereich */}
          <Task text={'Aufgabe 1'} />
          <Task text={'Aufgabe 2'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {},
});
