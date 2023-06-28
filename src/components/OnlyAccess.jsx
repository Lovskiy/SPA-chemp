import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const OnlyAccess = () => {
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

	const getItem = async () => {
		const url = 'http://127.0.0.1:8000/api/shared'

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
