import styled, {ThemeProvider} from 'styled-components';
import {theme} from '../Styles/LayoutStyles.jsx';

export const StyledButton = styled.div`
color: ${({theme}) => theme.colors.textSecondary};
display: flex;
flex-direction: row;
justify-content: flex-end;
`

export const Button = styled.button`
background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  height: 40px;
  border-radius: 5px;
  text-align: center;
  vertical-align: middle;

  margin: 10px;
  border: none;
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
justify-content: flex-end;
`


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





