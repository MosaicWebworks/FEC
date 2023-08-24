import styled from 'styled-components';



const PrimaryText = styled.div`
color:${({theme}) => theme.colors.text};
`

const SecondaryText = styled.div`
color:${({theme}) => theme.colors.textsecondary};
`
const theme = {
  colors: {
    primary: '#219ebc',
    secondary: '#ffb703',
    background: '#8ecae6',
    text: '#023047',
    textSecondary: '#fb8500',
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