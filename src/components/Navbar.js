import React, { useState } from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { user, logOut, addOrEditMovie, handleChange } = useUserAuth();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        title: 'Tarjeta de prueba',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore veritatis a quisquam facilis! Hic obcaecati optio nobis dolor, inventore deleniti saepe fugit maiores voluptatum veniam officiis totam excepturi? Pariatur, id.',
        img: 'https://wallpaperaccess.com/full/16372.jpg',
        link: 'papa',
        likes: 0,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        addOrEditMovie(values);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
        console.log(name, value);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {!user ? (
                <div className="container-fluid">

                    <img className='logo' src='https://d1.awsstatic.com/case-studies/EMEA/Blockbuster%20logo.cd30e3e6ba3664ae51e0495ee3b5c57085d43b05.png' alt='logo' />

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>) : (
                <div className="container-fluid">

                    <img className='logo' src='https://d1.awsstatic.com/case-studies/EMEA/Blockbuster%20logo.cd30e3e6ba3664ae51e0495ee3b5c57085d43b05.png' alt='logo' />

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <p className='welcome'>Welcome: {user.displayName}</p>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ms-auto nav-items">
                            <li>
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                            </li>
                            <li>
                                <button onClick={() => {
                                    navigate('/home')
                                }} className='btn btn-secondary'>Home</button>
                            </li>
                            <li>
                                <button className='btn btn-secondary ml-1' data-bs-toggle="modal" data-bs-target="#exampleModal">Post Movie</button>
                            </li>
                            <li>
                                <button onClick={() => {
                                    navigate('/profile')
                                }} className='btn btn-secondary'>Profile</button>
                            </li>
                            <li>
                                <button onClick={() => {
                                    logOut()
                                    navigate('/')
                                }} className='btn btn-secondary'>Logout</button>
                            </li>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Post your favorite movie</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="modal-body">
                                                <input type='text' name='title' placeholder='Title' onChange={handleInputChange} /> <br />
                                                <input type='text' name='description' placeholder='Description' onChange={handleInputChange} /> <br />
                                                <input type='text' name='img' placeholder='Image-Url' onChange={handleInputChange} /> <br />
                                                <input type='text' name='link' placeholder='movie-url' onChange={handleInputChange} /> <br />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div >
            )
            }
        </nav >
    )
}

export default Navbar