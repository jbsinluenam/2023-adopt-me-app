import { useState, useEffect } from "react";
import Pet from "./Pet";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // Declaring state variable "location" with initial value ""
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = [];

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    //fetching data from API
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    //converting response to json
    const json = await res.json();
    //setting pets state variable with json data
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form>
        {/* Creating a label with "htmlFor" attribute and text "Location" */}
        <label htmlFor="location">
          Location
          {/* Creating an input field with onChange event handler */}
          <input
            onChange={(e) => setLocation(e.target.value)}
            // Setting id of input field
            id="location"
            // Displaying value of location state variable
            value={location}
            // Setting placeholder text
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>

      {
        /* Displaying pets data */
        pets.map((pet) => (
          <Pet
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
          />
        ))
      }
    </div>
  );
};

// Exporting SearchParams component
export default SearchParams;
