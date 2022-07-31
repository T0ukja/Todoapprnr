/*



Picture link
https://openclipart.org/detail/28096/todo-list
What dependencies are installed
npm install realm --save
 npm i react-native-gesture-handler
*/


// Importing all neseccary 
import UpdateModal from './UpdateModal';
import AddBoot from './AddBoot.js';
import React, {useEffect, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {StyleSheet, Button, Text, FlatList, View, Image} from 'react-native';
import Realm from 'realm';
// schema for database objects, Todo(properties _id, todotask,date)
const TodoTaskScema = {
  name: 'Todo',
  properties: {
    _id: 'int',
    todotask: 'string',
    date: 'string?',
  },
  primaryKey: '_id',
};
// main app
const App = () => {
  // creating row object for swiping
  let row = [];

  // for addmodal
  const [modalAVisible, setAModalVisible] = useState(false);
  const [modalUVisible, setUModalVisible] = useState(false);
  // for creating a row to database (a object)
  // Needs these usestates to handle data to modal with props
  const [todotask, setTodoTask] = useState();
  const [date, setdate] = useState();

  // This usestate is used to set the updated id and it's also needed when deleting a object from database
  const [id, setid] = useState();



  // variables for realm
  const [realm, setRealm] = useState(null);
  const [Todos, setTodos] = useState([]);

  //gets runned, when starting application
  useEffect(() => {
    (async () => {
      // initialize realm database, gets path and schema (TodoTaskSchema)
      const realm = await Realm.open({
        path: 'myrealm',
        schema: [TodoTaskScema],
      }).then(realm => {
        //loading the data
        const Todos = realm.objects('Todo');

        // set variable for tasks read from database
        setTodos([...Todos]);

        // get realm instance to use later in app
        setRealm(realm);

        // set up listener to update Todo's when the
        // data is updated
        try {
          Todos.addListener(() => {
            setTodos([...Todos]);
          });
        } catch (error) {
          console.error(`Error updating tasks: ${error}`);
        }
      });
    })();
  }, []);


  // When pressing a flatlist object, this is called
  //it updates make and model from task and sets update modal visible
  const updateview = task => {
    try {
      setTodoTask(task.todotask);
      setdate(task.date);
      setid(task._id);
      setUModalVisible(!modalUVisible);
    } catch (error) {
      console.log('delete', error);
    }
  };

  // returns the modal view back to base app view, this gets value from modal with props
  //Cancel button impelemtation
  const SetAddModal = () => {
    setAModalVisible(!modalAVisible);
  };

  // the delete function, it gets index number from swiping so it deletes by finding the object by id
  const deleteTodo = (task, row, index) => {
    realm.write(() => {
      try {
        //here finds the object by id
        let myTask = realm.objectForPrimaryKey('Todo', task._id);

        //deleting and try catch blocks for errors
        realm.delete(myTask);
        myTask = null;
      } catch (error) {
        console.log('delete', error);
      }
    });

    // this swipes the row back when swiped (here it's after the deletion)
    row[index].close();
  };


  // This is called from UpdateModal when Ok button is pressed
  // Get's values from props from UpdateModal
  const updateobject = (
    todo,
    model,
    setmodalupdatemake,
    setmodalupdatemodel,
    
  ) => {

 // Find's the object by id witch is sended from Updatemodal (props)
    let updateobjects = realm.objectForPrimaryKey('Todo', id);


    //Now the updateobjects is founded and new values are written to it
    // The props values (todo, model)
    realm.write(() => {
      updateobjects.todotask = todo;
      updateobjects.date = model;
    });
// Setting updateModal values to empty after changing values
    setmodalupdatemake('');
    setmodalupdatemodel('');
    setUModalVisible(!modalUVisible);

  };
  // add function, gets variables from modal (props) and then makes the object
  const addobject = (todo, time, setmodalmake, setmodalmodel) => {
    //gets variables from modal
    //Set's values to Usestate
    setTodoTask(todo);
    setdate(time);

    // Sets modal visibility
    setAModalVisible(!modalAVisible);

    // Sets AddModal values to empty
  //  setmodalmake('');
  //  setmodalmodel('');

    //creates object to database with variables from modal using props
    realm.write(() => {
      realm.create('Todo', {
        _id: Date.now(),
        todotask: todo,
        dateCreated: Date.now(),
        date: time,
      });
    });

    //after data is writed to database, values from modal are set to empty
    setmodalmake('');
    setmodalmodel('');
  };

  // The renderItem which is called in Flatlist
  const renderItem = ({item, index}, onClick, onPress) => {

    // this is closeRow function wich creates gesture ui to swiping
    const closeRow = index => {
      //When is swiped, calls deleteTodo with parameters
      deleteTodo(item, row, index);
    };

    return (
      // Returns the swipeable object with text objects (The ui is here), uses Swipeable
      // onSwipeableOpen is determined what to do when swiped, it runs closeRow with indexvalue
      // TouchableWithoutFeedback onPress tells what to do when pressed, It calls updateview with item prop
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}
          rightOpenValue={-100}>
          <TouchableWithoutFeedback onPress={() => updateview(item)}>
            <View
              style={{
                margin: 4,
                borderColor: 'black',
                borderWidth: 2,
                padding: 9,
                backgroundColor: 'white',
              }}>
              <Text style={{color: 'black'}}>Todo : {item.todotask}</Text>
              <Text style={{color: 'black'}}>Date : {item.date}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  // This is what happens when swiped right (After swiping makes the gap and text deleting...)
  // this is the ui when swiping
  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <View
        style={
          {
            /*   margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 10,*/
          }
        }>
        <Text style={{fontSize: 30, justifyContent: 'center'}}>
          Deleting...
        </Text>
      </View>
    );
  };
// Here is return block for App.js
  return (
    // Modal views (UpdateModal, AddBoot)
    //Text component
    // Button component
  // Flatlist component
    <View style={styles.container}>
      
      <UpdateModal
        modalUVisible={modalUVisible}
        updateobject={updateobject}
        todotask={todotask}
        date={date}
        setUModalVisible={setUModalVisible}
      />
      <AddBoot
        modalAVisible={modalAVisible}
        addobject={addobject}
        SetAddModal={SetAddModal}
        setAModalVisible={setAModalVisible}
      />
            <Image source={require('./images/note.png')}
          style={{   flex: 0.7,
            aspectRatio: 0.8, 
            resizeMode: 'contain',}} resizeMode='cover'/>
      <Text
        style={{
          
          backgroundColor: 'white',
          textAlignVertical: 'center',
          textAlign: 'center',
          color: 'black',
          fontSize: 16,
        }}>
        Todolist
      </Text>

      <View style={styles.flatliststyle}>
        <FlatList
          data={Todos}
          renderItem={v => renderItem(v, () => {})}
          keyExtractor={item => item._id}></FlatList>
      </View>
      <Button title="Add" onPress={() => setAModalVisible(!modalAVisible)} />

    </View>
  );
};


// The styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  flatliststyle: {
    width: '90%',
    backgroundColor: 'grey',
    height: '70%',
  },
});

export default App;
