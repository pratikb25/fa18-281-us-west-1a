/*
	UI Component to show payment web page
*/
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
  withRouter,

} from 'react-router-dom'

import axios from 'axios';
import {paymentUrl} from '../../actions/urlConstant';


import * as paymentActions from '../../apis/payment-api';


import '../../index.css';
import '../../stylesheets/payment.css';
// import '../../stylesheets/bootstrap.min.css'

class payment extends Component {
	constructor(props){
		super(props);
		this.state={
			orderId: 10,
			totalAmount: 314,

		}
		this.handleButton = this.handleButton.bind(this);
	}

	componentDidMount = () => {
		console.log('componentDidMount ---')
		// this.props.PaymentGetAll();

		axios.get(`${paymentUrl}/payments` )
    .then( res => {
      console.log('after axiosGetAll, res:', res);

			// dispatch(getAll(res.data));
			this.props.PaymentGetAll(res.data)
    }).catch( res => {
      console.log('xx  error axiosGetAll, error:', res);
    })


	}

	handleButton(event) {
		event.preventDefault();
		console.log(`handleButton orderId=${this.state.orderId}, totalAmount=${this.state.totalAmount}`);

	}

	render() {
		return (
			<div className="menu-home">
				<div className="outerdiv">
						<div className="header">
								<div className="leftheader"> The Counter Custom burgers </div>
								<div className="rightheader">
										<div className="topnav">
												<a >Home</a>
												<a >Create Account</a>
												<a >Login</a>
										</div>
								</div>
						</div>
						<div className="content">
							<div className="card center">
								<h2 id="center">Payment Overview</h2>

								<h3>Order Summary</h3>
								<table>
									<tbody>
										<tr>
											<td>Order Id:</td>
											<td>$?</td>
										</tr>
										<tr>
											<td>Total Amount:</td>
											<td>$?</td>
										</tr>
									</tbody>
								</table>
								
								<h3>Enter your address</h3>
								<form>
									<label>Address</label>
									<input type="text" id="address" name="address" />
									<label>City</label>
									<input type="text" id="city" name="city" />
									<label>Zipcode</label>
									<input type="text" id="zipcode" name="zipcode" />
								</form>
								
								<h3>Enter your payment method</h3>
								<form>
									<label>Card Number</label>
									<input type="text" id="cardnumber" name="cardnumber" />
									<label>Name on Card</label>
									<input type="text" id="nameoncard" name="nameoncard" />
									<label>Expiration Date (mmddyyyy) </label>
									<input type="text" id="expiration" name="expiration" />
								</form>

								<div className="btn-container">
									{/* <button onClick={this.handleButton}>Pay for your order</button> */}
									<input type="button" className="payment_button" value="Pay for your order" onClick={this.handleButton} />
								</div>
							</div>
						</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.payment.data,

	}
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		PaymentGetAll: () => { dispatch(paymentActions.axiosGetAll()); },
// 	}
// }

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		PaymentGetAll: paymentActions.getAll,
	}, dispatch)
}

// function mapDispatchToProps(dispatch) {
// 	return bindActionCreators({
// 			updateMenuList: updateMenuList
// 	}, dispatch)
// }


const connectedPayment = connect(mapStateToProps, mapDispatchToProps)(payment);

export default connectedPayment;
