import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0A84FF', width: '100%' },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }
});
