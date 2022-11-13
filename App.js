import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const onPressLearnMore = () => {
    setLoading(true);
    // get weather forecast - 5 days
    fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=Minneapolis&appid=${process.env.WEATHER_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setData(json.list);
      }).catch(error => {
        console.log(error);
        Alert.alert('There\'s an error');
      })
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={onPressLearnMore}
        title="Load Weather Data"
        color="#841584"
        accessibilityLabel="Button to get weather"
      />
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>Date: {item.dt_txt} Temp: {item.main.temp} F, {item.weather[0].description}</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});