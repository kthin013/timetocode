import { render } from '@testing-library/react';
import React, {useState} from 'react';
import UserContext from './UserContext';

describe('UserContext', () => {
  it('Renders UserContext component', ()=> {
    const test = () => {
      const [user, setUser] = useState({
        userId: '',
        name: '',
      });
      render(
      <UserContext.Provider value={{ user, setUser }}/>
      );
    };
  });
});

