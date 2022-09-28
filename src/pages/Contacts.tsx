import {
  Avatar,
  Grid,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { RootState } from '@/store';

import AddIcon from '@mui/icons-material/Add';
import { createContact } from '@/store/contacts.slice';

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const contact = data[index];

  return (
    <Link to={`${contact.id}`}>
      <ListItemButton style={style} key={contact.id} component="div" dense>
        <ListItemAvatar>
          <Avatar alt="User avatar" src={contact.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={`${contact.firstName} ${contact.lastName}`}
          secondary={contact.email}
        />
      </ListItemButton>
    </Link>
  );
}

export default function Contacts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const contacts = useSelector((state: RootState) => state.contacts);
  const contactsData = contacts.data;

  function handleSearchQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value.toLowerCase());
  }

  const filteredContacts = useMemo(() => {
    if (!searchQuery) {
      return contactsData;
    }

    return contactsData.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchQuery) ||
        contact.lastName.toLowerCase().includes(searchQuery) ||
        contact.email.toLowerCase().includes(searchQuery) ||
        contact.phone.toLowerCase().includes(searchQuery)
    );
  }, [searchQuery, contactsData]);

  function handleCreateContact() {
    dispatch(createContact());

    const newContactId = contactsData.length + 1;

    navigate(`/account/contacts/${newContactId}`);
  }

  console.log();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ padding: 1.5 }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Person search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCreateContact} edge="end">
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <FixedSizeList
            height={window.innerHeight - 150} // need special hook for auto-adjust
            width={'100%'}
            itemSize={75}
            itemCount={filteredContacts.length}
            overscanCount={5}
            itemData={filteredContacts}
          >
            {renderRow}
          </FixedSizeList>
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
