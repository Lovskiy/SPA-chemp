import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const AccessCard = () => {
	const params = useParams('file_id')
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	const [email, setEmail] = useState([])
	const [info, setInfo] = useState([])

	const deleteAccess = async (e, file_id) => {
		e.preventDefault()

		const url = `http://127.0.0.1:8000/api/files/${params.file_id}/accesses`

		const bodyJson = JSON.stringify({ email })

		const headers = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: bodyJson,
		}

		const fetchAccess = await fetch(url, headers)
		const dataFetch = await fetchAccess.json()

		setInfo(dataFetch.data)
	}

	const addAccessCard = async (e, file_id) => {
		e.preventDefault()
		const url = `http://127.0.0.1:8000/api/files/${params.file_id}/accesses`

		const bodyJson = JSON.stringify({ email })

		const headers = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: bodyJson,
		}

		const fetchAccess = await fetch(url, headers)
		const dataFetch = await fetchAccess.json()

		setInfo(dataFetch.data)
	}
	return (
		<>
			<div className='vh-100 d-flex align-items-center'>
				<div className='row w-100'>
					<div className='col-3 mx-auto'>
						{info.map(info => {
							return (
								<div>
									<h5>{info.fullname}</h5>
									<button onClick={e => deleteAccess(e, info.file_id)}>
										del
									</button>
								</div>
							)
						})}
						<div className='card'>
							<div className='card-body p-5'>
								<h1 className='az-logo mb-5'>spa</h1>

								<div className='mb-5'>
									<h4 className='mb-4'>Please add in to continue</h4>

									<form onSubmit={addAccessCard}>
										<div className='form-group'>
											<input
												type='email'
												className='form-control'
												placeholder='Enter email'
												onChange={e => setEmail(e.target.value)}
											/>
										</div>

										<button
											className='mt-4 btn btn-az-primary btn-block'
											data-signin-btn
										>
											Add
										</button>
										<button
											className='mt-4 btn btn-az-primary btn-block'
											data-signin-btn
											onClick={() => navigate('/orders')}
										>
											Back
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
