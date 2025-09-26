import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Header from '../components/Header';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title='MecaMobil' />
      <Text style={styles.text}>Bienvenue dans votre app MecaMobil 🚛</Text>
      <Link href='/login'>Se connecter</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 }
});
