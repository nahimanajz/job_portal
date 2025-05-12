import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Note } from "../types/Note";
import { fetchNotes } from "../services/notes.service";
import { syncNotes } from "../utils/syncNotes";
import { INavigationProps } from "../interfaces";

const NotesListScreen = ({ navigation }: INavigationProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  const handleNavigation = () => {
    navigation.navigate("Home");
  };
  const getNotes = async () => {
    const response = await fetchNotes();
    setNotes(response);
  };

  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
      if (state.isConnected) syncNotes();
    });

    getNotes();
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {isOffline && <Text style={styles.offlineBanner}>You are Offline</Text>}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id?.toString() || String(Math.random())}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <Button title="Create Note" onPress={handleNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  offlineBanner: {
    backgroundColor: "red",
    color: "white",
    padding: 8,
    textAlign: "center",
  },
  note: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: { fontWeight: "bold", fontSize: 16 },
});

export default NotesListScreen;
