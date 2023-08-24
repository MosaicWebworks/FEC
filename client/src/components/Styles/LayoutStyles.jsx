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
    primary: '#353535',
    secondary: '#353535',
    background: '#353535',
    text: 'yellow',
    textSecondary: 'yellow',
    textContrast: 'yellow'
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

const OuterContainer = styled(Container)`
max-width: 100%;
padding: 0 auto;`

const Section = styled.section`
  margin-bottom: 40px;
`;

export {
  Container,
  Section,
  PrimaryText,
  SecondaryText,
  theme,
  darkTheme,
  OuterContainer
}