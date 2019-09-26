import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import plus_blue from "../../images/plus-faded-blue.svg";
import box_grey from "../../images/box-grey.svg";
import {Link} from "react-router-dom";
import {
	loginUser,
} from "../../actions/commonActions";
import './Login.scss';

class Login extends Component {
	render() {
		return (
			<div className="container-fluid login-container">
				<div className="row">
					<div className="d-none d-md-block d-lg-block col-sm-7">
						<div className="graphic-container">
							<div className="graphic-items">
								<h1>
									Some awesome headline goes here
								</h1>
								<p>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
								</p>
							</div>
							<img src={plus_blue} alt="plus sign" className="svg-plus-blue" height="400" width="400"/>
						</div>
					</div>
					<div className="col-md-5 col-xs-12 col-sm-12">
						<div className="form-container">
							<div className="form-items">
								<h3>Welcome to e-healthcare</h3>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
								<form>
									<div className="input-container">
										<input className="login-input login-username" type="text" placeholder="USERNAME"/>
										<i className="fa fa-user-o" aria-hidden="true"></i>
									</div>
									<div className="input-container">
										<input className="login-input login-password" type="password" placeholder="PASSWORD"/>
										<i className="fa fa-key" aria-hidden="true"></i>
									</div>
									
									<a className="forgot-pwd" href="/login">Don't remember your password?</a>
									<button className="login-btn">Login</button>
									<Link className="register-btn" to="/register/">Register</Link>
								</form>
							</div>
							<img src={plus_blue} alt="plus sign" className="svg-plus-blue" height="100" width="100"/>
							{/* <img src={plus_blue_1} className="svg-dplus-blue" height="120" width="120"/> */}
							<img src={box_grey} alt="box" className="svg-box-grey" height="45" width="45"/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
			isLoggedin: state.commonReducer.isLoggedin,
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			loginUser: loginUser
		},
		dispatch
	);
}

const LoginStore = connect(mapStateToProps, matchDispatchToProps)(Login);
export default LoginStore;
