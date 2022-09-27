import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import * as Speech from "expo-speech";

export default function App() {

    const [word, setWord] = useState("");
    const [checkedWord, setCheckedWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [example, setExample] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");

    const searchWord = (text) => {
        setWord(text);
    };

    getInfo = () => {
        var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;

        return fetch(url)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                var wordInput = res[0].word.toUpperCase()
                setCheckedWord(wordInput);

                var def = res[0].meanings[0].definitions[0].definition;
                setDefinition(def);

                var eg = res[0].meanings[0].definitions[0].example;
                setExample(eg);

                var pts = res[0].meanings[0].partOfSpeech.toUpperCase();
                setPartOfSpeech(pts);
            });
    };

    const speak = () => {
        Speech.speak(checkedWord)
    }

    const clear = () => {
        setCheckedWord("");
        setDefinition("");
        setExample("");
        setWord("");
    };

    return (
        <View style={styles.container}>
                <View style={{ flex: 0.2 }}>
                    <Image 
                        style={styles.image}
                        source={require("./assets/dict.jpg")}
                    />
                </View>
                <View style={{ flex: 0.8 }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a word"
                            textAlign= "center"
                            clearButtonMode="always"
                            onChangeText={searchWord}
                            value={word}
                        ></TextInput>
                    </View>

                    <View style = {{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 20,
                        marginBottom: 30
                    }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                getInfo();
                            }}
                        >
                            <Text style={styles.text}>Search</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                clear();
                            }}
                        >
                            <Text style={styles.text}>Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                speak();
                            }}
                        >
                            <Image 
                                style={styles.speaker}
                                source={require("./assets/speaker.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.info}>Entered Word: {checkedWord}</Text>
                        <Text style={styles.info}>Part Of Speech: {partOfSpeech}</Text>
                        <Text style={styles.info}>Word Definition: {definition}</Text>
                        <Text style={styles.info}>Example (if any): {example}</Text>
                    </View>
                </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight
    },
    image: {
        width: "80%",
        height: "120%",
        marginLeft: 30,
        marginTop: 50
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 5,
        borderColor: "rgba(80,235,236,1)",
        marginTop: 100,
        fontSize: 25
    },
    speaker: {
        width: 50,
        height: 40,
    },
    button: {
        backgroundColor: "rgba(80,235,236,0.3)",
        width: "35%",
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20
    },
    text: {
        fontSize: 25,
        alignSelf: "center",
        marginTop: 5
    },
    info: {
        fontSize: 25,
        marginTop: 10,
        marginLeft: 10,
    }
});
