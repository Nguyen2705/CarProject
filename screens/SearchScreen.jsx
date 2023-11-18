import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SearchScreen = () => {
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [make, setMake] = useState('');
    const [year, setYear] = useState('');

    // Example data for the dropdowns
    const models = [{ label: 'Model 1', value: 'model1' }, { label: 'Model 2', value: 'model2' }];
    const types = [{ label: 'Sedan', value: 'sedan' }, { label: 'SUV', value: 'suv' }];
    const makes = [{ label: 'Make 1', value: 'make1' }, { label: 'Make 2', value: 'make2' }];
    const years = [{ label: '2020', value: '2020' }, { label: '2021', value: '2021' }];

    const handleSearch = () => {
        console.log(model, type, make, year);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Car Search</Text>

            <RNPickerSelect
                onValueChange={(value) => setModel(value)}
                items={models}
                placeholder={{ label: 'Select a model', value: null }}
                style={pickerSelectStyles}
            />

            <RNPickerSelect
                onValueChange={(value) => setType(value)}
                items={types}
                placeholder={{ label: 'Select a type', value: null }}
                style={pickerSelectStyles}
            />

            <RNPickerSelect
                onValueChange={(value) => setMake(value)}
                items={makes}
                placeholder={{ label: 'Select a make', value: null }}
                style={pickerSelectStyles}
            />

            <RNPickerSelect
                onValueChange={(value) => setYear(value)}
                items={years}
                placeholder={{ label: 'Select a year', value: null }}
                style={pickerSelectStyles}
            />

            <Button title="Search" onPress={handleSearch} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 10,
    },
});

export default SearchScreen;
