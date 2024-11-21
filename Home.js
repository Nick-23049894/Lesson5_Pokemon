import React from 'react';
import { SectionList, TouchableOpacity, StyleSheet, Text, View, Image, Button } from 'react-native';
import datasource from './Data';

const Home = ({ navigation }) => {
    // Render each item in the SectionList
    const renderItem = ({ item, section, index }) => {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() =>
                    navigation.navigate('Edit', {
                        sectionIndex: datasource.indexOf(section), // Index of the section
                        itemIndex: index, // Index of the item within the section
                    })
                }
            >
                <Text style={styles.pokemonName}>{item.key}</Text>
                <Image
                    source={{
                        uri: `https://dz3we2x72f7ol.cloudfront.net/expansions/151/en-us/SV3pt5_EN_${item.cardNumber}-2x.png`,
                    }}
                    style={styles.pokemonImage}
                />
            </TouchableOpacity>
        );
    };

    // Render the section header for the SectionList
    const renderSectionHeader = ({ section: { title, bgColor, icon } }) => (
        <TouchableOpacity
            style={[styles.headerContainer, { backgroundColor: bgColor }]}
            onPress={() => alert(`You clicked on ${title}`)}
        >
            <Text style={styles.headerText}>
                {icon} {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Add Pokémon Button */}
            <Button
                title="Add Pokémon"
                onPress={() => navigation.navigate('Add')} // Navigate to the Add screen
            />

            {/* SectionList */}
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.key}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    headerContainer: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    pokemonName: {
        fontSize: 16,
        flex: 1,
        textAlign: 'left',
    },
    pokemonImage: {
        width: 210,
        height: 300,
        borderRadius: 5,
    },
});
