//Imports
import React from 'react';
import {
  StyleSheet,
  Button,
  View, Text,
  Modal, TextInput
} from 'react-native';
import {useState} from 'react';

const AddBoot = props => {

  // Usestates for text inputs
  const [UpdateDate, SetUpdateDate] = useState("");
  const [Todo, setTodo] = useState("");

  // Input handlers
  const TodoHandler = enteredText => {
    setTodo(enteredText);
  };
  const DatetimeHandler = enteredText => {
    SetUpdateDate(enteredText);
    // arvo = setvalue(enteredText)
  };
// UI, here is text component and textinputs and buttons to cancel and ok
// Handles data with props
  return (
    <Modal visible={props.modalAVisible}>
      <View style={styles.inputstyle}>
      <Text style = {{width: '20%', textAlign: 'center', textAlignVertical:'center', fontSize: 17}}>
          Todo
        </Text>
        <TextInput
          style={styles.textinput}
          placeholder="Todo"
          onChangeText={TodoHandler}
          value={Todo}
        />
 </View>
 <View style={styles.inputstyle}>
 <Text style = {{width: '20%', textAlign: 'center', textAlignVertical:'center', fontSize: 17}}>
          Datetime
        </Text>
        <TextInput
          style={styles.textinput}
          placeholder="Datetime"
          onChangeText={DatetimeHandler}
          value={UpdateDate}
        />
      </View>
      <View style={styles.buttonstyle}>
        <View style={styles.buttonstyle1}>
          <Button
            title="OK"
            onPress={() =>
              props.addobject(Todo,UpdateDate, SetUpdateDate, setTodo)
            }
          />
        </View>
        <View style={styles.buttonstyle1}>
          <Button title="Cancel" onPress={() => props.SetAddModal()} />
        </View>
      </View>
    </Modal>
  );
};
// Styles
const styles = StyleSheet.create({


  inputstyle: {
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',

      margin: 4,
      borderColor: 'black',
      borderWidth: 2,
      padding: 9,
      backgroundColor: 'white',

  },
  
  textinput: {
    backgroundColor: 'lightblue',
    height: 40,
    width: '50%',
    borderColor: 'black',
    borderWidth: 2,
  },
  
  buttonstyle: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonstyle1: {
    width: 150,
  },
});

export default AddBoot;
