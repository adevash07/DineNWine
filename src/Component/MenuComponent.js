import React from 'react';
import { Card, CardImg , CardImgOverlay,  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { BaseImgUrl } from '../shared/BaseUrls'



const Menu = ({ dishes }) => {
	console.log(dishes);
		const menu = dishes.map((dish) => {
			return (
				<div style={{ marginLeft: "10em", color: "#0000aa", fontWeight:"bolder"}}  key={dish.id} className="col-12 col-md-5 m-2 mx-auto shadow rounded grow">
					<Card id={dish.id}>
					<Link to={`/menu/${dish.id}`}>
						<CardImg  width='80%' src={BaseImgUrl + dish.image} alt={dish.name} />
						<CardImgOverlay>
							<CardTitle>{dish.name}</CardTitle>
						</CardImgOverlay>
					</Link>
				</Card>
				</div>
				);
		});
	
	if (dishes.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (dishes.errMess) {
		return( 
			<div className="coantainer">
				<div className="row">
					<div className="col-12">
						<h4>{dishes.errMess} </h4>
					</div>
				</div>
			</div>
		)
	} else {

			return (
				<div className="container">
					<div className="row">
						{menu}
					</div>
					<div className='row'>
						<Breadcrumb>
							<BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
							<BreadcrumbItem active>Menu</BreadcrumbItem>
						</Breadcrumb>
					</div>
					<div className="col-12">
						<h3>Menu</h3>
						<hr />
					</div>
				</div>
			);
		}
	}

	export default Menu; 