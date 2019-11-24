import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
	loginUser,
	registerUser
} from "../../actions/commonActions";
import {Link} from "react-router-dom"
import profile from "../../images/profile.svg";
import Dropzone from 'react-dropzone';
import {Spinner} from "react-bootstrap";
import './Register.scss';


class Register extends Component {
	constructor(props){
		super(props);
		this.state={
			full_name: "",
			full_name_error: false,
			phone: "",
			phone_error: false,
			phone_valid: false,
			email: "",
			email_error: 0,
			dd: "",
			dd_valid:0,
			mm: "",
			mm_valid: 0,
			yyyy: "",
			yyyy_valid: 0,
			dob_error: false,
			image_name: "Drop an image here or click to select",
			user_image: "",
			image_error: "",
			password: "",
			cpassword: "",
			password_error: false,
			password_mismatch: 0,
			mob_otp_1:"",
			mob_otp_2:"",
			mob_otp_3:"",
			mob_otp_4:"",
			email_otp_1:"",
			email_otp_2:"",
			email_otp_3:"",
			email_otp_4:"",
			gender: "",
			gender_error: false,
			verified_mobile_otp: false,
			verified_email_otp: false,
		}
		this.save_disabled = true
		this.verify_phone_disabled = true
		this.verify_email_disabled = true
	}

	componentWillUpdate(props, nextState){
		if(nextState.phone && nextState.full_name && nextState.password && nextState.cpassword && nextState.gender && nextState.dd && nextState.mm && nextState.yyyy && nextState.verified_mobile_otp && nextState.password_mismatch === 1 && nextState.phone_valid === 1 && nextState.user_image){
			if(nextState.email){
				if(nextState.email_error === 1 && nextState.verified_email_otp){
					this.save_disabled = false
				}else{
					this.save_disabled = true;
				}
			}else{
				this.save_disabled = false
			}
			// this.save_disabled = false
		}else{
			this.save_disabled = true
		}

		if(nextState.mob_otp_1 && nextState.mob_otp_2 && nextState.mob_otp_3 && nextState.mob_otp_4){
			this.verify_phone_disabled = false
		}else{
			this.verify_phone_disabled = false
		}

		if(nextState.email_otp_1 && nextState.email_otp_2 && nextState.email_otp_3 && nextState.email_otp_4){
			this.verify_email_disabled = false
		}else{
			this.verify_email_disabled = true
		}

		if(props.emailInUse){
			nextState.email_otp_1 = ""
			nextState.email_otp_2 = ""
			nextState.email_otp_3 = ""
			nextState.email_otp_4 = ""
			nextState.verified_email_otp = false
			props.emailInUse = false
		}
		if(props.phoneInUse){
			nextState.mob_otp_1 = ""
			nextState.mob_otp_2 = ""
			nextState.mob_otp_3 = ""
			nextState.mob_otp_4 = ""
			nextState.verified_mobile_otp = false
			props.phoneInUse = false
		}

	}

	handleOtpChange(e){
		let digits = /^\d+$/;
		let val = e.target.value;
		if(digits.test(val) || !val){
			this.setState({
				[e.target.name]: e.target.value
			})
			if(e.target.name !== "mob_otp_4" && e.target.name !== "email_otp_4") this.refs[e.target.name].nextSibling.focus();
		}
	}

	handlePasswordMatching(e){
		if(this.state.password !== e.target.value) {
			this.setState({password_mismatch:2})
		}else{
			this.setState({password_mismatch:1})
		}
		this.setState({cpassword:e.target.value})
	}

	handlePasswordChange(e){
		this.setState({
			[e.target.name]: e.target.value,
			password_error: false,
			password_mismatch: 1
		})
	}

	handlePhoneChange(e){
		let digits = /^\d+$/;
		var reg = /^[5-9]\d{9}$/g
		let val = e.target.value;
		if(digits.test(val) || !val){
			if(reg.test(val)){
				this.setState({phone_valid: 1})
			}else{
				this.setState({phone_valid: 2, verified_mobile_otp: false})
			}
			this.setState({
				phone: val,
				phone_error: false,
			})
		}
	}

