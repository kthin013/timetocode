import React from 'react';

const UserContext = React.createContext({
  userId: '',
  name: '',
  musicVolume: '0.2',
  soundVolume: '0.2',
  dialogueVolume: '1'
});

export default UserContext;