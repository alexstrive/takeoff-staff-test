import { RootState } from '@/store';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CardActions,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Email, LocalPhone } from '@mui/icons-material';
import React, { useState } from 'react';
import { updateContact, deleteContact } from '@/store/contacts.slice';

type ViewContactProps = {
  contactValues: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  onModeChange: (changedMode: boolean) => void;
};

function ViewContact({
  contactValues: { firstName, lastName, email, phone },
  onModeChange,
}: ViewContactProps) {
  return (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary={<a href={`mailto:${email}`}>{email}</a>} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <LocalPhone />
            </ListItemIcon>
            <ListItemText primary={phone} />
          </ListItem>
        </List>
      </CardContent>

      <CardActions>
        <Button size="medium" onClick={() => onModeChange(true)}>
          Edit
        </Button>
      </CardActions>
    </>
  );
}

type EditContactProps = {
  contactId: number;

  contactValues: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  onModeChange: (changedMode: boolean) => void;
};

function EditContact({
  contactId,
  contactValues: { firstName, lastName, email, phone },
  onModeChange,
}: EditContactProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    dispatch(
      updateContact({
        contactId,
        updatedValues: { firstName, lastName, email, phone },
      })
    );

    onModeChange(false);
  }

  function handleDelete() {
    navigate('/account/contacts');
    dispatch(deleteContact({ contactId }));
  }

  return (
    <>
      <Box component="form" onSubmit={handleSave}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <TextField
              defaultValue={firstName}
              margin="dense"
              id="first_name"
              name="first_name"
              label="First Name"
              variant="outlined"
              size="small"
            />{' '}
            <TextField
              defaultValue={lastName}
              margin="dense"
              id="last_name"
              name="last_name"
              label="Last Name"
              variant="outlined"
              size="small"
            />
          </Typography>
          <List>
            <ListItem disablePadding>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 400 }}
                defaultValue={email}
                margin="normal"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                size="small"
              />
            </ListItem>
            <ListItem disablePadding>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                sx={{ width: 400 }}
                defaultValue={phone}
                id="phone"
                name="phone"
                label="Phone number"
                variant="outlined"
                size="small"
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button size="medium" variant="contained" type="submit">
            Save
          </Button>
          <Button size="medium" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Box>
    </>
  );
}

export default function ContactViewer() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { contactId } = useParams<{ contactId: string }>();
  const contactIdNum = Number.parseInt(contactId ?? '');
  const contactsData = useSelector((state: RootState) => state.contacts.data);
  const selectedContact = contactsData.filter(
    (contact) => contact.id == contactIdNum
  )[0];

  const contactValues = {
    firstName: selectedContact.first_name,
    lastName: selectedContact.last_name,
    email: selectedContact.email,
    phone: selectedContact.phone,
  };

  function handleModeChange(changedMode: boolean) {
    setIsEditMode(changedMode);
  }

  return (
    <div>
      <Card sx={{ marginTop: 5 }}>
        <CardMedia
          component="img"
          height="300"
          image={selectedContact.bigAvatar}
          alt="Avatar"
        />
        {isEditMode ? (
          <EditContact
            contactId={selectedContact.id}
            contactValues={contactValues}
            onModeChange={handleModeChange}
          />
        ) : (
          <ViewContact
            contactValues={contactValues}
            onModeChange={handleModeChange}
          />
        )}
      </Card>
    </div>
  );
}
