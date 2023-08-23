import styled from 'styled-components';



const PrimaryText = styled.div`
color:${({theme}) => theme.colors.primary};
`

const SecondaryText = styled.div`
color:${({theme}) => theme.colors.secondary};
`
const theme = {
  colors: {
    primary: 'blue',
    secondary: 'steelblue',
    background: '	#f0f8ff',
    tertiary: 'green',
    text: '#5A5A5A',
    textSecondary: 'steelblue',
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

export {
  Container,
  Section,
  PrimaryText,
  SecondaryText,
  theme
}