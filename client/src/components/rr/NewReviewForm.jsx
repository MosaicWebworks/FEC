import React, { useState } from 'react';
import axios from 'axios';
import {PhotoContainer, ModalForm, PhotoHeader, Submit, AlignContent} from '../Styles/ModalStyles.jsx';

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
    console.log('Sending data:', data);
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
      {/* <h2>About the product</h2> */}
      {/* Overall Rating */}
      <label>Overall rating (mandatory)*</label>
      <div>
        {[1, 2, 3, 4, 5].map((star, index) => (
          <span
            key={index}
            onClick={() => handleRatingClick(index)}
            style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
        {rating > 0 && <span> - {ratingText[rating - 1]}</span>}
      </div>
      {/* Recommend*/}
      <label>Do you recommend this product? (mandatory)*</label>
      <div>
        <label>
          <input
            type="radio"
            value="Yes"
            checked={recommend === 'Yes'}
            onChange={handleChange}
          /> Yes
        </label>
        <label>
          <input
            type="radio"
            value="No"
            checked={recommend === 'No'}
            onChange={handleChange}
          /> No
        </label>
      </div>
      {/* Characteristics  */}
      {/* <label>{characteristics}</label> */}
      <div>
      {characteristicsList.map((item, index) => (
        <div key={index}>
          <label>{item.name}</label>
          <p>{characteristics[item.id] !== undefined ? item.scale[characteristics[item.id]] : "none selected"}</p>
          <div>
            {item.scale.map((scaleItem, scaleIndex) => (
              <label key={scaleIndex}>
                <input
                  type="radio"
                  value={scaleIndex}
                  checked={characteristics[item.id] === scaleIndex}
                  onChange={(e) => handleCharacteristicChange(item.id, e)}
                />
                {scaleIndex + 1}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
      {/* Review Summary */}
      <label>Review summary</label>
      <input
        type="text"
        maxLength="60"
        placeholder="Example: Best purchase ever!"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      {/* Review Body */}
      <label>Review body (mandatory)*</label>
      <textarea
        maxLength="1000"
        placeholder="Why did you like the product or not?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div>
        {body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}
      </div>

      {/* Upload Photos */}
      <label>Upload your photos</label>
      {images.length < 5 && (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      )}
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt="uploaded preview" width="50" />
        ))}
      </div>

      {/* Nickname */}
      <label>What is your nickname (mandatory)*</label>
      <input
        type="text"
        maxLength="60"
        placeholder="Example: jackson11!"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <div>For privacy reasons, do not use your full name or email address</div>

      {/* Email */}
      <label>Your email (mandatory)*</label>
      <input
        type="email"
        maxLength="60"
        placeholder="Example: jackson11@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>For authentication reasons, you will not be emailed</div>

      {/* Submit Button */}
      <button type="submit">Submit review</button>

      {/* Error Messages */}
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
    </form>
  ) : (
    <div>Thanks for submitting your review!</div>
  )
  );
};

export default NewReviewForm;

