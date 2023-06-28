import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
	// переход на другую страницу
	const navigate = useNavigate()

	// создание состояний
	const [email, setEmail] = useState([])
	const [password, setPassword] = useState([])
	const [firstName, setFirstName] = useState([])
	const [lastName, setLastName] = useState([])

	const [errorEmail, setErrorEmail] = useState('')
	const [errorPassword, setErrorPassword] = useState('')
	const [errorFirstName, setErrorFirstName] = useState('')
	const [errorLastName, setErrorLastName] = useState('')

	// Api URL
	const url = 'http://127.0.0.1:8000/api/registration'

	const Registration = async e => {
		e.preventDefault()

		const bodyJson = JSON.stringify({
			email,
			password,
			first_name: firstName,
			last_name: lastName,
		})

		const headers = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: bodyJson,
		}

		const fetchReg = await fetch(url, headers)
		const dataFetch = await fetchReg.json()

		// создание ошибок
		if (dataFetch.message) {
			setErrorEmail(dataFetch.message?.email ?? '')
			setErrorPassword(dataFetch.message?.password ?? '')
			setErrorFirstName(dataFetch.message?.first_name ?? '')
			setErrorLastName(dataFetch.message?.last_name ?? '')
		}

		navigate('login')
	}
	return (
		<>
			<div className='vh-100 d-flex align-items-center'>
				<div className='row w-100'>
					<div className='col-4 mx-auto'>
						<div className='card'>
							<div className='card-body p-5'>
								<h1 className='az-logo mb-5'>SPA</h1>

								<div className='mb-5'>
									<h4 className='mb-4'>Please sign up to continue</h4>

									<form onSubmit={Registration}>
										<div className='d-flex justify-content-between'>
											<div className='form-group w-100 pr-2'>
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
														<span className='invalid-feedback' data-em-name>
															{errorEmail}
														</span>
													</>
												)}
											</div>
											<div className='form-group w-100 pl-2'>
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
														<span className='invalid-feedback' data-em-password>
															{errorPassword}
														</span>
													</>
												)}
											</div>
										</div>
										<div className='d-flex justify-content-between'>
											<div className='form-group w-100 pr-2'>
												<input
													type='text'
													className={
														errorFirstName.length > 0
															? 'form-control is-invalid'
															: 'form-control'
													}
													placeholder='Enter your first name'
													onChange={e => setFirstName(e.target.value)}
												/>
												{errorFirstName && (
													<>
														<span className='invalid-feedback' data-em-password>
															{errorFirstName}
														</span>
													</>
												)}
											</div>
											<div className='form-group w-100 pl-2'>
												<input
													type='text'
													className={
														errorLastName.length > 0
															? 'form-control is-invalid'
															: 'form-control'
													}
													placeholder='Enter your last name'
													onChange={e => setLastName(e.target.value)}
												/>
												{errorLastName && (
													<>
														<span className='invalid-feedback' data-em-password>
															{errorLastName}
														</span>
													</>
												)}
											</div>
										</div>

										<button
											className='mt-4 btn btn-az-primary btn-block'
											data-signup-btn
										>
											Sign Up
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
