
fetch('https://raw.githubusercontent.com/mithunsasidharan/India-Pincode-Lookup/refs/heads/master/pincodes.json')
  .then(res => {
    if (!res.ok) throw new Error(`Failed to fetch data. Status: ${res.status}`);
    return res.json();
  })
  .then(data => {

    const clearSelect = (selectEl) => {
      selectEl.innerHTML = '<option value="">Select</option>';
    };

    const states = [...new Set(data.map(item => item.stateName))].sort();


    const addState = document.getElementById('add_state');
    const addCity = document.getElementById('add_city');
    const addPincode = document.getElementById('add_pincode');

    if (addState && addCity && addPincode) {
      states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        addState.appendChild(option);
      });

      addState.addEventListener('change', () => {
        const selectedState = addState.value;
        if (!selectedState) return;

        const cities = [...new Set(data.filter(item => item.stateName === selectedState).map(item => item.districtName))].sort();
        clearSelect(addCity);
        clearSelect(addPincode);

        cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          addCity.appendChild(option);
        });
      });

      addCity.addEventListener('change', () => {
        const selectedState = addState.value;
        const selectedCity = addCity.value;
        if (!selectedState || !selectedCity) return;

        const pins = [...new Set(data.filter(item => item.stateName === selectedState && item.districtName === selectedCity).map(item => item.pincode))].sort();
        clearSelect(addPincode);

        pins.forEach(pin => {
          const option = document.createElement('option');
          option.value = pin;
          option.textContent = pin;
          addPincode.appendChild(option);
        });
      });
    }

    const editState = document.getElementById('state_select');
    const editCity = document.getElementById('city_select');
    const editPincode = document.getElementById('pincode_select');

    if (editState && editCity && editPincode) {
      states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        editState.appendChild(option);
      });

      editState.addEventListener('change', () => {
        const selectedState = editState.value;
        if (!selectedState) return;

        const cities = [...new Set(data.filter(item => item.stateName === selectedState).map(item => item.districtName))].sort();
        clearSelect(editCity);
        clearSelect(editPincode);

        cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city;
          option.textContent = city;
          editCity.appendChild(option);
        });
      });

      editCity.addEventListener('change', () => {
        const selectedState = editState.value;
        const selectedCity = editCity.value;
        if (!selectedState || !selectedCity) return;

        const pins = [...new Set(data.filter(item => item.stateName === selectedState && item.districtName === selectedCity).map(item => item.pincode))].sort();
        clearSelect(editPincode);

        pins.forEach(pin => {
          const option = document.createElement('option');
          option.value = pin;
          option.textContent = pin;
          editPincode.appendChild(option);
        });
      });

      window.populateLocationFields = function (state, city, pincode) {
        editState.value = state;
        editState.dispatchEvent(new Event('change'));

        setTimeout(() => {
          editCity.value = city;
          editCity.dispatchEvent(new Event('change'));

          setTimeout(() => {
            editPincode.value = pincode;
          }, 200);
        }, 200); 
      };
    }
  })
  .catch(error => {
    console.error('Error loading location data:', error);
    alert('Could not load location data. Please check your internet connection or try again later.');
  });





// // India Pincode Selector with Select2
// // Initialize Select2 for all 6 dropdowns after DOM load
// document.addEventListener('DOMContentLoaded', () => {
//   ['#add_state', '#add_city', '#add_pincode', '#state_select', '#city_select', '#pincode_select'].forEach(id => {
//     $(id).select2({
//       placeholder: "Select",
//       width: '100%'
//     });
//   });
// });

// fetch('https://raw.githubusercontent.com/mithunsasidharan/India-Pincode-Lookup/master/pincodes.json')
//   .then(res => {
//     if (!res.ok) throw new Error(`Failed to fetch data. Status: ${res.status}`);
//     return res.json();
//   })
//   .then(data => {

