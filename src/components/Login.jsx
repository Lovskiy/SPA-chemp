import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreContext from '../context/store'

export const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState([])
	const [password, setPassword] = useState([])

	const [errorEmail, setErrorEmail] = useState('')
	const [errorPassword, setErrorPassword] = useState('')

	const url = 'http://127.0.0.1:8000/api/authorization'

	const { setIsAuth } = useContext(StoreContext)

	const Auth = async e => {
		e.preventDefault()

		const bodyJson = JSON.stringify({ email, password })

		const headers = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: bodyJson,
		}

		const fetchAuth = await fetch(url, headers)
		const dataFetch = await fetchAuth.json()

		if (dataFetch.message) {
			setErrorEmail(dataFetch.message?.email ?? '')
			setErrorPassword(dataFetch.message?.password ?? '')
		}
		localStorage.setItem('token', dataFetch.token)
		setIsAuth(true)
		navigate('/orders')
	}
	return (
		<>
			<div className='vh-100 d-flex align-items-center'>
				<div className='row w-100'>
					<div className='col-3 mx-auto'>
						<div className='card'>
							<div className='card-body p-5'>
								<h1 className='az-logo mb-5'>spa</h1>

								<div className='mb-5'>
									<h4 className='mb-4'>Please sign in to continue</h4>

									<form onSubmit={Auth}>
										<div className='form-group'>
											<input
												type='email'
												className={
													errorEmail.length > 0
														? 'form-control is-invalid'
														: 'form-control'
												}
												placeholder='Enter your email'
												onChange={e => setEmail(e.target.value)}
											/>
											{errorEmail && (
												<>
													<span className='invalid-feedback' data-em-login>
														{errorEmail}
													</span>
												</>
											)}
										</div>
										<div className='form-group'>
											<input
												type='password'
												className={
													errorPassword.length > 0
														? 'form-control is-invalid'
														: 'form-control'
												}
												placeholder='Enter your password'
												onChange={e => setPassword(e.target.value)}
											/>
											{errorPassword && (
												<>
													<span className='invalid-feedback' data-em-login>
														{errorPassword}
													</span>
												</>
											)}
										</div>

										<button
											className='mt-4 btn btn-az-primary btn-block'
											data-signin-btn
										>
											Sign In
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
