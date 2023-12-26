import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import { GlobalStyle } from './GlobalStyle';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import initialContacts from '../contacts.json';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    } else {
      setContacts(initialContacts);
      localStorage.setItem('contacts', JSON.stringify(initialContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilter = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = contactId => {
    const updatedContacts = contacts.filter(item => item.id !== contactId);
    setContacts(updatedContacts);
  };

  const addContact = newContact => {
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    const contact = { ...newContact, id: nanoid() };
    setContacts([...contacts, contact]);
  };

  const filteredList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filteredList();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm updateContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onUpdateFilter={handleFilter} />
      {filteredContacts.length > 0 && (
        <ContactList items={filteredContacts} onDelete={deleteContact} />
      )}
      <GlobalStyle />
    </Container>
  );
};

export default App;
