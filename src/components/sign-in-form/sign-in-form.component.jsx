import { useState, useEffect, useContext } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
	email: '',
	password: ''
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const {email, password} = formFields;
	
	useEffect(() => {
		async function fetchData() {
			const response = await getRedirectResult(auth);
			if(response) {
				const userDocRef = await createUserDocumentFromAuth(response.user);
			}
		}
		fetchData();
	}, [])
	const logGoogleUser = async () => {
		signInWithGooglePopup();
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const {user} = await signInAuthUserWithEmailAndPassword(email, password);
			if(user) {	
				setFormFields(defaultFormFields);
			}
			
		} catch(error) {
			switch(error.code) {
				case 'auth/invalid-email':
					alert('Invalid email address');
					break;
				case 'auth/user-not-found':
					alert('Email not found');
					break;
				case 'auth/wrong-password':
					alert('Invalid password');
					break;
				default:
					console.log(error);
			}
		}
		

	}
	const handleChange = (event) => {
		const {name, value} = event.target;
		setFormFields({...formFields, [name]: value})
	}
	return (
		<div className='sign-in-container'>
			<h1>Already have an account?</h1>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type='email' name='email' required onChange={handleChange} value={email}/>
				<FormInput label="Password" type='password' name='password' required onChange={handleChange} value={password}/>
				<div className='buttons-container'>
					<Button type='submit'>Sign in</Button>
					<Button type='button' onClick={logGoogleUser}>Sign in with Google</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</Button>
				</div>
			</form>
			
		</div>
	)
}

export default SignInForm;