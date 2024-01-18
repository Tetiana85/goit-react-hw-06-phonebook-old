import React from 'react';
import { useSelector } from 'react-redux';
import {
  ListItemText,
  DeleteButton,
  ListItem,
  List,
} from './ContactList.styled';

const ContactList = ({ onDelete }) => {
  const contacts = useSelector(state => state.contactsSlice.contacts);

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <ListItemText>
            {name} - {number}
          </ListItemText>
          <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
