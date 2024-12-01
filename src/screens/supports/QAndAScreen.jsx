import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 

const QAndAScreen = props => {
  const {navigation} = props;

  const [expanded, setExpanded] = useState([false, false, false, false, false]);

  const toggleAnswer = index => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../../images/ic_back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Q&A</Text>
      </View>

      {/* List of Questions and Answers */}
      <View style={styles.qaList}>
        {questions.map((item, index) => (
          <View key={index} style={styles.qaItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleAnswer(index)}>
              <Text style={styles.question}>{item.question}</Text>
              <Icon
                name={expanded[index] ? 'up' : 'down'}
                size={20}
                color="#000"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>

            {expanded[index] && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const questions = [
  {
    question: 'Tôi trộn các chất dinh dưỡng theo thứ tự nào?',
    answer:
      'A, B, C, D,F rồi line E Root Igniter. Nên pha vào xô và cho máy sục oxy vào thì khơi pha dd sẽ tan đều.',
  },
  {
    question: 'Tôi có thể giữ dung dịch dinh dưỡng hỗn hợp trong bao lâu?',
    answer:
      'Dinh dưỡng cao cấp nên ko có hạn sử dụng, chỉ cần bảo quản tốt dưới nhiệt độ mát, tránh ánh sáng trực tiếp là sẽ để được rất lâu, Để duy trì mức dinh dưỡng tối ưu, chúng tôi khuyên bạn nên thay đổi hồ chứa thuỷ canh của bạn sau mỗi 7 ngày, còn với thổ canh thì pha lần nào tưới lần đó, thừa thì bỏ lần sau pha mới. Đặc biệt có vi sinh Mycorrhizae có hạn sử dụng sau 2 năm kể từ ngày mua.',
  },
  {
    question: 'Khi nào tôi thêm bộ điều chỉnh pH?',
    answer:
      'Sau khi bạn thêm A-F nhưng trước khi bạn thêm line E Root Igniter vào thì phải căn chỉnh pH trước rồi. PH tối ưu là giữa 5,8-6,3, nấm rễ phát triển tốt hơn khi pH chuẩn, dinh dưỡng đủ. Bạn cần thêm 1 số công cụ bút đo nữa nhé.',
  },
  {
    question:
      'Các chất điều chỉnh tăng trưởng có được sử dụng trong các sản phẩm Elite không?',
    answer:
      'Không. Chúng tôi không sử dụng bất kỳ chất điều chỉnh tăng trưởng nào trong dòng Nutrient của mình. Điều này bao gồm Paclobutrazol và Daminozide, được chứng minh là có ảnh hưởng tiêu cực đến sức khỏe khi con người ăn phải, đặc biệt là Ung Thư.',
  },
  {
    question: 'Các sản phẩm Elite có phải là hữu cơ không?',
    answer:
      'Các sản phẩm dinh dưỡng của chúng tôi là sự pha trộn của tất cả các thành phần hữu cơ và vô cơ tự nhiên, không chứa hormone, nước hoa, thuốc nhuộm hoặc chất điều hòa tăng trưởng. Chúng đã được thiết kế đặc biệt để tối đa hóa khả dụng sinh học của các chất dinh dưỡng để hấp thụ và hiệu quả tối ưu. Chúng tôi hiểu được sự hấp thụ của một khu vườn hữu cơ. Quan trọng hơn, độ chính xác như vậy mang lại kết quả vượt trội với một giải pháp hoàn toàn hữu cơ. Chúng tôi tiếp tục phát triển các sản phẩm hữu cơ để thử nghiệm và sẽ cung cấp cho các thị trường dựa trên những kết quả chúng tôi thu thập được .',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#221F1F',
    flex: 1,
    textAlign: 'center',
  },
  qaList: {
    marginTop: 10,
  },
  qaItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    width: '90%',
  },
  icon: {
    height: 24,
    width: 24,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  answer: {
    marginVertical: 20,
    fontSize: 16,
    color: '#7D7B7B',
    paddingLeft: 10,
    width: '90%',
    fontWeight:'400'
  },
});

export default QAndAScreen;
