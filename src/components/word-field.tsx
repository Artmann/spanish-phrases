import React, { FormEvent, useLayoutEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface IWordFieldProps {
  correctWord: string;
  isCorrect: boolean;
  onChange: Function;
  word: string;
}

interface IActivatable {
  isActive: boolean;
}

const sharedStyles = css<IActivatable>`
  color: #fff;
  font-family: inherit;
  font-size: 1.5rem;
  left: 0;
  margin: 0;
  opacity: ${ props => props.isActive ? '1' : '0' };
  padding: 0.5rem 1.25rem;
  position: ${ props => props.isActive ? 'relative' : 'absolute' };
  text-align: center;
  top: 0;
  transition: opacity .4s ease-in;
`;

const Container = styled.div`
  position: relative;
  margin: 0 1rem;
`;

const Field = styled.input<IActivatable>`
  ${sharedStyles}

  background: none;
  border: none;
  border-bottom: solid 1px #fff;
  width: ${ props => props.width };

  &:focus {
    border-bottom: solid 2px #fff;
    outline: none;
  }
`;

const Label = styled.p<IActivatable>`
  ${sharedStyles}

  font-weight: 600;
  max-width: 100%;
`;

export default function WordField({ correctWord, isCorrect, onChange, word }: IWordFieldProps) {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const [width, setWidth] = useState('');

  useLayoutEffect(() => {
    if (!labelRef.current) {
      return;
    }

    const style = getComputedStyle(labelRef.current);

    setWidth(style.getPropertyValue('width'));
  }, [word]);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange(event.currentTarget.value);
  };

  return (
    <Container>
      <Label
        isActive={isCorrect}
        ref={labelRef}
      >
        { correctWord }
      </Label>
      <Field
        defaultValue={word}
        disabled={isCorrect}
        isActive={!isCorrect}
        onChange={handleChange}
        width={width}
        />
    </Container>
  );
}
