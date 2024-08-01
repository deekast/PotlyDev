import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';




const Pots = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);

  //The lines below until next comment are for dummy data reasons, can maybe keep the stages sorted in a separate component 
  const [pots, setPots] = useState([
    { id: '1', title: 'Pot 1', description: 'A beautiful pot.', stage: 'stage1' },
    { id: '2', title: 'Pot 2', description: 'A pot in the making.', stage: 'stage2' },
    { id: '3', title: 'Pot 3', description: 'Almost ready pot.', stage: 'stage3' },
    { id: '4', title: 'Pot 4', description: 'Waiting for the bisque kiln.', stage: 'stage4' },
    { id: '5', title: 'Pot 5', description: 'Bisque fired pot.', stage: 'stage5' },
    { id: '6', title: 'Pot 6', description: 'Glazed pot.', stage: 'stage6' },
    { id: '7', title: 'Pot 7', description: 'Final firing queue pot.', stage: 'stage7' },
    { id: '8', title: 'Pot 8', description: 'Finished pot.', stage: 'stage8' },
    { id: '9', title: 'Pot 9', description: 'Another beautiful pot.', stage: 'stage1' },
    { id: '10', title: 'Pot 10', description: 'Another pot in the making.', stage: 'stage2' },
  ]);


  const stages = [
    'stage1',
    'stage2', 
    'stage3',
    'stage4', 
    'stage5', 
    'stage6', 
    'stage7', 
    'stage8',
  ];
  
  const stageTitles: Record<string, string> = {
    stage1: 'Idea',
    stage2: 'Thrown / Formed',
    stage3: 'Trimmed',
    stage4: 'Bisque Kiln Queue',
    stage5: 'Bisque Fired',
    stage6: 'Glazed',
    stage7: 'Final Firing Queue',
    stage8: 'Finished Work',
  };

  ////////////////////////////////////////////////////////////////
  //                      end of dummy data                     //
  ////////////////////////////////////////////////////////////////
  

  const handlePrevStage = () => {
    setSelectedStageIndex((prevIndex) => {
      if (prevIndex === null) return stages.length - 1;
      return (prevIndex - 1 + stages.length) % stages.length;
    });
  };

  const handleNextStage = () => {
    setSelectedStageIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex + 1) % stages.length;
    });
  };
  const handleNextStageForPot = (potId: string) => {
    setPots((prevPots) => 
      prevPots.map((pot) => {
        if (pot.id === potId) {
          const currentStageIndex = stages.indexOf(pot.stage);
          const nextStageIndex = (currentStageIndex + 1) % stages.length;
          return { ...pot, stage: stages[nextStageIndex] };
        }
        return pot;
      })
    );
    console.log(`Next stage for pot ${potId}!`);
  };

  const handleShowAll = () => {
    setSelectedStageIndex(null);
  };
  

  const filteredPots = selectedStageIndex === null ? pots : pots.filter(pot => pot.stage === stages[selectedStageIndex]);

  return (
    <View >
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevStage}>
          <Text style={styles.arrow}>&lt;</Text>
        </TouchableOpacity>
        <Text style={styles.stage}>
        {selectedStageIndex === null ? 'All' : stageTitles[stages[selectedStageIndex]]}
        </Text>
        <TouchableOpacity onPress={handleNextStage}>
          <Text style={styles.arrow}>&gt;</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredPots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.potItem}>
            <Text style={styles.potTitle}>{item.title}</Text>
            <Text style={styles.potDescription}>{item.description}</Text>
            <Button title="Next Stage" onPress={() => handleNextStageForPot(item.id)} />
          </View>
        )}
        contentContainerStyle={styles.potList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrow: {
    fontSize: 24,
    padding: 10,
  },
  stage: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  allButton: {
    fontSize: 16,
    color: 'blue',
  },
  potList: {
    paddingBottom: 20,
  },
  potItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  potTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  potDescription: {
    fontSize: 14,
  },
});

export default Pots;
