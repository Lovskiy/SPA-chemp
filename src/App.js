import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { AccessCard } from './components/AccessCard'
import { EditCard } from './components/EditCard'
import { ListUserOrder } from './components/ListUserOrder'
import { Login } from './components/Login'
import { OnlyAccess } from './components/OnlyAccess'
import { Register } from './components/Register'
import { Upload } from './components/Upload'
import StoreContext from './context/store'

function App() {
	const [isAuth, setIsAuth] = useState(false)
	const token = localStorage.getItem('token')

	const logout = () => {
		localStorage.removeItem('token')
		setIsAuth(false)
	}

	useEffect(() => {
		if (localStorage.getItem('token') !== null) setIsAuth(true)
		else setIsAuth(false)
	}, [])
	return (
		<StoreContext.Provider value={{ setIsAuth }}>
			<div className='az-header'>
				<div className='container'>
					<div className='az-header-left'>
						<a href='index.html' className='az-logo' data-header-logo>
							SPA
						</a>
					</div>

					<div className='az-header-menu'>
						<ul className='nav'>
							{!isAuth && (
								<>
									<li className='nav-item'>
										<Link
											to='register'
											className='nav-link'
											data-header-link-index
										>
											Регистрация
										</Link>
									</li>
									<li className='nav-item '>
										<Link
											to='login'
											className='nav-link'
											data-header-link-index
										>
											Вход
										</Link>
									</li>
								</>
							)}

							{isAuth && (
								<>
									<li className='nav-item '>
										<Link
											to='orders'
											className='nav-link'
											data-header-link-index
										>
											List files
										</Link>
									</li>

									<li className='nav-item '>
										<Link
											to='only-access'
											className='nav-link'
											data-header-link-index
										>
											List only access
										</Link>
									</li>

									<li className='nav-item '>
										<Link
											onClick={() => logout()}
											className='nav-link'
											data-header-link-index
										>
											Logout
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</div>
			<main>
				<Routes>
					<Route path='register' element={<Register />}></Route>
					<Route path='login' element={<Login />}></Route>
					<Route path='orders' element={<ListUserOrder />}></Route>
					<Route path='edit-card/:file_id' element={<EditCard />}></Route>
					<Route
						path='access-card/:file_id/accesses'
						element={<AccessCard />}
					></Route>
					<Route path='only-access' element={<OnlyAccess />}></Route>
					<Route path='upload' element={<Upload />}></Route>
				</Routes>
			</main>
		</StoreContext.Provider>
	)
}

export default App
