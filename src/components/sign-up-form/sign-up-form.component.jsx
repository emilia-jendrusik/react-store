import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const {displayName, email, password, confirmPassword} = formFields;

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(password !== confirmPassword) {
			alert('Passwords do not match');
			return
		}
		try {
			const {user} = await createAuthUserWithEmailAndPassword(email, password);
			if(user) {	
				const userDocRef = await createUserDocumentFromAuth(user, {displayName});
				setFormFields(defaultFormFields);
			}
			
		} catch(error) {
			console.log(error);
			if(error.code === 'auth/email-already-in-use') {
				alert('Email already in use')
			}
		}
		

	}
	const handleChange = (event) => {
		const {name, value} = event.target;
		setFormFields({...formFields, [name]: value})
	}
	return (
		<div className='sign-up-container'>
			<h1>Sign up with your email and password</h1>
			<form onSubmit={handleSubmit}>
				<FormInput label="Display name" type='text' name='displayName' required onChange={handleChange} value={displayName} />
				<FormInput label="Email" type='email' name='email' required onChange={handleChange} value={email}/>
				<FormInput label="Password" type='password' name='password' required onChange={handleChange} value={password}/>
				<FormInput label="Confirm password" type='password' name='confirmPassword' required onChange={handleChange} value={confirmPassword}/>
				<Button type='submit'>Sign up</Button>
			</form>
		</div>
	)
}

export default SignUpForm;