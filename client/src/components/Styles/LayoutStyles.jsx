import styled from 'styled-components';



const PrimaryText = styled.div`

`

const SecondaryText = styled.div`

`
const theme = {
  colors: {
    primary: 'blue',
    secondary: 'steelblue',
    background: '	#f0f8ff',
    text: '#5A5A5A',
  },
  fonts: {
    main: '"Helvetica Neue", sans-serif',
  },
};

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.main};
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Heading1 = styled.h1`
  color: ${(props) => props.theme.colors.primary};
`;

const Heading2 = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
`;

export {
  Container,
  Section,
  Heading1,
  Heading2,
  PrimaryText,
  SecondaryText,
  theme
}