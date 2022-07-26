//Imports
import React from "react";
import { Modal,View,StyleSheet,Text,TextInput,Button } from "react-native";
import {useState, useEffect} from 'react';

const UpdateModal=(props)=>{
// Usestates for data handling
    const [Todo, setTodoValue] = useState(props.Todo);
    const [Date, setDateValue] = useState(props.Date);

    // The useEffect block for requesting data from properties, gets the values
    useEffect(() => {
        setTodoValue(props.todotask==undefined ? "" :props.todotask);
        setDateValue(props.date==undefined ? "" :props.date);
      }, [props.todotask,props.date]);

      // Data handlers
    const valueInputHandler1 = (enteredText)=>{
        setDateValue(enteredText)
      }
      const valueInputHandler=(enteredText)=> {
        setTodoValue(enteredText);
        // arvo = setvalue(enteredText)
      };
// Text components, Data inputs, and buttons for ok and cancel
    return(
    <Modal visible={props.modalUVisible}>

        <View style={styles.listflat}>
        <Text >
          Update Item!
  </Text>
        </View>
    
        <View style={styles.inputstyle}>
        <Text style = {{width: '20%', textAlign: 'center', textAlignVertical:'center', fontSize: 17}}>
          Todo
        </Text>

   <TextInput 
     style={styles.textinput}
    placeholder='Todo'
    onChangeText={valueInputHandler}
    value={Todo}/>
    
        </View>
        <View  style={styles.inputstyle}>
        <Text style = {{width: '20%', textAlign: 'center', textAlignVertical:'center', fontSize: 17}}>
          Datetime
        </Text>
        <TextInput 
     style={styles.textinput}
    placeholder='Datetime'
    onChangeText={valueInputHandler1}
    value={Date}/>
        </View>
        <View style={styles.listflat}>
        <Button title='OK' onPress={()=>props.updateobject(Todo,Date,setTodoValue,setDateValue)}/>
        <Button title='Cancel' onPress={()=>props.setUModalVisible(!props.modalUVisible)}/>

        </View>
       </Modal>);


}

// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },

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
    listflat: {
      alignItems: 'center',
    },
    textinput: {
      backgroundColor: 'lightblue',
      height: 40,
      width: '70%',

    },
 
  });
export default UpdateModal;