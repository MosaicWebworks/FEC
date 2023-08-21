import React, {useState, useEffect} from 'react';
import axios from 'axios';



//take in choice
const Report = ({path, id}) => {
  const [isReported, setIsReported] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReported) {
      console.log('already reported');
    } else {
      setIsReported(true);
      axios.put(`/data/qa/${path}/${id}/report`)
        .then((results) => console.log(results))
        .catch((err) => console.log('err'));
      }
  }

  return (
    <button onClick={handleSubmit}>Report</button>
  )


}
// return a report button


export default Report;