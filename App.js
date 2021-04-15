import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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

      {/* Aufgabe erstellen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Ey! Lass was machen'} />
      </KeyboardAvoidingView>
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
  items: {
    marginTop: 30,
  },
});
