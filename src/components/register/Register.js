import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
	loginUser,
} from "../../actions/commonActions";
import {Link} from "react-router-dom"
import profile from "../../images/profile.svg";
import Dropzone from 'react-dropzone';
import './Register.scss';


class Register extends Component {
	constructor(props){
		super(props);
		this.state={
			phone: "",
			phone_valid: false,
			email: "",
			email_valid: false,
			dd: "",
			dd_valid:0,
			mm: "",
			mm_valid: 0,
			yyyy: "",
			yyyy_valid: 0,
			image_name: "Drop an image here or click to select",
			image_error: ""
		}
	}

	handleFileUpload(e){
		e.preventDefault();
		var reader = new FileReader();

    reader.onload = function (e) {
				document.getElementById("user_image").src = e.target.result;
		};

		if(e.target.files[0].size > 551118){
			this.setState({
				image_error: "Image size must be smaller than 500kb."
			})
		}else{	
			reader.readAsDataURL(e.target.files[0]);
			this.setState({image_name:e.target.files[0].name, image_error: ""})		
		}
	}

	handleDobChange(e){
		let digits = /^\d+$/;
		let val = e.target.value;
		let name = e.target.name;
		let year= new Date().getFullYear();
		if(digits.test(val) || !val){
			
			if(name === "dd" && parseInt(val) > 31){
				this.setState({
					dd_valid: 2,
					[name]: val
				})
			}else if(name === "mm" && parseInt(val) > 12){
				this.setState({
					mm_valid: 2,
					[name]: val
				})
			}else if(name === "yyyy" && parseInt(val) > year){
				this.setState({
					yyyy_valid: 2,
					[name]: val
				})
			}else{
				if(name !== 'yyyy' && val.length === 2){
					this.refs[e.target.name].nextSibling.focus();
				}
				this.setState({
					[name+"_valid"]: 1,
					[name]: val
				})
			}
		}else{
			this.setState({
				[name]: this.state[name]
			})
		}
	}

