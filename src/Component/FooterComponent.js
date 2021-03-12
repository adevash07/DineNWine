import React from 'react';
import { Link } from "react-router-dom"

function Footer(props) {
	return (
	<div className="footer">
		<div className="container">
		<div className="row justifty-content-center">
			<div className="col-4 offser-1 col-sm-2">
				<h5>Links </h5>
					<ul className="list-unstyled">
						<li><Link to="/home">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/menu">Menu</Link></li>
						<li><Link to="/contact">Contact</Link></li>
					</ul>
				</div>
				<div className="col-7 col-sm-5">
					<h5>Our Address</h5>
					<address>
				121, Clear Water Bay Road <br />
				Clear Water Bay, Kowloon <br />
				HONG KONG<br />
				<i className="fa fa-phone fa-lg"></i>: +862 1235 5678 <br />
				<i className="fa fa-fax fa-lg"></i>: +862 1235 5678 <br />
				<i className="fa fa-envelope  fa-lg"></i>: <a href="mailto:confusion@food.net">
						Confusion@food.net</a>
					</address>
				</div>
				<div className="col-12 col-sm-4 align-self-cemter">
					<div className="text-cneter">
						<a href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
						<a href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
						<a href="http://www.linkdin.com/in/"><i className="fa fa-linkedin"></i></a>
						<a href="http://www.twitter.com/"><i className="fa fa-twitter"></i></a>
						<a href="http://youtube.com/+"><i className="fa fa-youtube"></i></a>
						<a href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i></a>
					</div>
				</div>
			</div>
			<div className="row justifty-content-center">
				<div className="col-auto">
					<p>  copyright 2018 DINE 'N' WHINE </p>
				</div>
			</div>
		</div>
	</div>

		)
}

export default Footer;