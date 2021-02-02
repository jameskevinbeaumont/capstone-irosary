import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
//import moment from 'react-moment';
import { format } from 'date-fns';
// Import Components
import Footer from './Footer';

class Login extends Component {
    state = {
        islogged: false,
        isRegistered: true,
        loginParams: { emailAddress: '', password: '' },
        registerParams: { firstName: '', lastName: '' }
    };

    componentDidMount() {
        document.querySelector('.footer').style.marginTop = '25px';
    };

    registerUser = () => {
        let timestamp = format(new Date(), 'yyyy-MM-dd hh.mm.ss.sss');

        axios.post(`${window.$R_URL}${window.$R_USER}${window.$R_REGISTER}`, {
            firstName: this.state.registerParams.firstName,
            lastName: this.state.registerParams.lastName,
            email: this.state.loginParams.emailAddress,
            password: this.state.loginParams.password,
            created_at: timestamp,
            updated_at: timestamp
        })
            .then(result => {
                this.setState({ isRegistered: true })
                this.clearEntries();
                document.getElementById('form-register').style.display = 'none'
                document.getElementById('passwordErr').innerText = 'User successfully added!';
            })
            .catch(err => { document.getElementById('passwordErr').innerText = err.response.data });
    };

    loginUser = () => {
        document.getElementById('passwordErr').innerText = '';
        axios.post(`${window.$R_URL}${window.$R_USER}${window.$R_LOGIN}`, {
            email: this.state.loginParams.emailAddress,
            password: this.state.loginParams.password
        })
            .then(result => {
                //console.log('result from login => ', result)
                localStorage.setItem('token', 'klq_noVh0Xkp-Vkesopvr-UJ')
                localStorage.setItem('r_fname', result.data[0].firstName)
                this.setState({ islogged: true })
            })
            .catch(err => { document.getElementById('passwordErr').innerText = err.response.data });
    }

    handleFormChange = (e) => {
        let val = e.target.value;
        if (e.target.name === 'firstName' || e.target.name === 'lastName') {
            let registerParamsNew = { ...this.state.registerParams };
            registerParamsNew[e.target.name] = val;
            this.setState({ registerParams: registerParamsNew });
        } else {
            let loginParamsNew = { ...this.state.loginParams };
            loginParamsNew[e.target.name] = val;
            this.setState({ loginParams: loginParamsNew });
        };
    };

    handleSignUp = (e) => {
        e.preventDefault();

        let currentIsRegistered = this.state.isRegistered;
        currentIsRegistered = !currentIsRegistered;
        this.clearEntries();

        if (currentIsRegistered) {
            document.getElementById('form-register').style.display = 'none';
        } else {
            document.getElementById('form-register').style.display = 'flex';
        };

        this.setState({ isRegistered: currentIsRegistered });
    };

    handleButtonClick = (e) => {
        e.preventDefault();

        if (!this.validEntries()) return;

        if (!this.state.isRegistered) {
            this.registerUser();
        } else {
            this.loginUser();
        }
    };

    validEntries = () => {
        let valid = true;
        document.getElementById('emailAddressErr').innerText = '';
        document.getElementById('passwordErr').innerText = '';

        if (!this.state.isRegistered) {
            document.getElementById('firstNameErr').innerText = '';
            document.getElementById('lastNameErr').innerText = '';
            if (this.state.registerParams.firstName === '') {
                document.getElementById('firstNameErr').innerText = 'First name required';
                valid = false;
            } else if (this.state.registerParams.lastName === '') {
                document.getElementById('lastNameErr').innerText = 'Last name required';
                valid = false;
            }
        };
        if (this.state.loginParams.emailAddress === '') {
            document.getElementById('emailAddressErr').innerText = 'Email required';
            valid = false;
        } else if (this.state.loginParams.emailAddress !== '') {
            // eslint-disable-next-line
            let regex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
            if (regex.test(this.state.loginParams.emailAddress) === false) {
                document.getElementById('emailAddressErr').innerText = 'Invalid email entered';
                valid = false;
            }
        };

        if (this.state.loginParams.password.length < 6) {
            document.getElementById('passwordErr').innerText = 'Password must be at least 6 characters';
            valid = false;
        };

        return valid;
    };

    clearEntries = () => {
        document.getElementById('login-card__form').reset();
    };

    render() {
        let lockIcon = '../assets/icons/Lock-icon.png';
        let registerWording = 'Don\'t have an account? Sign Up!';
        let loginWording = 'Already have an account? Sign In!';

        if (localStorage.getItem("token")) {
            return <Redirect to="/" />;
        };

        return (
            <div className="login-card">
                <div className="login-card__image">
                    <div className="login-card__image">
                        <img className="login-card__image-img" src={lockIcon} alt="lock" />
                    </div>
                </div>
                <div className="login-card__title">
                    <div className="login-card__title--1">
                        <h2>Welcome to iRosary</h2>
                    </div>
                </div>
                <form onSubmit={this.handleButtonClick}
                    className="login-card__form" id="login-card__form" >
                    <div className="form__details">
                        <div className="form__inputs">
                            <div className="form__register" id="form-register">
                                <input
                                    className="form__input-text form__short"
                                    type="text" name="firstName"
                                    id="firstName"
                                    onChange={this.handleFormChange}
                                    placeholder="First Name *">
                                </input>
                                <input
                                    className="form__input-text form__short"
                                    type="text" name="lastName"
                                    id="lastName"
                                    onChange={this.handleFormChange}
                                    placeholder="Last Name *">
                                </input>
                            </div>
                            <div className="form__register-error">
                                <div className="form__error-short" id="firstNameErr"></div>
                                <div className="form__error-short" id="lastNameErr"></div>
                            </div>
                            <div className="form__email">
                                <input
                                    className="form__input-text"
                                    type="text" name="emailAddress"
                                    id="emailAddress"
                                    onChange={this.handleFormChange}
                                    placeholder="Email Address *">
                                </input>
                            </div>
                            <div className="form__email-password-error" id="emailAddressErr"></div>
                            <div className="form__password">
                                <input
                                    className="form__input-text"
                                    type="password" name="password"
                                    id="password"
                                    onChange={this.handleFormChange}
                                    placeholder="Password *">
                                </input>
                            </div>
                            <div className="form__email-password-error" id="passwordErr"></div>
                        </div>
                        <div className="form__buttons">
                            <input type="submit"
                                className="form__button"
                                id="form-button"
                                value={this.state.isRegistered ? 'Login' : 'Sign Up'}>
                            </input>
                        </div>
                    </div>
                </form>
                <div className="login-card__links">
                    <div className="login-card__link" id="login-card-link"
                        onClick={this.handleSignUp}>
                        {this.state.isRegistered ? registerWording : loginWording}
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

export default Login;