	hello(e){
		console.log(e.target.id)
		alert("hello")
	}
  render() {
    return ([
			<header key="0" style={{"height": "70px", "background":"#fff", "box-shadow": "0 0.25rem 0.125rem 0 rgba(0,0,0,0.05)",  "color":"#212121", "display":"flex", "alignItems":"center"}}>
				<h4 style={{"paddingLeft":"20px","color":"#212121"}}>e-healthcare</h4>
			</header>,
      <div key="1" className="container register-container">
				<div className="row">
					<div className="col-sm-12">
						<h3>Create your e-healthcare account</h3>
						<hr/>
						<form>
							<div className="row input-col-wrapper">
								<div className="col-sm-4 input-container">
									<label htmlFor="full_name">Full name *</label>
									<input id="full_name" placeholder="Full name"/>
								</div>
								<div className="col-sm-4 input-container">
									<span id="label-container">	
										<label htmlFor="phone">Phone *</label>
										<div className="tooltip-container">
											<svg width="16" height="16" fill="#4364d1" viewBox="0 0 16 16"><path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path><path d="M9 13H7V7h2z"></path><path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path></svg>
											<div className="tooltip-data">
												<div className="tooltip-caret"></div>
												<p>Enter your phone number. We will send an OTP that will be needed to complete the registration process.</p>
											</div>
										</div>
									</span>
									<input id="phone" placeholder="Phone number"/>
								</div>
								<div className="col-sm-4 input-container">
									<span id="label-container">
										<label htmlFor="email">Email</label>
										<div className="tooltip-container">
											<svg width="16" height="16" fill="#4364d1" viewBox="0 0 16 16"><path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path><path d="M9 13H7V7h2z"></path><path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path></svg>
											<div className="tooltip-data">
												<div className="tooltip-caret"></div>
												<p>Enter your email id (optional). We will send an OTP that will be needed to complete the registration process.</p>
											</div>
										</div>
									</span>
									<input id="email" type="email" placeholder="Email"/>
								</div>
							</div>
							<hr/>
							<div className="row input-col-wrapper">
								<div className="col-sm-4 input-container">
									<span id="label-container">
										<label>Date of birth *</label>
										<div className="tooltip-container">
											<svg width="16" height="16" fill="#4364d1" viewBox="0 0 16 16"><path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path><path d="M9 13H7V7h2z"></path><path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path></svg>
											<div className="tooltip-data">
												<div className="tooltip-caret"></div>
												<p>Enter your date of birth in format DD-MM-YYYY. Eg: 12-05-1992</p>
											</div>
										</div>
									</span>
									<input id="dd" ref="dd" name="dd" value={this.state.dd} maxLength="2" onChange={e => this.handleDobChange(e)} placeholder="DD"/>
									<input id="mm" ref="mm" name="mm" value={this.state.mm} maxLength="2" onChange={e => this.handleDobChange(e)} placeholder="MM"/>
									<input id="yyyy" ref="yyyy" name="yyyy" maxLength="4" value={this.state.yyyy} onChange={e => this.handleDobChange(e)} placeholder="YYYY"/>
									{this.state.dd_valid === 2?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Date must be less than or equal to 31
										</div>
										: null
									}
									{this.state.mm_valid === 2?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Month must be less than or equal to 12
										</div>
										: null
									}
									{this.state.yyyy_valid === 2?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Year must be less than or equal to present year
										</div>
										: null
									}
								</div>
								<div className="col-sm-3 radio-container">
									<label className="gender-label">Gender *</label>
									<input type="radio" name="gender" id="male"/>
									<label htmlFor="male" className="radio-label radio-male">
										<i className="fa fa-male" aria-hidden="true"></i>
									</label>
									<input type="radio" name="gender" id="female"/>
									<label htmlFor="female" className="radio-label radio-female">
										<i className="fa fa-female" aria-hidden="true"></i>
									</label>
								</div>
								<div className="col-sm-5 input-container upload">
									<div className="upload-flex">
										<span>
											<span id="label-container">
												<label>Upload your image</label>
												<div className="tooltip-container">
													<svg width="16" height="16" fill="#4364d1" viewBox="0 0 16 16"><path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path><path d="M9 13H7V7h2z"></path><path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path></svg>
													<div className="tooltip-data">
														<div className="tooltip-caret"></div>
														<ul>
															<li>Supported formats are png, jpg, jpeg</li>
															<li>Image size must be less than or equal to 500kb</li>
															<li>Square dimensions are preffered. Eg: 100 &#10005; 100</li>
														</ul>
													</div>
												</div>
											</span>
											<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
												{({getRootProps, getInputProps}) => (
													<section>
														<div {...getRootProps()}>
															<input {...getInputProps()} accept="image/png, image/jpeg, image/jpg"  onChange={(e) => this.handleFileUpload(e)} />
															<p>{this.state.image_name}</p>
														</div>
													</section>
												)}
											</Dropzone>
										</span>
										<img src={profile} alt="profile" id="user_image"/>
									</div>
									{this.state.image_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											{this.state.image_error}
										</div>
										: null
									}
								</div>
							</div>
							<hr />
							<div className="row input-col-wrapper">
								<div className="col-sm-6 verification-container">
									<span id="label-container">
										<label>Verify mobile number *</label>
										<div className="tooltip-container">
											<svg width="16" height="16" fill="#4364d1" viewBox="0 0 16 16"><path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path><path d="M9 13H7V7h2z"></path><path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path></svg>
											<div className="tooltip-data">
												<div className="tooltip-caret"></div>
												<p>Enter the OPT sent to your mobile number to complete the verification process.</p>
											</div>
										</div>
									</span>
									{ this.state.phone_valid?
										<span>	
											<p className="opt-sent">OTP sent to your mobile number <b>9733581977</b></p>
											<div className="otp-container">
												<span>Enter the One Time Password (OTP)</span>
												<input maxLength="1"/>
												<input maxLength="1"/>
												<input maxLength="1"/>
												<input maxLength="1"/>
											</div>
											<br/>
											<button className="verify-button">Verify</button>
											<button className="resend-btn">RESEND OTP</button>
										</span>
										:
										<div className="alert alert-warning" role="alert">
											You have not entered a valid mobile number in the <span>Phone</span> field. Please enter a valid phone number to continue.
										</div>
									}
								</div>
								<div className="col-sm-6 verification-container">
									<span id="label-container">
										<label>Verify email id</label>
										<div className="tooltip-container">
											<svg width="16" height="16" fill="#4364d1" viewBox="0 0 16 16"><path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path><path d="M9 13H7V7h2z"></path><path d="M7 4a1 1 0 1 1 2 0 1 1 0 1 1-2 0"></path></svg>
											<div className="tooltip-data">
												<div className="tooltip-caret"></div>
												 <p>Enter the OPT sent to your email id to complete the verification process.</p>
											</div>
										</div>
									</span>
									{ this.state.email_valid?
										<span>
											<p>OTP sent to your email <b>princedey51@gmail.com</b></p>
											<div className="otp-container">
												<span>Enter the One Time Password (OTP)</span>
												<input maxLength="1"/>
												<input maxLength="1"/>
												<input maxLength="1"/>
												<input maxLength="1"/>
											</div>
											<br/>
											<button className="verify-button">Verify</button>
											<button className="resend-btn">RESEND OTP</button>
										</span>
										:
										<div className="alert alert-warning" role="alert">
											You have not entered a valid email id in the <span>Email</span> field. Please enter a valid email id to continue.
										</div>
									}
								</div>
							</div>
							<hr className="last-hr"/>
							<div className="row input-col-wrapper submit-col-wrapper">
								<div className="col-sm-4 input-container">
									<label htmlFor="password">Password *</label>
									<input type="password" id="password" placeholder="Password"/>
								</div>
								<div className="col-sm-4 input-container">
									<label htmlFor="cpassword">Confirm password *</label>
									<input type="password" id="cpassword" placeholder="Confirm password"/>
								</div>
								<div className="col-sm-4 submit-container">
									<span>
										<button>Register</button>
										<p>Already registered? <Link to="/login">Login here</Link></p>
									</span>
										
								</div>
							</div>
							<hr className="last-hr"/>
						</form>
					</div>
				</div>
			</div>
		])
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

const registerStore = connect(mapStateToProps, matchDispatchToProps)(Register);
export default registerStore;
