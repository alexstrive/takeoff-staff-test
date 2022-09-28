import ContactsData from './contacts.json';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ContactsState = {
  selectedContactId?: number;
  data: typeof ContactsData;
};

export const initialContactsState: ContactsState = {
  data: ContactsData.slice(0, 5),
};

function findContactIndex(state: ContactsState, contactId: number) {
  return state.data.findIndex((contact) => contact.id === contactId);
}

let globalNextAvailableContactId = initialContactsState.data.length + 1;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    deleteContact(state, action: PayloadAction<{ contactId: number }>) {
      state.data = state.data.filter(
        (contact) => contact.id !== action.payload.contactId
      );
    },
    createContact(state) {
      state.data.push({
        id: globalNextAvailableContactId,
        firstName: 'New',
        lastName: 'Contact',
        phone: '+7',
        email: 'example@gmail.com',
        avatar:
          'https://robohash.org/rationedoloribuslaudantium.png?size=50x50&set=set1',
        bigAvatar:
          'https://robohash.org/rationedoloribuslaudantium.png?size=500x500&set=set1',
      });

      globalNextAvailableContactId++;
    },
    updateContact(
      state,
      action: PayloadAction<{
        contactId: number;
        updatedValues: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
        };
      }>
    ) {
      const targetContactIndex = findContactIndex(
        state,
        action.payload.contactId
      );

      const { firstName, lastName, phone, email } =
        action.payload.updatedValues;

      state.data[targetContactIndex].firstName = firstName;
      state.data[targetContactIndex].lastName = lastName;
      state.data[targetContactIndex].email = email;
      state.data[targetContactIndex].phone = phone;
    },
  },
});

export const { updateContact, deleteContact, createContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
