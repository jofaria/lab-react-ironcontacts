import "./App.css";
import contactsJSON from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5));

  const [remainingContacts, setRemainingContacts] = useState(
    contactsJSON.slice(contacts.length, contactsJSON.length)
  );

  function randomCeleb() {
    let randomNum = (Math.random() * remainingContacts.length).toFixed();
    let randomCel = remainingContacts[randomNum];

    setContacts([...contacts, randomCel]);
    // this also works: setContacts(contacts.concat(randomCel));
  }

  function sortAlpha() {
    const newArr = [...contacts];
    newArr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setContacts([...newArr]);
  }

  function sortPopularity() {
    const newSortedArr = [...contacts];
    newSortedArr.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    setContacts([...newSortedArr]);
  }

  function deleteCeleb(celebId) {
    const newArr = [...contacts];

    const filteredArr = newArr.filter((celeb) => {
      return celeb.id !== celebId;
    });
    setContacts([...filteredArr]);
  }

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <div className="buttons">
        <button onClick={randomCeleb}>Add Random Contact</button>
        <button onClick={sortAlpha}>Sort by Name</button>
        <button onClick={sortPopularity}>Sort by Popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((celebrity) => {
            // const popularityRounded = celebrity.popularity.toFixed(2);

            return (
              <tr className="celebCard">
                <td>
                  <img
                    src={celebrity.pictureUrl}
                    height="200px"
                    alt="contact-profile"
                  />
                </td>
                <td>{celebrity.name}</td>
                <td>{celebrity.popularity.toFixed(2)}</td>
                {celebrity.wonOscar && <td>🏆</td>}
                {!celebrity.wonOscar && <td></td>}
                {celebrity.wonEmmy && <td>🏆</td>}
                {!celebrity.wonEmmy && <td></td>}
                <td>
                  <button
                    onClick={() => {
                      deleteCeleb(celebrity.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
