import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SCREEN_WIDTH,
  scale,
  verticalScale,
  moderateScale,
} from '../utils/responsive';
import colors from '../assets/theme/colors';

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (text: string) => void;
}) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const rotation = new Animated.Value(isExpanded ? 1 : 0);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  // Load recent searches from AsyncStorage
  const loadRecentSearches = async () => {
    try {
      const storedSearches = await AsyncStorage.getItem('recentSearches');
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  // Function to clear recent searches
  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('recentSearches');
      setRecentSearches([]);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      saveSearch(text);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const saveSearch = async (text: string) => {
    if (!text.trim()) {
      return;
    }

    let updatedSearches = [
      text,
      ...recentSearches.filter(item => item !== text),
    ];

    if (updatedSearches.length > 5) {
      updatedSearches.pop();
    }

    setRecentSearches(updatedSearches);

    try {
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches),
      );
    } catch (error) {
      console.error('Error saving search term:', error);
    }
  };

  const handleSelectRecentSearch = (term: string) => {
    setSearch(term);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(rotation, {
      toValue: isExpanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const arrowRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search city..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={handleSearchChange}
      />

      {search.trim() === '' && (
        <View>
          {/* Recent Searches Label with Expand Button */}
          <TouchableOpacity
            onPress={toggleExpand}
            style={styles.recentSearchHeader}>
            <Text style={styles.recentSearchText}>Recent Searches</Text>
            <Animated.Text
              style={[styles.arrow, {transform: [{rotate: arrowRotation}]}]}>
              ⬇️
            </Animated.Text>
          </TouchableOpacity>

          {/* Expandable Recent Searches List */}
          {isExpanded && (
            <>
              <FlatList
                data={recentSearches}
                keyExtractor={(item, index) => index.toString()}
                style={styles.recentSearchesContainer}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleSelectRecentSearch(item)}>
                    <Text style={styles.recentSearchItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.noRecentSearches}>
                    No recent searches yet.
                  </Text>
                }
              />

              {/* Clear Recent Searches Button */}
              {recentSearches.length > 0 && (
                <TouchableOpacity
                  onPress={clearRecentSearches}
                  style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>
                    Clear Recent Searches
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
  },
  searchBar: {
    width: SCREEN_WIDTH * 0.9,
    height: verticalScale(45),
    backgroundColor: colors.background,
    borderRadius: scale(10),
    paddingHorizontal: scale(15),
    fontSize: moderateScale(16),
    color: colors.textSecondary,
    marginBottom: verticalScale(10),
    shadowColor: colors.textSecondary,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  recentSearchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    backgroundColor: colors.background,
    borderRadius: scale(8),
    marginTop: verticalScale(5),
  },
  recentSearchText: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: moderateScale(16),
    color: colors.textSecondary,
  },
  recentSearchesContainer: {
    backgroundColor: colors.background,
    borderRadius: scale(8),
    padding: scale(10),
    marginTop: verticalScale(5),
  },
  recentSearchItem: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    paddingVertical: verticalScale(5),
  },
  noRecentSearches: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: verticalScale(10),
  },
  clearButton: {
    backgroundColor: colors.primary,
    paddingVertical: verticalScale(8),
    marginTop: verticalScale(5),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: moderateScale(14),
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default SearchBar;
