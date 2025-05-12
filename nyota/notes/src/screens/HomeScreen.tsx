import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { createNote } from "../services/notes.service";
import { saveNoteOffline } from "../utils/syncNotes";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { INavigationProps } from "../interfaces";


const HomeScreen = ({ navigation }: INavigationProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSaveNote = async () => {
    if (!title || !content) {
      Alert.alert("Validation Error", "Both title and content are required.");
      return;
    }
    

    const note = {
      id: uuidv4(), 
      title,
      content,
    };

    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      // Sync directly to the backend

      const response = await createNote(note);
      if (response) {
        Alert.alert("Success", "Note saved successfully!");
        navigation.navigate("List"); 
      }
    } else {
      
      await saveNoteOffline(note);
      Alert.alert("Offline", "Note saved locally and will sync when online.");
      navigation.navigate("List"); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save Note" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default HomeScreen;
