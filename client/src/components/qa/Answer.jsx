import React from 'react';




const Answer = ({answer}) => (

  <div>
    <div>
    <b>A:</b> {answer.body}
    </div>
    <div className="username"><b>{answer.answerer_name}</b></div>
    <small className="data-answered">{answer.date}</small>
  </div>
)

export default Answer;