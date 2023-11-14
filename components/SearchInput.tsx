import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  BackHandler,
} from "react-native";
import FadeInView from "./animations/FadeView";
import { BlurView } from "expo-blur";
import {
  MagnifyingGlassCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { useDebounce } from "@uidotdev/usehooks";
import { getMovies } from "../utils/handleApi";
import ResultList from "./ResultList";

interface SearchInputProps {
  animationValue: Animated.Value; // 0 = closed, 1 = open
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchActive: boolean;
}

const windowDimensions = Dimensions.get("window");

const SearchInput: React.FC<SearchInputProps> = ({
  animationValue,
  setIsSearchActive,
  isSearchActive,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const inputTranslate = useState(new Animated.Value(0))[0];
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      getMovies(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!isSearchActive) {
      setSearchTerm("");
    }
    if (isSearchActive) {
      inputRef.current?.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    if (results.length > 0) {
      moveSearchAnimation({
        animationValue: inputTranslate,
        position: 0,
        duration: 100,
      });
    } else {
      moveSearchAnimation({
        animationValue: inputTranslate,
        position: 1,
      });
    }
  }, [results]);
  const handleBackPress = () => {
    // First close the search
    closeSearch(animationValue, setIsSearchActive);
    return true; // Avoit that the app closes
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    isSearchActive && (
      <>
        <FadeInView style={stylesInput.container}>
          <TouchableOpacity
            style={stylesInput.backgroundOverlay}
            onPress={() => closeSearch(animationValue, setIsSearchActive)}
          ></TouchableOpacity>
        </FadeInView>
        <Animated.View
          style={getSearchContainerStyle(animationValue, inputTranslate)}
        >
          <BlurView intensity={20} tint="dark" style={stylesInput.search}>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MagnifyingGlassCircleIcon
                size={50}
                color={"#ffffff98"}
                style={stylesInput.magnifying_glass}
              />
              <TextInput
                style={stylesInput.search_input}
                placeholder="Search"
                onChangeText={handleChange}
                ref={inputRef}
              />
            </View>
            <XCircleIcon
              size={50}
              color={"#ffffff98"}
              style={stylesInput.close_icon}
              onPress={() => {
                closeSearch(animationValue, setIsSearchActive);
              }}
            />
          </BlurView>

          {isSearching ? (
            <Text>Searching...</Text>
          ) : (
            results.length > 0 && <ResultList results={results} />
          )}
        </Animated.View>
      </>
    )
  );
};

export default SearchInput;

const closeSearch = (
  animationValue: Animated.Value,
  setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  moveSearchAnimation({
    animationValue,
    position: 0,
    callback: () => setIsSearchActive(false),
  });
};

const getSearchContainerStyle = (
  animationValue: Animated.Value,
  inputTranslate: Animated.Value
) => [
  stylesInput.search_container,
  {
    transform: [
      {
        translateY: inputTranslate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, windowDimensions.height * 0.3],
        }),
      },
      {
        scaleY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.1, 1],
        }),
      },
    ],
    opacity: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  },
];

const moveSearchAnimation = ({
  animationValue,
  position,
  duration = 300,
  callback,
}: {
  animationValue: Animated.Value;
  position: number;
  duration?: number;
  callback?: () => void;
}) => {
  Animated.timing(animationValue, {
    toValue: position,
    duration: duration,
    useNativeDriver: true,
  }).start(callback);
};

const stylesInput = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  backgroundOverlay: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  search_container: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    height: "100%",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
    borderRadius: 20,
    gap: 10,
    overflow: "hidden",
    backgroundColor: "rgba(183, 183, 183, 0.437)",
  },
  magnifying_glass: {
    opacity: 0.5,
    marginRight: 10,
    color: "#ffffff98",
  },
  search_input: {
    color: "white",
    fontSize: 20,
    width: "80%",
  },
  close_icon: {
    marginRight: 10,
    right: 20,
    color: "#ffffff98",

    opacity: 0.5,
  },
  results: {
    backgroundColor: "black",
    width: "100%",
    bottom: 0,
    zIndex: 3,
  },
  itemResult: {
    width: "100%",
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
});