	handleEmailChange(e){
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		let val = e.target.value;
		if(reg.test(val)){
			this.setState({
				email_error: 1,
				email: val
			})
		}else{
			this.setState({
				email_error: 2,
				email: val,
				verified_email_otp: false
			})
		}
	}

	handleInputChange(e){
		this.setState({
			[e.target.name]: e.target.value,
			[e.target.name+"_error"]: false,
		})
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
			this.setState({image_name:e.target.files[0].name, image_error: "", user_image: e.target.files[0]})		
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

	handleGenderChange(val){
		this.setState({
			gender: val
		})
	}

	handleRegister(e){
		e.preventDefault();
		let errors = 0;
		if(!this.state.full_name){
			errors++;
			this.setState({
				full_name_error: true
			})
		}
		if(!this.state.phone){
			errors++;
			this.setState({
				phone_error: true
			})
		}
		if(!this.state.dd || !this.state.mm || !this.state.yyyy){
			errors++;
			this.setState({
				dob_error: true
			})
		}
		if(!this.state.gender){
			errors++;
			this.setState({
				gender_error: true
			})
		}
		if(!this.state.password){
			errors++;
			this.setState({
				password_error: true
			})
		}

		if(errors === 0){
			alert("registered")
			var fd = new FormData();
			fd.append("user_image", this.state.user_image);
			fd.append("full_name", this.state.full_name);
			fd.append("phone", this.state.phone);
			fd.append("email", this.state.email);
			fd.append("dob", this.state.dd+"/"+this.state.mm+"/"+this.state.yyyy);
			fd.append("gender", this.state.gender);
			fd.append("password", this.state.password);
			
			for (var pair of fd.entries()) {
				console.log(pair[0] + ", " + pair[1]);
			}

			this.props.registerUser(fd)
			
		}
	}

	handleVerifyEmail(){
		this.setState({
			verified_email_otp: true
		})
	}

	handleVerifyPhone(){
		this.setState({
			verified_mobile_otp: true
		})
	}

	renderFailureModal(){

	}

	renderSuccessModal(){

	}

  	render() {
    	return ([
			this.renderSuccessModal(),
			this.renderFailureModal(),
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
									<input id="full_name" name="full_name" onChange={(e) => this.handleInputChange(e)}  placeholder="Full name"/>
									{this.state.full_name_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Name is required.
										</div>
										: null
									}
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
									<input id="phone" name="phone" maxLength="10" onChange={(e) => this.handlePhoneChange(e)} placeholder="Phone number" value={this.state.phone}/>
									{this.state.phone_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Phone number is required.
										</div>
										: null
									}
									{this.state.phone_valid === 2?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Please provide a valid phone number.
										</div>
										: null
									}
									{this.props.phoneInUse?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Phone number you entered ins already in use.
										</div>
										: null
									}
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
									<input id="email" type="email" placeholder="Email" onChange={e => this.handleEmailChange(e)} value={this.state.email}/>
									{this.state.email_error === 2?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Please provide a valid email id.
										</div>
										: null
									}
									{this.props.emailInUse?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Email id you entered ins already in use.
										</div>
										: null
									}
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
									{this.state.dob_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Full date of birth is required.
										</div>
										: null
									}
								</div>
								<div className="col-sm-3 radio-container">
									<label className="gender-label">Gender *</label>
									<input type="radio" checked={this.state.gender==="male" && true} name="gender" id="male" onChange={() => this.handleGenderChange("male")}/>
									<label htmlFor="male" className="radio-label radio-male">
										<i className="fa fa-male" aria-hidden="true"></i>
									</label>
									<input type="radio" checked={this.state.gender==="female" && true} name="gender" id="female" onChange={() => this.handleGenderChange("female")}/>
									<label htmlFor="female" className="radio-label radio-female">
										<i className="fa fa-female" aria-hidden="true"></i>
									</label>
									{this.state.full_name_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											You must specify your gender.
										</div>
										: null
									}
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
								{this.props.imageUploadFailure?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Failed to upload your image. Please try again later.
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
									{ this.state.phone_valid === 1 && !this.state.verified_mobile_otp?
										<span>	
											<p className="opt-sent">OTP sent to your mobile number <b>{this.state.phone}</b></p>
											<div className="otp-container">
												<span>Enter the One Time Password (OTP)</span>
												<input ref="mob_otp_1" name="mob_otp_1" value={this.state.mob_otp_1} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
												<input ref="mob_otp_2" name="mob_otp_2" value={this.state.mob_otp_2} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
												<input ref="mob_otp_3" name="mob_otp_3" value={this.state.mob_otp_3} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
												<input ref="mob_otp_4" name="mob_otp_4" value={this.state.mob_otp_4} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
											</div>
											<br/>
											<button type="button" className="verify-button" disabled={this.verify_phone_disabled} onClick={() => this.handleVerifyPhone()}>Verify</button>
											<button type="button" className="resend-btn">RESEND OTP</button>
										</span>
										: this.state.verified_mobile_otp?
										<div className="alert alert-success" role="alert">
											Mobile number verification successfully completed.
										</div>
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
									{ this.state.email_error === 1 && !this.state.verified_email_otp?
										<span>
											<p>OTP sent to your email <b>princedey51@gmail.com</b></p>
											<div className="otp-container">
												<span>Enter the One Time Password (OTP)</span>
												<input ref="email_otp_1" name="email_otp_1" value={this.state.email_otp_1} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
												<input ref="email_otp_2" name="email_otp_2" value={this.state.email_otp_2} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
												<input ref="email_otp_3" name="email_otp_3" value={this.state.email_otp_3} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
												<input ref="email_otp_4" name="email_otp_4" value={this.state.email_otp_4} onChange={(e) => this.handleOtpChange(e)} maxLength="1"/>
											</div>
											<br/>
											<button type="button" className="verify-button" onClick={() => this.handleVerifyEmail()} disabled={this.verify_email_disabled}>Verify</button>
											<button type="button" className="resend-btn">RESEND OTP</button>
											{/* <Spinner animation="border" variant="dark" /> */}
										</span>
										: this.state.verified_email_otp?
										<div className="alert alert-success" role="alert">
											Email id verification successfully completed.
										</div>
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
									<input type="password" name="password" onChange={(e) => this.handlePasswordChange(e)} id="password" placeholder="Password"/>
									{this.state.password_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											You must set a password.
										</div>
										: null
									}
								</div>
								<div className="col-sm-4 input-container">
									<label htmlFor="cpassword">Confirm password *</label>
									<input type="password" name="cpassword" onChange={(e) => this.handlePasswordMatching(e)} id="cpassword" placeholder="Confirm password"/>
									{ this.state.password_mismatch == 2 &&
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											Passwords do not match.
										</div>
									}
									{this.state.password_error?
										<div className="error-alert alert alert-danger" role="alert">
											<i className="fa fa-exclamation-triangle"></i>
											You must confirm your new password.
										</div>
										: null
									}
								</div>
								
								<div className="col-sm-4 submit-container">
									<span>
										<button disabled={this.save_disabled} onClick={(e) => this.handleRegister(e)}>Register</button>
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
		registerInProgress: state.commonReducer.registerInProgress,
		defautRegisterError: state.commonReducer.defautRegisterError,
		phoneInUse: state.commonReducer.phoneInUse,
		emailInUse: state.commonReducer.emailInUse,
		imageUploadFailure: state.commonReducer.imageUploadFailure,
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			loginUser: loginUser,
			registerUser: registerUser
		},
		dispatch
	);
}

const registerStore = connect(mapStateToProps, matchDispatchToProps)(Register);
export default registerStore;
