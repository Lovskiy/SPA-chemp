import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditCard = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	const [fileName, setFileName] = useState([])
	// получение идшника, который был передедан по ссылке
	const params = useParams('file_id')
	const Edit = async e => {
		e.preventDefault()
		// получение идшника, который был передедан по ссылке
		const url = `http://127.0.0.1:8000/api/files/${params.file_id}`

		const bodyJson = JSON.stringify({ name: fileName })

		const bodyContent = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: bodyJson,
		}

		const fetchEdit = await fetch(url, bodyContent)
		const dataFetch = await fetchEdit.json()

		navigate('/orders')

		console.log('edit', dataFetch)
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
									<h4 className='mb-4'>Please edit in to continue</h4>

									<form onSubmit={Edit}>
										<div className='form-group'>
											<input
												type='text'
												className='form-control'
												placeholder='Enter your name file'
												onChange={e => setFileName(e.target.value)}
											/>
										</div>

										<button
											className='mt-4 btn btn-az-primary btn-block'
											data-signin-btn
										>
											Edit
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
