import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SearchScreen = () => {
    const [model, setModel] = useState('');
    const [trim, setTrim] = useState('');
    const [make, setMake] = useState('');
    const [year, setYear] = useState('');
    const [makes, setMakes] = useState([]);
    const [years, setYears] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const commonHeaders = {
        'X-RapidAPI-Key': '5d3ed09a33msh8bac4b622f400b3p19e1c1jsn2aba9231b546',
        'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
    };

    const handleApiResponse = (result, setStateFunction, dataType) => {
        if (result.message === "Too many requests") {
            console.log("Rate limit reached. Please try again later.");
            return;
        }

        const data = result.data || result;
        const isYears = dataType === 'years';
        const formattedData = data.map(item => ({
            label: isYears ? item.toString() : item.name,
            value: isYears ? item : item.id.toString()
        }));

        setStateFunction(formattedData);
    };

    const fetchCarYears = async () => {
        const response = await fetch('https://car-api2.p.rapidapi.com/api/years', { method: 'GET', headers: commonHeaders });
        const result = await response.json();
        handleApiResponse(result, setYears, 'years');
    };

    const fetchCarMakes = async () => {
        const response = await fetch('https://car-api2.p.rapidapi.com/api/makes?direction=asc&sort=id', { method: 'GET', headers: commonHeaders });
        const result = await response.json();
        handleApiResponse(result, setMakes, 'makes');
    };

    const fetchCarModels = async () => {
        const response = await fetch(`https://car-api2.p.rapidapi.com/api/models?sort=id&direction=asc&year=${year}&verbose=yes`, { method: 'GET', headers: commonHeaders });
        const result = await response.json();
        handleApiResponse(result, setModels, 'models');
    };

    const fetchCarTrims = async () => {
        const response = await fetch(`https://car-api2.p.rapidapi.com/api/trims?direction=asc&sort=id&year=${year}&verbose=yes`, { method: 'GET', headers: commonHeaders });
        const result = await response.json();
        handleApiResponse(result, setTrims, 'trims');
    };

    useEffect(() => {
        fetchCarYears();
    }, []);

    useEffect(() => {
        if (year) {
            fetchCarMakes();
        } else {
            setMakes([]);
            setMake('');
        }
    }, [year]);

    useEffect(() => {
        if (make) {
            fetchCarModels();
        } else {
            setModels([]);
            setModel('');
        }
    }, [make]);

    useEffect(() => {
        if (model) {
            fetchCarTrims();
        } else {
            setTrims([]);
            setTrim('');
        }
    }, [model]);

    const handleSearch = () => {
        console.log(year, make, model, trim);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Car Search</Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <RNPickerSelect
                        onValueChange={(value) => setYear(value)}
                        items={years}
                        placeholder={{ label: 'Select a year', value: null }}
                        style={pickerSelectStyles}
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setMake(value)}
                        items={makes}
                        placeholder={{ label: 'Select a make', value: null }}
                        style={pickerSelectStyles}
                        disabled={!year}
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setModel(value)}
                        items={models}
                        placeholder={{ label: 'Select a model', value: null }}
                        style={pickerSelectStyles}
                        disabled={!make}
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setTrim(value)}
                        items={trims}
                        placeholder={{ label: 'Select a trim', value: null }}
                        style={pickerSelectStyles}
                        disabled={!model}
                    />
                    <Button title="Search" onPress={handleSearch} />
                </>
            )}
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
