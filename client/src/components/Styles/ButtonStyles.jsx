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
cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textContrast};
  }
`
export const QuestionListButton = styled.button`
background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textContrast};
  }`
export const photoLinkButton = styled(Button)`
display:flex;
justify-content: flex-end;`
// color: ${(props) => props.theme.colors.primary};

export const InputSubmit = styled.input`
background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textContrast};
  }
`





