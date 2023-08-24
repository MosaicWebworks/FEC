import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyledButton, Button} from '../Styles/ButtonStyles.jsx'


//take in choice
const Report = ({path, id, setIsReported}) => {
  // const [isReported, setIsReported] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsReported(true);
    axios.put(`/data/qa/${path}/${id}/report`)
      .then(() => setIsReported(true))
      .catch((err) => console.log('err'));

  }

  return (
    <StyledButton>
      <Button onClick={handleSubmit}>Report {path.slice(0, path.length -1)}</Button>
    </StyledButton>
  )


}
// return a report button


export default Report;