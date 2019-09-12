import React, { useState } from 'react';

import IPhrase from './interfaces/phrase';
import PhraseTest from './components/phrase-test';
import styled from 'styled-components';

const AppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  min-height: 100vh;
`;

export default function App() {
  const [phrase, setPhrase] = useState<IPhrase>({
    english: 'What music do you like?',
    spanish: 'Que música te gusta'
  });

  return (
    <AppContainer>
      <PhraseTest phrase={phrase} />
    </AppContainer>
  );
}
