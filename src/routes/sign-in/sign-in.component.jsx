import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import { signInWithGooglePopup,signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import Button from '../button/button.component'

const SignIn = () => {
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
		const {user} = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	}
	return (
		<>
			<h1>Sign In</h1>
			<Button onClick={logGoogleUser}>Sign in with Google</Button>
			<Button type='google' onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</Button>
			<SignUpForm />
		</>
	)
}

export default SignIn;