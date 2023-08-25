import styled from 'styled-components';



const PrimaryText = styled.div`
color:${({theme}) => theme.colors.text};
`

const SecondaryText = styled.div`
color:${({theme}) => theme.colors.textsecondary};
`
const theme = {
  colors: {
    primary: '#284B63',
    secondary: '#D9D9D9',
    background: '#FFFFFF',
    text: '#353535',
    textSecondary: '#3C6E71',
    textContrast: '#fca311'
  },
  fonts: {
    main: '"Helvetica Neue", sans-serif',
  },
};

const darkTheme = {
  colors: {
    primary: '#D9D9D9',
    secondary: '#284B63',
    background: '#353535',
    text: '#FFFFFF',
    textSecondary: '#FFFFFF',
    textContrast: '#FFFFFF'
  },
  fonts: {
    main: '"Helvetica Neue", sans-serif',
  },
};

const Container = styled.div`
  display: grid;

  max-width: 70%;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.main};
`;

const OuterContainer = styled(Container)`
max-width: 100%;
padding: 0 auto;`

const Section = styled.section`
  margin-bottom: 40px;
`;

const Heading1 = styled.h1`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Heading2 = styled.h2`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const MaxHeight = styled.div`
max-height: 50vh;
overflow-y: auto;`


export {
  Container,
  Section,
  PrimaryText,
  SecondaryText,
  theme,
  darkTheme,
  OuterContainer,
  Heading1,
  Heading2,
  MaxHeight
}