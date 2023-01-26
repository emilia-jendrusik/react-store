import {useContext} from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import {UserContext} from '../../contexts/user.context'

const Authentication = () => {
	return (

		<>
			<h1>Sign In</h1>
			<div style={{display: 'flex', justifyContent: 'space-between', maxWidth: 1000, margin: 'auto'}}>
				<SignInForm />
				<SignUpForm />
			</div>
		</>
	)
}

export default Authentication;