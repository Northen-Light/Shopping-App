import { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text } from 'react-native';
import { queryItemsBasedOnText } from '../utils/queryItemsBasedOnText';
import { ITEMS } from '../ContextProviders/ShoppingStoreProvider';
import { useDebounce } from '../hooks/useDebounce';

export default function ExplorePage() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(queryItemsBasedOnText(debouncedText, ITEMS));
  }, [debouncedText]);

  return (
    <View style={styles.explorePageContainer}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="🔍 Search Items"
          placeholderTextColor="black"
          onChangeText={t => setText(t)}
          style={styles.textInput}
          color="black"
        />
      </View>
      <ScrollView>
        {items.map(item => (
          <View style={styles.itemContainer}>
            <Text key={item.id}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  explorePageContainer: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginVertical: 4,
    width: '100%',
    height: 48,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#D3D3D3',
    marginVertical: 4,
    width: '100%',
    height: 48,
    padding: 8,
  },
});
