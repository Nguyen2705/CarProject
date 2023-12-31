import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const App = () => {
  const [yearsData, setYearsData] = useState([]);
  const [makesData, setMakesData] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [trimsData, setTrimsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      const response = await axios.get('https://car-api2.p.rapidapi.com/api/years', {
        headers: {
          'X-RapidAPI-Key': '5d3ed09a33msh8bac4b622f400b3p19e1c1jsn2aba9231b546',
          'X-RapidAPI-Host': 'car-api2.p.rapidapi.com',
        },
      });
      if (response.data && Array.isArray(response.data)) {
        // Filter years from 2015 to 2020 since the free Car API only allows that
        const filteredYears = response.data.filter(year => year >= 2015 && year <= 2020);
        setYearsData(filteredYears.map(year => ({ value: year, label: year.toString() })));
      } else {
        console.error('Years data is not in the expected format');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleYearChange = (item) => {
    setSelectedYear(item.value);
    setSelectedMake(null); // Clear selected make
    setSelectedModel(null); // Clear selected model
    setSelectedTrim(null); // Clear selected trim
    fetchMakes(item.value);
    setModelsData([]); // Clear models data
    setTrimsData([]); // Clear trims data
  };

  const fetchMakes = async (year) => {
    try {
      const response = await axios.get('https://car-api2.p.rapidapi.com/api/makes', {
        params: { direction: 'asc', sort: 'id', year: year },
        headers: {
          'X-RapidAPI-Key': '5d3ed09a33msh8bac4b622f400b3p19e1c1jsn2aba9231b546',
          'X-RapidAPI-Host': 'car-api2.p.rapidapi.com',
        },
      });
  
      if (response.data && Array.isArray(response.data.data)) {
        const makes = response.data.data.map(make => ({ value: make.name, label: make.name }));
        setMakesData(makes);
      } else {
        console.error("Makes data is not in the expected format", response.data);
      }
    } catch (error) {
      console.error("Error fetching makes:", error);
    }
  };

  const handleMakeChange = (item) => {
    setSelectedMake(item.value);
    setSelectedModel(null); // Clear selected model
    setSelectedTrim(null); // Clear selected trim
    fetchModels(selectedYear, item.value);
    setTrimsData([]); // Clear trims data
  };

  const fetchModels = async (year, make) => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://car-api2.p.rapidapi.com/api/models',
        params: { sort: 'id', direction: 'asc', year: year, make: make, verbose: 'yes' },
        headers: {
          'X-RapidAPI-Key': '5d3ed09a33msh8bac4b622f400b3p19e1c1jsn2aba9231b546',
          'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
      });
  
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        const models = response.data.data.map(model => ({ value: model.name, label: model.name }));
        setModelsData(models);
      } else {
        console.error("Models data is not in the expected format", response.data);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };
  

  const handleModelChange = (item) => {
    setSelectedModel(item.value);
    setSelectedTrim(null); // Clear selected trim
    fetchTrims(selectedYear, selectedMake, item.value);
  };

  const fetchTrims = async (year, make, model) => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://car-api2.p.rapidapi.com/api/trims',
        params: { direction: 'asc', sort: 'id', year: year, make: make, model: model, verbose: 'yes' },
        headers: {
          'X-RapidAPI-Key': '5d3ed09a33msh8bac4b622f400b3p19e1c1jsn2aba9231b546',
          'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
        },
      });
  
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Use Set to filter out duplicate values
        const uniqueTrims = [...new Set(response.data.data.map(trim => trim.name))];
        const trims = uniqueTrims.map(trim => ({ value: trim, label: trim }));
        setTrimsData(trims);
      } else {
        console.error("Trims data is not in the expected format", response.data);
      }
    } catch (error) {
      console.error("Error fetching trims:", error);
    }
};
  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo5.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>CARVO</Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={yearsData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Year' : '...'}
          searchPlaceholder="Search..."
          value={selectedYear}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleYearChange}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={makesData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Make' : '...'}
          searchPlaceholder="Search..."
          value={selectedMake}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleMakeChange}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={modelsData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Model' : '...'}
          searchPlaceholder="Search..."
          value={selectedModel}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleModelChange}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={trimsData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Trim' : '...'}
          searchPlaceholder="Search..."
          value={selectedTrim}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => setSelectedTrim(item.value)}
        />
        <TouchableOpacity
  style={styles.submitButton}
  onPress={() => {
    if (selectedYear && selectedMake && selectedModel && selectedTrim) {
      Alert.alert(
        `You have selected\nYear: ${selectedYear}\nMake: ${selectedMake}\nModel: ${selectedModel}\nTrim: ${selectedTrim}`,
      );
    } else {
      Alert.alert('Please select values for all options.');
    }
  }}
>
  <Text style={styles.submitButtonText}>Search</Text>
</TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 130,
    height: 100,
  },
  logoText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  submitButton: {
    backgroundColor: '#faca63',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#333363',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
