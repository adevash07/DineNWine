import React from 'react';
import { Card, CardImg , CardText, CardBody, CardTitle } from 'reactstrap';


const RenderDish = (props) =>  {

				console.log(props.dish);

					if (props.dish.length != null ) {

					const comment = props.dish[0].comments.map( com => {
					return (
						<div key={com.id}>
						<CardTitle>Comment - { com.comment }</CardTitle>
						<CardBody>
						<p><cite>By - {com.author}</cite></p>
						<p>Date of comment : {com.date}</p>
						</CardBody>
						</div>
						)
				}) 

				return ( 
						<div className="row">
						<div style={{ marginLeft: "10em"}}  key={(props.dish.id + 30)} className="col-12 col-md-5 mt-5 m-2 mx-auto shadow rounded grow">
						<Card>
							<CardImg  width='100%' src={props.dish[0].image} alt={props.dish[0].name} />
							<CardBody>
								<CardTitle>{props.dish[0].name}</CardTitle>
								<CardText> {props.dish[0].description}</CardText>
							</CardBody>
						</Card>
							<CardBody>
								<CardTitle> Comments </CardTitle>
								<CardText> {props.dish[0].description}</CardText>
							</CardBody>
							</div>
						<div style={{ marginLeft: "10em"}} className="col-12 col-md-5 mt-5 m-2 mx-auto shadow rounded grow">
						<Card>
							{comment}
						</Card>
						</div>
						</div>
						
					)
			} else {
				return (<div> </div>)
				}
			
			

		}

export default RenderDish;