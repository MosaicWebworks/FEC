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
`
// color: ${(props) => props.theme.colors.primary};
export const InputSubmit = styled.input`
color: ${({theme}) => theme.colors.textSecondary};
`