//     const clearSelect = (selectEl) => {
//       selectEl.innerHTML = '<option value="">Select</option>';
//       $(selectEl).val(null).trigger('change.select2');
//     };

//     const states = [...new Set(data.map(item => item.stateName))].sort();

//     const addState = document.getElementById('add_state');
//     const addCity = document.getElementById('add_city');
//     const addPincode = document.getElementById('add_pincode');

//     if (addState && addCity && addPincode) {
//       states.forEach(state => {
//         const option = document.createElement('option');
//         option.value = state;
//         option.textContent = state;
//         addState.appendChild(option);
//       });
//       $(addState).trigger('change.select2');

//       addState.addEventListener('change', () => {
//         const selectedState = addState.value;
//         if (!selectedState) return;

//         const cities = [...new Set(data.filter(item => item.stateName === selectedState).map(item => item.districtName))].sort();
//         clearSelect(addCity);
//         clearSelect(addPincode);

//         cities.forEach(city => {
//           const option = document.createElement('option');
//           option.value = city;
//           option.textContent = city;
//           addCity.appendChild(option);
//         });
//         $(addCity).trigger('change.select2');
//       });

//       addCity.addEventListener('change', () => {
//         const selectedState = addState.value;
//         const selectedCity = addCity.value;
//         if (!selectedState || !selectedCity) return;

//         const pins = [...new Set(data.filter(item => item.stateName === selectedState && item.districtName === selectedCity).map(item => item.pincode))].sort();
//         clearSelect(addPincode);

//         pins.forEach(pin => {
//           const option = document.createElement('option');
//           option.value = pin;
//           option.textContent = pin;
//           addPincode.appendChild(option);
//         });
//         $(addPincode).trigger('change.select2');
//       });
//     }

//     const editState = document.getElementById('state_select');
//     const editCity = document.getElementById('city_select');
//     const editPincode = document.getElementById('pincode_select');

//     if (editState && editCity && editPincode) {
//       states.forEach(state => {
//         const option = document.createElement('option');
//         option.value = state;
//         option.textContent = state;
//         editState.appendChild(option);
//       });
//       $(editState).trigger('change.select2');

//       editState.addEventListener('change', () => {
//         const selectedState = editState.value;
//         if (!selectedState) return;

//         const cities = [...new Set(data.filter(item => item.stateName === selectedState).map(item => item.districtName))].sort();
//         clearSelect(editCity);
//         clearSelect(editPincode);

//         cities.forEach(city => {
//           const option = document.createElement('option');
//           option.value = city;
//           option.textContent = city;
//           editCity.appendChild(option);
//         });
//         $(editCity).trigger('change.select2');
//       });

//       editCity.addEventListener('change', () => {
//         const selectedState = editState.value;
//         const selectedCity = editCity.value;
//         if (!selectedState || !selectedCity) return;

//         const pins = [...new Set(data.filter(item => item.stateName === selectedState && item.districtName === selectedCity).map(item => item.pincode))].sort();
//         clearSelect(editPincode);

//         pins.forEach(pin => {
//           const option = document.createElement('option');
//           option.value = pin;
//           option.textContent = pin;
//           editPincode.appendChild(option);
//         });
//         $(editPincode).trigger('change.select2');
//       });

//       // Optional: Pre-fill Edit Modal location
//       window.populateLocationFields = function (state, city, pincode) {
//         editState.value = state;
//         $(editState).trigger('change.select2');
//         editState.dispatchEvent(new Event('change'));

//         setTimeout(() => {
//           editCity.value = city;
//           $(editCity).trigger('change.select2');
//           editCity.dispatchEvent(new Event('change'));

//           setTimeout(() => {
//             editPincode.value = pincode;
//             $(editPincode).trigger('change.select2');
//           }, 200);
//         }, 200);
//       };
//     }
//   })
//   .catch(error => {
//     console.error('Error loading location data:', error);
//     alert('Could not load location data. Please check your internet connection or try again later.');
//   });


