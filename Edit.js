import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import datasource from './Data'; // Ensure correct import of datasource

const Edit = ({ route, navigation }) => {
    const { sectionIndex, itemIndex } = route.params; // Get section and item indices from params
    const pokemon = datasource[sectionIndex].data[itemIndex]; // Retrieve the specific Pokémon
    const [pokemonName, setPokemonName] = useState(pokemon.key); // Initialize state with Pokémon name
    const [cardNumber, setCardNumber] = useState(pokemon.cardNumber); // Initialize state with Pokémon card number

    const handleSave = () => {
        if (!pokemonName.trim() || !cardNumber.trim()) {
            Alert.alert('Error', 'Please enter a valid Pokémon name and card number.');
            return;
        }

        if (isNaN(cardNumber)) {
            Alert.alert('Error', 'Card number must be a number.');
            return;
        }

        // Update the Pokémon in the datasource
        datasource[sectionIndex].data[itemIndex] = {
            ...pokemon,
            key: pokemonName.trim(),
            cardNumber: cardNumber.trim(),
        };

        // Navigate back to the Home screen and force refresh
        navigation.navigate('Home');
    };

    const handleDelete = () => {
        Alert.alert(
            'Are you sure?',
            'This action will remove the Pokémon permanently.',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        // Remove the item from the data source
                        datasource[sectionIndex].data.splice(itemIndex, 1);

                        // Navigate back to the Home screen
                        navigation.navigate('Home');
                    },
                },
                {
                    text: 'No',
                    style: 'cancel', // Cancel style for clarity
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Input for Pokémon Name */}
            <Text style={styles.label}>Edit Pokémon Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Pokémon Name"
                value={pokemonName}
                onChangeText={setPokemonName}
            />

            {/* Input for Card Number */}
            <Text style={styles.label}>Edit Card Number:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Card Number"
                keyboardType="numeric" // Numeric keyboard for card number
                value={cardNumber}
                onChangeText={setCardNumber}
            />

            {/* Save and Delete Buttons */}
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button title="Save" onPress={handleSave} />
                </View>
                <View style={styles.button}>
                    <Button title="Delete" onPress={handleDelete} color="red" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
    },
});

export default Edit;
