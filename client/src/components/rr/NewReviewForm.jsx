import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PhotoContainer, ModalForm, PhotoHeader, Submit, AlignContent } from '../Styles/ModalStyles.jsx';
import { ThemeProvider } from 'styled-components';
import { Container,Section,PrimaryText,SecondaryText, theme } from '../Styles/LayoutStyles.jsx';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textContrast};
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const RadioButtonGroup = styled.div`
  margin-bottom: 20px;
`;

const ErrorMessages = styled.div`
  margin-top: 20px;
  color: red;
`;

const Messages = styled.div`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.textContrast};
`;

const NewReviewForm = () => {

  const [rating, setRating] = useState(0);
  const ratingText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const [recommend, setRecommend] = useState('');

  const [characteristics, setCharacteristics] = useState({});
  const characteristicsList = [
    { id: 135240, name: 'Size', scale: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'] },
    { id: 135241, name: 'Width', scale: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'] },
    { id: 135242, name: 'Comfort', scale: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'] },
    { id: 135243, name: 'Quality', scale: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']},
    { id: 135244, name: 'Length', scale: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']},
    { id: 135245, name: 'Fit', scale: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']}

  ];

  //handle recommend event
  const handleChange = (e) => {
    setRecommend(e.target.value);
  };

  //handle characteristics event
  const handleCharacteristicChange = (id, e) => {
    const updatedCharacteristics = { ...characteristics };
    updatedCharacteristics[id] = Number(e.target.value);
    setCharacteristics(updatedCharacteristics);
  };

  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
//   error will occur if:
// Any mandatory fields are blank
// The review body is less than 50 characters
// The email address provided is not in correct email format
// The images selected are invalid or unable to be uploaded.

  const [errors, setErrors] = useState([]);

  // handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && images.length < 5) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(filesArray));
    }
  };


  const validateForm = () => {
    const errorsArray = [];

    // Validation rules:
    if (!rating) errorsArray.push('Overall rating is mandatory');
    if (recommend === null) errorsArray.push('Recommendation is mandatory');
    if (!summary) errorsArray.push('Review summary is mandatory');
    if (body.length < 50) errorsArray.push('Review body is less than 50 characters');
    if (!nickname) errorsArray.push('Nickname is mandatory');
    if (!email) errorsArray.push('Email is mandatory');
    if (!email.includes('@')) errorsArray.push('Email must be in valid format');

    return errorsArray;
  };

  //submit form
  //submit and window close
  const [showReviewForm, setShowReviewForm] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      product_id: 40350,
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend === 'Yes',
      name: nickname,
      email: email,
      photos: images,
      characteristics: characteristics
    };

    // Send POST request to the server
    axios.post('/data/reviews', data)
      .then((response) => {
        console.log('Data sent successfully:', response);
      })
      .catch((error) => {
        console.error('An error occurred while sending data:', error);
      });

    //close window:
    setShowReviewForm(false);
  };


  return (
    showReviewForm ? (
    <form onSubmit={handleSubmit}>
      <h1 data-testid="new-review-title">Write Your Review</h1>
      {/* Overall Rating */}
      <InputGroup>
      <Label>Overall rating (mandatory)*</Label>
      <div>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            onClick={() => handleRatingClick(index)}
            style={{ cursor: 'pointer', color: index < rating ? '#fca311' : 'gray' }}
          >
            ★
          </span>
        ))}
        {rating > 0 && <span> - {ratingText[rating - 1]}</span>}
      </div>
      </InputGroup>
      {/* Recommend*/}
      <RadioButtonGroup>
      <Label>Do you recommend this product? (mandatory)*</Label>
      <div>
        <Label>
          <input
            type="radio"
            value="Yes"
            checked={recommend === 'Yes'}
            onChange={handleChange}
          /> Yes
        </Label>
        <Label>
          <input
            type="radio"
            value="No"
            checked={recommend === 'No'}
            onChange={handleChange}
          /> No
        </Label>
      </div>
      </RadioButtonGroup>

      {/* Characteristics  */}
      {/* <label>{characteristics}</label> */}
      <RadioButtonGroup>
      <div>
      {characteristicsList.map((item, index) => (
        <div key={index}>
          <Label>{item.name}</Label>
          <p>{characteristics[item.id] !== undefined ? item.scale[characteristics[item.id]] : "none selected"}</p>
          <div>
            {item.scale.map((scaleItem, scaleIndex) => (
              <Label key={scaleIndex}>
                <input
                  type="radio"
                  value={scaleIndex}
                  checked={characteristics[item.id] === scaleIndex}
                  onChange={(e) => handleCharacteristicChange(item.id, e)}
                />
                {scaleIndex + 1}
              </Label>
            ))}
          </div>
        </div>
      ))}
    </div>
    </RadioButtonGroup>
      {/* Review Summary */}
      <InputGroup>
      <Label>Review summary</Label>
      <input
        type="text"
        maxLength="60"
        placeholder="Example: Best purchase ever!"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      </InputGroup>
      {/* Review Body */}
      <InputGroup>
      <Label>Review body (mandatory)*</Label>
      <textarea
        maxLength="1000"
        placeholder="Why did you like the product or not?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
       <Messages>
        {body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}
      </Messages>
      </InputGroup>

      {/* Upload Photos */}
      <RadioButtonGroup>
      <Label>Upload your photos</Label>
      {images.length < 5 && (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt="uploaded preview" width="50" />
        ))}
      </div>
      </RadioButtonGroup>

      {/* Nickname */}
      <InputGroup>
      <Label>What is your nickname (mandatory)*</Label>
      <input
        type="text"
        maxLength="60"
        placeholder="Example: jackson11!"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Messages>For privacy reasons, do not use your full name or email address</Messages>
      </InputGroup>

      {/* Email */}
      <InputGroup>
      <Label>Your email (mandatory)*</Label>
      <input
        type="email"
        maxLength="60"
        placeholder="Example: jackson11@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Messages>For authentication reasons, you will not be emailed</Messages>
      </InputGroup>

      {/* Submit Button */}
      <Button type="submit">Submit review</Button>

      {/* Error Messages */}
      <ErrorMessages>
      {errors.length > 0 && (
        <div>
          <h3>You must enter the following:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      </ErrorMessages>
    </form>
  ) : (
    <div>Thanks for submitting your review!</div>
  )
  );
};

export default NewReviewForm;

