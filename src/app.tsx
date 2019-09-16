import React, { useState } from 'react';

import PhraseTest from './components/phrase-test';
import phrases from './phrases';
import styled from 'styled-components';

const AppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

export default function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  const onCorrectPhrase = () => {
    setPhraseIndex(phraseIndex + 1);
  }

  const index = phraseIndex % phrases.length;

  return (
    <AppContainer>
      <PhraseTest
        phrase={ phrases[index] }
        onCorrectPhrase={ onCorrectPhrase }
        />
    </AppContainer>
  );
}
