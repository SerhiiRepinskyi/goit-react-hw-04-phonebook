import PropTypes from 'prop-types';
import { ContactsList, ContactItem, Btn } from './ContactList.styled';

const ContactList = ({ contacts, deleteContact }) => {
  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  //   const sortedContacts = [...contacts].sort((a, b) => {
  //     if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  //     if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  //     return 0;
  //   });

  return (
    <ContactsList>
      {sortedContacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <span>{name}: </span>
          <span>{number}</span>
          <Btn type="submit" onClick={() => deleteContact(id)}>
            Delete
          </Btn>
        </ContactItem>
      ))}
    </ContactsList>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
