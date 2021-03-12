/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Label, Col, Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => (val) => !isNaN(Number(val.length));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Contact extends React.Component {
  constructor(props) {
  	super(props);


  	this.handleSubmit = this.handleSubmit.bind(this);
  }


  
  //handleInputChange(event) {
  //	const target = event.target;
  //	const value = target.type === 'checbox' ? target.checked : target.value;
  //	const name = target.name;
//	console.log(value);
 // 	this.setState({
//  		[name]: value
//	});
//  }

  handleSubmit(values) {
	  this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.message, values.agree, 
		values.contactType);
	  console.log('Current State is: ' + JSON.stringify(values));
	  this.props.resetFeedbackForm();
  }
/********
  handleBlur = (field) => (evt) => {
  	this.setState({
  		touched: {...this.state.touched, [field]: true}
  	});
  }

  validate(firstname, lastname, telnum, email) {
  	const errors = {
  		firstname: '',
  		lastname: '',
  		telnum: '',
  		email: ''
  	};

  	if (this.state.touched.firstname && firstname.length < 3) {
 		errors.firstname = "First Name should not be less than 3";
  	} else if (this.state.touched.firstname && firstname.length > 10) {
 		errors.firstname = "First Name should not be morthan 10";
 	}

	if (this.state.touched.lastname && lastname.length < 3) {
 		errors.lastname = "Last Name should not be less than 3";
	} else if (this.state.touched.lastname && lastname.length > 10) { 
 		errors.lastname = "Last Name should not be more than 10";
 	}
 		
 		const reg = /^\d+$/;

 	if (this.state.touched.telnum && !reg.test(telnum)) {
 		errors.telnum = "Tel. no cant contian alphabets";
 	}

 	if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1){
 		errors.email = "Email is not valid";
 	}
 
 	return errors;

  }****************/

  render() {
  	 return (
    	<div className="container">
			<div className="row row-content">
				<div className="col-12">
					<h3>Contact Us</h3>
					<hr />
			</div>
			<div className="col-12">
				<h3>Location Information</h3>
			</div>
		
			<div className="col-12 col-sm-4 offset-sm-1">
					<h5>Our Address</h5>
					<address>
					121, Clear Water Bay Road<br />
					Clear Water Bay, Kowloon<br />
					Hong Kong<br />
					<i className="fa fa-phone"></i>: +852 1234 5678<br />
					<i className="fa fa-fax"></i>: +852 1234 5678<br />
					<i className="fa fa-envelope-open"></i>: <a href="mailtoLconfusion@food.net">confusion@food.net</a>
					</address>
			</div>
			<div className="col-12 col-sm-11 offset-sm-1">
				<div className="btn-group" role="group">
				<a role="button" className="btn btn-primary" href="tel:+852 1234 5678"><i className="fa fa-phone"></i>Call </a>
				<a role="button" className="btn btn-info" href="tel:+852 1234 5678"><i className="fa fa-skype"></i>Skype </a>
				<a role="button" className="btn btn-success" href="mailtoLconfusion@food.net"><i className="fa fa-envelope-o"></i>Call </a>	
				</div>
			</div>
		</div>
		<div className="row row-content">
			<div className="col-12">
				<h3>Send us your feedback</h3>
			</div>
			 <div className="col-12 col-md-9">
			 	<Form model="feedback" onSubmit= {(values) => this.handleSubmit(values)}>
			 		<Row className="form-group"> 
			 			<Label htmlFor="firstname" md={2}>First Name</Label>
			 				<Col md={10}>
			 					<Control.text model=".firstname" id="firstname" name='firstname'
			 						placeholder="First Name"
			 						className="form-control"
			 						validators = {{
			 							required, minLength:minLength(3), maxLength:maxLength(15)
			 						}} />
			 					<Errors 
			 						className="text-danger"
			 						model=".firstname"
			 						show="touched"
			 						messages={{
			 							required: "This Information is required",
			 							minLength: "Must be greater than 2 characters",
			 							maxLength: 'Must be 15 characters or less'
			 						}}> </Errors>
			 					</Col>
			 				</Row>
			 		<Row className="form-group"> 
			 			<Label htmlFor="lastname" md={2}>Last Name</Label>
			 				<Col md={10}>
			 					<Control.text model=".lastname" id="lastname" name='lastname'
			 						placeholder="Last Name"
			 						className="form-control"
			 						validators={{
			 							required, minLength:minLength(3), maxLength:maxLength(15)
			 						}}
			 						 />
			 						<Errors 
			 						className="text-danger"
			 						model=".lastname"
			 						show="touched"
			 						messages={{
			 							required: "This Information is required",
			 							minLength: "Must be greater than 2 characters",
			 							maxLength: 'Must be 15 characters or less'
			 						}}> </Errors>
			 				</Col>
			 		</Row>
			 		
			 		<Row className="form-group"> 
			 			<Label htmlFor="telnum" md={2}>Tel. Number</Label>
			 				<Col md={10}>
			 					<Control.text model=".telnum" id="telnum" name='telnum'
			 						placeholder="Tel. Number"
			 						className="form-control"
			 						validators={{
			 							required, minLength:minLength(3), maxLength:maxLength(15), isNumber
			 						}}
			 						 />
			 						 <Errors 
			 						className="text-danger"
			 						model=".telnum"
			 						show="touched"
			 						messages={{
			 							required: "This Information is required",
			 							minLength: "Must be greater than 2 characters",
			 							maxLength: 'Must be 15 characters or less',
			 							isNumber: "Must be a number"
			 						}}> </Errors>
			 				</Col>
			 		</Row>
			 		
			 		<Row className="form-group"> 
			 			<Label htmlFor="email" md={2}>Email</Label>
			 				<Col md={10}>
			 					<Control.text model=".email" id="email" name='email'
			 						placeholder="adc@agt.com"
			 						className="form-control"
			 						validators={{
			 							required, minLength:minLength(3), validEmail
			 						}} />
			 					<Errors 
			 						className="text-danger"
			 						model=".email"
			 						show="touched"
			 						messages={{
			 							required: "This Information is required",
			 							minLength: "Must be greater than 2 characters",
			 							isNumber: "Must be a number"
			 						}}> </Errors>	
			 				</Col>
			 		</Row>
			 		
			 		<Row className="form-group">
			 			<Col md={{size: 6, offset: 2}}>
							<div className="form-check">
								<Label check>
									<Control.checkbox model=".agree" id="agree" name='agree'
			 							className="form-check-input" /> {' '}
			 						<strong>May we contact you?</strong>
			 					</Label>
			 				</div>
			 			</Col>
			 			<Col md={{size: 3, offset: 1}}>
			 					<Control.select model=".contactType" id="contactType" name='contactType'
			 						className="form-control"			 						>
			 						<option>Tel.</option>
			 						<option>Email</option>
			 					</Control.select>
			 				</Col>
			 		</Row>
			 		<Row className="form-group"> 
			 			<Label htmlFor="message" md={2}>Your Feedback</Label>
			 				<Col md={10}>
			 					<Control.textarea model=".message" id="message" name='message'
			 						rows="12"
			 						className="form-control" />
			 				</Col>
			 		</Row>
			 		<Row className="Form-group"> 
			 				<Col md={{size:10, offset: 2}}>
			 					<Button type="submit" color="primary">
			 						Send Feedback
			 					</Button>
			 				</Col>
			 		</Row>
			 	</Form>
			 </div>
		</div>
	<div className='row'>
			<Breadcrumb>
				<BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
				<BreadcrumbItem active>Menu</BreadcrumbItem>
			</Breadcrumb>
		</div>
    </div>
 
  );

  		}

 }

export default Contact;