import styled, {ThemeProvider} from 'styled-components';
import {theme} from '../Styles/LayoutStyles.jsx';

export const StyledButton = styled.div`
color: ${({theme}) => theme.colors.textSecondary};
display: flex;
flex-direction: row;
justify-content: flex-end;
`

export const Button = styled.button`
color: ${({theme}) => theme.colors.textSecondary};
background-color: ${({theme}) => theme.colors.background};
border-radius: 10px;
height: 25px;
border: solid 1px grey;
margin-right: 10px;
`

export const photoLinkButton = styled(Button)`
display:flex;
justify-content: flex-end;`
// color: ${(props) => props.theme.colors.primary};

export const InputSubmit = styled.input`
color: ${({theme}) => theme.colors.textSecondary};
background-color: ${({theme}) => theme.colors.background};
border-radius: 10px;
height: 25px;
border: solid 1px grey;
margin-right: 10px;
`