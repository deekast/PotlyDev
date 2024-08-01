import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { getFirestore , doc, setDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";





const AddPot = () => {


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCo3M1XsMJ55gaDo_FV89MLLKnivQCnNS8",
    authDomain: "potlydev.firebaseapp.com",
    projectId: "potlydev",
    storageBucket: "potlydev.appspot.com",
    messagingSenderId: "274380797032",
    appId: "1:274380797032:web:e92035eeff330eaab037dd",
    measurementId: "G-SLC4GQHR4M"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('');
    const [stageLabel, setStageLabel] = useState('Select Stage');
    const [method, setMethod] = useState('');
    const [methodLabel, setMethodLabel] = useState('Select Method');
    const [vessel, setVessel] = useState('');
    const [vesselLabel, setVesselLabel] = useState('Select Vessel Type');
    const [weight, setWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(null);
    const router = useRouter();


  const stages = [
    { key: 'stage1', label: 'Idea' },
    { key: 'stage2', label: 'Thrown / Formed' },
    { key: 'stage3', label: 'Trimmed' },
    { key: 'stage4', label: 'Bisque Kiln Queue' },
    { key: 'stage5', label: 'Bisque Fired' },
    { key: 'stage6', label: 'Glazed' },
    { key: 'stage7', label: 'Final Firing Queue' },
    { key: 'stage8', label: 'Finished Work' },
  ];

  const methods = [
    { key: 'wheel-thrown', label: 'Wheel Thrown' },
    { key: 'handbuilt', label: 'Handbuilt' },
    { key: 'coil', label: 'Coiled' },
    { key: 'molded', label: 'Molded' },
  ];

  const vessels = [
    { key: 'mug', label: 'Mug' },
    { key: 'closed-form', label: 'Closed form' },
    { key: 'vase', label: 'Vase' },
    { key: 'bud-vase', label: 'Bud Vase' },
    { key: 'pitcher', label: 'Pitcher' },
    { key: 'pot', label: 'Pot' },
  ];

  const handleAddPot = () => {
    console.log('New Pot:', { title, stage, method, vessel, weight, description });
    setDoc(doc(db, stage, title, method, vessel, weight, description), {
        stage: stage,
        name: title,
        method: method,
        vessel: vessel,
        weight: weight,
        description: description,
      });

    // Navigate to Pots tab after adding the pot
    router.push('/(tabs)/pots');
  };

  const openModal = (selection) => {
    setCurrentSelection(selection);
    setModalVisible(true);
  };

  const handleSelection = (item) => {
    if (currentSelection === 'stage') {
      setStage(item.key);
      setStageLabel(item.label);
    } else if (currentSelection === 'method') {
      setMethod(item.key);
      setMethodLabel(item.label);
    } else if (currentSelection === 'vessel') {
      setVessel(item.key);
      setVesselLabel(item.label);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Pot</Text>
      <TextInput
        style={styles.input}
        placeholder="Pot Name"
        value={title}
        onChangeText={setTitle}
      />
      <Pressable style={styles.selector} onPress={() => openModal('stage')}>
        <Text style={styles.selectorText}>{stageLabel}</Text>
      </Pressable>
      <Pressable style={styles.selector} onPress={() => openModal('method')}>
        <Text style={styles.selectorText}>{methodLabel}</Text>
      </Pressable>
      <Pressable style={styles.selector} onPress={() => openModal('vessel')}>
        <Text style={styles.selectorText}>{vesselLabel}</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Pot" onPress={handleAddPot} color={"#6AA84f"} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={
                currentSelection === 'stage'
                  ? stages
                  : currentSelection === 'method'
                  ? methods
                  : vessels
              }
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => handleSelection(item)}
                >
                  <Text style={styles.modalText}>{item.label}</Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.key}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  selector: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  selectorText: {
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalItem: {
    padding: 10,
  },
  modalText: {
    fontSize: 18,
  },
});

export default AddPot;
