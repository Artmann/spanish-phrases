import React, { FormEvent, Fragment, useEffect, useState } from 'react';

import IPhrase from '../interfaces/phrase';
import IWord from '../interfaces/word';
import WordField from './word-field';
// @ts-ignore
import compare from 'fuzzy-comparison';
import styled from 'styled-components';

interface IPhraseTestProps {
  phrase: IPhrase;
  onCorrectPhrase: Function;
}

const Form = styled.form`
  align-items: center;
  display: flex;
  justify-content;
  margin-bottom: 6rem;
`;

const HiddenButton = styled.button`
  display: none
`;

const EnglishText = styled.p`
  font-size: 2.5rem;
  margin: 0;
`;

export default function PhraseTest({ phrase, onCorrectPhrase }: IPhraseTestProps) {
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    setWords(phrase.spanish.split(/\s/).map((part, index) => ({
      isCorrect: false,
      index,
      input: '',
      text: part
    }) as IWord));
  }, [ phrase ]);

  const correctInput = (event: FormEvent) => {
    event.preventDefault();

    const correctedWords = words.map(word => ({
      ...word,
      isCorrect: compare(word.text.toLocaleLowerCase(), word.input.toLocaleLowerCase())
    }));

    if (correctedWords.every(({ isCorrect }) => isCorrect)) {
      onCorrectPhrase();
    }

    setWords(correctedWords);
  };

  const updateWord = (index: number, text: string) => {
    const updatedWords = words.map(word => {
      if (word.index !== index) {
        return word;
      }

      return {
        ...word,
        input: text
      };
    });

    setWords(updatedWords);
  };

  const renderWords = (word: IWord, index: number) => {
    return (
      <WordField
        correctWord={ word.text }
        isCorrect={ word.isCorrect }
        onChange={(text: string) => { updateWord(index, text); }}
        word={ word.input }
        key={ word.text }
        />
    );
  };

  return (
    <Fragment>
      <Form onSubmit={ correctInput } >
        { words.map(renderWords) }
        <HiddenButton>Correct Phrase</HiddenButton>
      </Form>
      <EnglishText>
        { phrase.english }
      </EnglishText>
    </Fragment>
  );
}
