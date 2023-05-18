import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  Container,
  Title,
  Subtitle,
  AmountContacts,
  ContactsNum,
  Message,
} from './App.styled';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      // console.log('Оновилося поле contacts');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const isAdded = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isAdded) {
      return alert(`${name} is already in contacts.`);
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = evt => {
    const { value } = evt.currentTarget;
    this.setState({ filter: value });
  };

  deleteContact = todoId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== todoId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <Subtitle>Contacts</Subtitle>
        <AmountContacts>
          All contacts in the phonebook:{' '}
          <ContactsNum>{contacts.length}</ContactsNum>
        </AmountContacts>

        {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          </>
        ) : (
          <Message>Contact list is empty</Message>
        )}
      </Container>
    );
  }
}

export default App;
