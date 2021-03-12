import React from 'react';
import { Card, CardImg , CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
			Modal, ModalHeader, ModalBody, ModalFooter,Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { BaseImgUrl } from '../shared/BaseUrls';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
		console.log('Current State is: ' + JSON.stringify(values));
		alert('Current State is: ' + JSON.stringify(values));
	}

	toggleModal() {
		this.setState(
			{
				isModalOpen: !this.state.isModalOpen
			}
		);
	}
	render(){
		return (
			<React.Fragment>
				<span className="container mb-5" onClick={this.toggleModal}><Button type={Button} className="btn btn-light border"
					value="Submit comment"><span>
						<i className="fa fa-edit fa-lg" />
					</span>Submit comment</Button>
				</span>
				{/*THE MODAL*/}
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor=".ratings" md={2}><strong>Ratings</strong></Label>
								<Col md={{ size: 10 }}>
									<Control.select model=".rating" id="rating" name='rating'
										className="form-control custom-select"                                  >
										<option></option>
										<option>1 - Very Satisfied</option>
										<option>2 - Somewhat satisfied</option>
										<option>3 - Neither satisfiied nor Disatisfied</option>
										<option>4 - Somewhat Disatisfied</option>
										<option>5 - Disatisfied</option>
									</Control.select>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="fullname" md={2}>First Name</Label>
								<Col md={10}>
									<Control.text model=".author" id="author" name='author'
										placeholder="Full Name"
										className="form-control"
										validators={{
											required, minLength: minLength(3), maxLength: maxLength(15)
										}} />
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: "This Information is required",
											minLength: "Must be greater than 2 characters",
											maxLength: 'Must be 15 characters or less'
										}}> </Errors>
								</Col>
							</Row>

							<Row className="form-group">
								<Label htmlFor="message" md={2}>Your Feedback</Label>
								<Col md={10}>
									<Control.textarea model=".comment" id="comment" name='comment'
										rows="12"
										className="form-control" />
								</Col>
							</Row>
							<ModalFooter>
								<Button color="primary" type="submit" >Submit</Button>{' '}
								<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
							</ModalFooter>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment >
		);
	}
	
}


function DishDetails({ dish }) {
	return (

		<div className="col-12 col-md-5 m-1">
			<FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
				<Card>
					<CardImg width="100%" top src={`${BaseImgUrl}${dish.image}`} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>	
		</div>

	);
}

function RenderComments({dishId, comments, postComment}) {
	if (comments != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">
						<Stagger in>
						{comments.map((comment) => {
							return (
								<Fade in>
									<li key={comment.id}>
										<p>{comment.comment}</p>
										<p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',
											{ year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </p>
									</li>
								</Fade>
							);
						})}
						</Stagger>
				</ul>
				<CommentForm dishId = {dishId} postComment={postComment} />
			</div>
		);
	}
}

const RenderDish = ({ dish, comments, postComment, dishId , isLoading, errMess} ) => {
	if (isLoading) {
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);

	} else if (errMess) {
		return(
			<div className="container">
				<div className="row">
					<h4>{ errMess }</h4>
				</div>
			</div>
		);
	} else if (dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">

					<DishDetails dish={dish} />
					<RenderComments comments={ comments } 
										postComment={postComment}
										dishId={dishId}         />

				</div>
			</div>
		);
	} else {
		return(
			<div classname="container">
				<div className="row">
					<Loading></Loading>
				</div>
			</div>
		)
	}
}



/*const RenderDish = ({dish, comments, postComment, dishId}) =>  {


		console.log(dish);
		console.log(comments);
	
		function RenderComments({comments}) {
	
			const comment = comments.map( com => {
				return (
					<div key={com.id}>
						<CardTitle>Comment - { com.comment }</CardTitle>
							<CardBody>
									<p><cite>By - {com.author}</cite></p>
									<p>Date of comment : {com.date}</p>
							</CardBody>
						</div>
					)
				});
		return comment
}						 dishId = dish.id;
		const handleSubmit = (values) => {
				  postComment(dishId, values.rating, values.author, values.comment);
				  toggle();
				  console.log("submitted");
  				}
		  
		  const [modal, setModal] = useState(false);

		  const toggle = () => setModal(!modal);
	return ( 
		<div className="container">
			<div className="row">
				<div style={{ marginLeft: "10em"}}  key={(dish.id + 30)} className="col-12 col-md-5 mt-5 m-2 mx-auto
				 shadow rounded grow">
					<Card>
						<CardImg  width='100%' src={dish.image} alt={dish.name} />
							<CardBody>
								<CardTitle>{dish.name}</CardTitle>
								<CardText> {dish.description}</CardText>
							</CardBody>
					</Card>
						<CardBody>
							<CardTitle> Comments </CardTitle>
							<CardText> {dish.description}</CardText>
						</CardBody>
					</div>
					<div style={{ marginLeft: "10em"}} className="col-12 col-md-5 mt-5 m-2 mx-auto shadow rounded">
					<Card>
						<RenderComments comments={ comments} 
								postComment={postComment}
								dishId={dish.id} />
						<div className="container mb-5" onClick={toggle}><Button className="btn btn-light border"
						 value="Submit comment"><span>
							<i className="fa fa-edit fa-lg" />
							</span>Submit comment</Button></div>
					</Card>
					</div>
					<Modal isOpen={modal} toggle={toggle} className="modal-dialog modal-lg">
				        <ModalHeader toggle={toggle}>Submit Commits</ModalHeader>
				        <ModalBody>
				          <LocalForm onSubmit= {(values) => handleSubmit(values)}>
				          	<Row className="form-group">
							<Label htmlFor=".rating" md={2}><strong>Ratings</strong></Label>
					 			<Col md={{size: 10}}>
					 					<Control.select model=".rating" id="rating" name='rating'
					 						className="form-control custom-select"			 						>
					 						<option></option>
					 						<option>Very Satisfied</option>
					 						<option>Somewhat satisfied</option>
					 						<option>Neither satisfiied nor Disatisfied</option>
					 						<option>Somewhat Disatisfied</option>
					 						<option>Disatisfied</option>
					 					</Control.select>
					 				</Col>
					 		</Row>

				          	<Row className="form-group"> 
					 			<Label htmlFor="author" md={2}>First Name</Label>
					 				<Col md={10}>
					 					<Control.text model=".author" id="author" name='author'
					 						placeholder="Full Name"
					 						className="form-control"
					 						validators = {{
					 							required, minLength:minLength(3), maxLength:maxLength(15)
					 						}} />
					 					<Errors 
					 						className="text-danger"
					 						model=".author"
					 						show="touched"
					 						messages={{
					 							required: "This Information is required",
					 							minLength: "Must be greater than 2 characters",
					 							maxLength: 'Must be 15 characters or less'
					 						}}> </Errors>
			 					</Col>
			 				</Row>

					 		<Row className="form-group"> 
					 			<Label htmlFor="comment" md={2}>Your Feedback</Label>
					 				<Col md={10}>
					 					<Control.textarea model=".comment" id="author" name='comment'
					 						rows="12"
					 						className="form-control" />
					 				</Col>
					 		</Row>
								 <ModalFooter>
							          <Button color="primary" type="submit" >Submit</Button>{' '}
							          <Button color="secondary" onClick={toggle}>Cancel</Button>
							     </ModalFooter>
				          </LocalForm>
				        </ModalBody>
				      </Modal>
				</div>
					<div className='row'>
						<Breadcrumb>
							<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
							<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>
			)
		}*/

export default RenderDish