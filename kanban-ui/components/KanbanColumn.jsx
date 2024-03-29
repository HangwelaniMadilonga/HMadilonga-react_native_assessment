import {View, Text, TextInput, StyleSheet} from 'react-native';
import TaskCard from './TaskCard';
import { useTasks } from '../contexts/TaskContext';
import { useModalContext } from '../contexts/ModalContext';
import TaskCardModal from './Modal';

const KanbanColums = (props) => {
  [tasks, addTask, removeTask,editTask, selectedTask, setSelectedTask,updateTask] = useTasks();
  
  const handleEditTask = (task) => {
    setSelectedTask(task);

  };

  const handleCloseModal = () => {
    setSelectedTask(null); 
  };

  const handleSave = (updatedTask) => {
    updateTask(updatedTask); 
    setSelectedTask(null); 
  };

  //Filter tasks from array so that relevant tasks are shown
  const filteredTasks = tasks.filter(task => task.priority === props.title);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.columnHeader}>
            <Text style={styles.normalText}>{props.title}</Text>
        </View>
        <View style= {styles.columnBody}>
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} id={task.id} title={task.title} onRemove ={() => removeTask(task.id)} onEdit={() => handleEditTask(task)}/>))}
            
             
        </View>
        {selectedTask && (
        <TaskCardModal
          task={selectedTask}
          isVisible={!!selectedTask}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
      </View>
    );
  };

  const styles = StyleSheet.create({
   
  mainContainer: {
    
    flexDirection: 'column',
    gap: 0,
    marginRight: 16,
    marginBottom: 60,
  },
  normalText: {
    fontSize: 14,
    padding:6,
    fontWeight: 'bold',
    color: 'white',
  },
  columnHeader: {
    marginTop: 80,
    
    backgroundColor: '#3b82f6',
    width: 310,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20',
    

  },
  columnBody: {

    backgroundColor: 'rgba(59,130,246,0.21)',
    width: 310,
    minHeight: 120,
    
    

  },
  cardInfo: {

    backgroundColor: 'white',
    width: 280,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 12,
    

  },

});
  
  export default KanbanColums;