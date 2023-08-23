import styled from 'styled-components';
import {theme} from '../Styles/LayoutStyles.jsx';

export const StyledButton = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
color: ${({theme}) => theme.colors.primary};
`
