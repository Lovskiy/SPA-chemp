import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ListUserOrder = () => {
	const navigate = useNavigate()
	const [isItem, setIsItem] = useState([])
	const token = localStorage.getItem('token')

	const downloadItem = async file_id => {
		const url = `http://127.0.0.1:8000/api/files/${file_id}`

		const headers = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}

		const fetchItem = await fetch(url, headers)
		const dataFetch = await fetchItem
		console.log(dataFetch)
	}

	const destroyItem = async file_id => {
		const url = `http://127.0.0.1:8000/api/files/${file_id}`

		const headers = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}

		const fetchItem = await fetch(url, headers)
		const dataFetch = await fetchItem.json()

		console.log('del', dataFetch)

		getItem()
	}

	const getItem = async () => {
		const url = 'http://127.0.0.1:8000/api/file/disk'

		const headers = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}

		const fetchItem = await fetch(url, headers)
		const dataFetch = await fetchItem.json()

		setIsItem(dataFetch.data)

		console.log(dataFetch.data)
	}

	useEffect(() => {
		getItem()
	}, [])
	return (
		<>
			<div className='az-content az-content-dashboard'>
				<div className='container'>
					<div className='az-content-body'>
						<div className='az-dashboard-one-title'>
							<div className='az-content-header-right'>
								<button className='btn btn-outline-primary' data-staff-add>
									Add new employee
								</button>
							</div>
						</div>

						<div className='row' data-staff-cards>
							{isItem.map(item => {
								return (
									<div className='col-2 mb-4'>
										<div className='card'>
											<div className='card-body'>
												<h5 className='card-title mb-0' data-staff-name>
													{item.name}
												</h5>

												<p>{item.file_id}</p>

												<button
													onClick={() => destroyItem(item.file_id)}
													type='submit'
												>
													Del
												</button>
												<button
													onClick={() => navigate('/edit-card/' + item.file_id)}
													type='submit'
												>
													Edit
												</button>
												<button
													onClick={() =>
														navigate(
															'/access-card/' + item.file_id + '/accesses'
														)
													}
													type='submit'
												>
													Access
												</button>
												<button
													onClick={() => downloadItem(item.file_id)}
													type='submit'
												>
													Download
												</button>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
