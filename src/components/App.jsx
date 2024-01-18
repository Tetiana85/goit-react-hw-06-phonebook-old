import React from 'react';
import { Container } from './App.styled';
import { GlobalStyle } from './GlobalStyle';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, addContact, removeContact } from '../redux/contactSlice';
import { nanoid } from 'nanoid';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contactsSlice.contacts);
  const filter = useSelector(store => store.contactsSlice.filter);

  const handleFilter = evt => {
    const value = evt.target.value;
    dispatch(setFilter(value));
  };

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const handleAddContact = newContact => {
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkContact) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    const contact = { ...newContact, id: nanoid() };
    dispatch(addContact(contact));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm updateContact={handleAddContact} />
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
