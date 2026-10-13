import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { queryItemsBasedOnText } from '../utils/queryItemsBasedOnText';
import { ITEMS } from '../ContextProviders/ShoppingStoreProvider';
import { useDebounce } from '../hooks/useDebounce';

const { height, width } = Dimensions.get('window');

export default function ExplorePage() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const onChangeDebouncedText = async () => {
      try {
        setLoading(true);
        const result = await queryItemsBasedOnText(
          debouncedText,
          ITEMS,
          controller,
        );
        setItems(result);
      } catch (err) {
        if (!controller.signal.aborted) console.log(err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    onChangeDebouncedText();

    return () => controller.abort();
  }, [debouncedText]);

  return (
    <View style={styles.explorePageContainer}>
      {loading && (
        <View style={styles.orderProgressionView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

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
          <View key={item.id} style={styles.itemContainer}>
            <Text>{item.name}</Text>
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
  orderProgressionView: {
    position: 'absolute',
    left: width / 2 - 16,
    top: height / 4 - 16,
    width: 32,
    height: 32,
    borderRadius: 8,
    zIndex: 1000,
  },
});
