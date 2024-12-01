import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const GameMath = () => {
  const questions = [
    {id: 1, num1: 1, num2: 1, operator: '+', result: 2},
    {id: 2, num1: 1, num2: 1, operator: '-', result: 0},
    {id: 3, num1: 3, num2: 1, operator: '+', result: 4},
    {id: 4, num1: 2, num2: 3, operator: '*', result: 6},
    {id: 5, num1: 10, num2: 2, operator: '/', result: 5},
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hiddenIndex, setHiddenIndex] = useState(
    Math.floor(Math.random() * 4) + 1,
  );
  const [userInput, setUserInput] = useState('');

  const currentQuestion = questions[currentIndex];
  const handleCheckAnswer = () => {
    const correctAnswer =
      hiddenIndex === 1
        ? currentQuestion.num1
        : hiddenIndex === 2
        ? currentQuestion.num2
        : hiddenIndex === 3
        ? currentQuestion.operator
        : currentQuestion.result;

    if (userInput == correctAnswer) {
      alert('Hay dậy!');
    } else {
      alert(`È È Sai ròi! Đáp án đúng là: ${correctAnswer}`);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHiddenIndex(Math.floor(Math.random() * 4) + 1);
      setUserInput('');
    } else {
      alert('Hết câu hỏi rồi!Lại nghe!');
      setCurrentIndex(0);
      setHiddenIndex(Math.floor(Math.random() * 4) + 1);
      setUserInput('');
    }
  };

 

  const renderQuestion = () => {
    const fields = [
      {key: 1, value: currentQuestion.num1},
      {key: 3, value: currentQuestion.operator},
      {key: 2, value: currentQuestion.num2},
      {value: '='},
      {key: 5, value: currentQuestion.result},
    ];

    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        {fields.map(field => (
          <View key={field.key} style={{marginHorizontal: 5}}>
            {field.key === hiddenIndex ? (
              <TextInput
                style={styles.input}
                keyboardType={field.key === 3 ? 'default' : 'numeric'}
                onChangeText={value => setUserInput(value)}
                value={userInput}
              />
            ) : (
              <Text style={styles.text}>{field.value}</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{padding: 20}}>
      <Text style={styles.title}>GameMath</Text>
      {renderQuestion()}
      <TouchableOpacity style={styles.button} onPress={handleCheckAnswer}>
        <Text style={styles.buttonText}>Kiểm tra</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameMath;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: 60,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    width: 60,
  },
  button: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
