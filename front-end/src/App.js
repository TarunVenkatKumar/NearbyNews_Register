import imager from './logo.png'
import './App.css';
import React,{ useState, useEffect} from 'react';
import Axios from 'axios';

function App() {
  const initialValues = { email: "", pincode: "" , city:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const register = () => {
    Axios.post("http://localhost:5000/user/", formValues).then((response)=>{
      console.log(response);
      alert("Successfully Registered");
    });
  }
  const getAllUsers = () =>{
    Axios.get('http://localhost:5000/user/allusers/').then((response)=>{
      console.log(response.data);
    })
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.pincode) {
      errors.pincode = "Pincode is required";
    } else if (values.pincode.length !== 6 || Number.isInteger(values.pincode)) {
      errors.pincode = "Pincode must be a 6 digit number";
    }
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      register();
      getAllUsers();
    }
  });

  return (
    <div className="bg-container">
      <div className='image-container'>
          <img className="image" src={imager} alt=""/>
        </div>
        <h1 className='heading'>Registration</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label-text'>Email address</label>
          <input type="text" className='form-control' name="email" 
            placeholder='Enter your e-mail address' value={formValues.email} 
            onChange={handleChange}
          />
          <p className='error-message'>{formErrors.email}</p>
        </div>
        <div className="form-group">
          <label className='label-text'>Pincode</label>
          <input type="text" className='form-control' name="pincode" 
            placeholder='Enter your pincode' value={formValues.pincode}
            onChange={handleChange}
          />
          <p className='error-message'>{formErrors.pincode}</p>
        </div>
        <div className="form-group">
          <label className='label-text'>City</label>
          <select className='form-control' name="city" value={formValues.city}
            onChange={handleChange}>
            <option value="" disabled>Select your City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
          <p className='error-message'>{formErrors.city}</p>
        </div>
        <button type="submit" className="button">Subscribe</button>
      </form>
    </div>
  );
}

export default App;
