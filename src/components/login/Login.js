import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
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
						</div>
					</div>
					<div className="col-md-5 col-xs-12 col-sm-12">
						<div className="form-container">
							<div className="form-items">
								<h3>Welcome to <span>eprescription+</span></h3>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
								<form>
									<div className="input-container">
										<input className="login-input login-username" type="text" placeholder="USERNAME"/>
										<i class="fa fa-user-o" aria-hidden="true"></i>
									</div>
									<div className="input-container">
										<input className="login-input login-password" type="password" placeholder="PASSWORD"/>
										<i class="fa fa-key" aria-hidden="true"></i>
									</div>
									<a href="#">Don't remember your password?</a>
									<button className="login-btn">Login</button>
									<button className="register-btn">Create Profile</button>
								</form>
							</div>
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
