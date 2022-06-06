import React, { useState } from 'react'
import { useUserAuth } from '../context/UserAuthContext'
// import UserMovies from './UserMovies';
// import { updateProfile } from 'firebase/auth'

const Profile = () => {

    const [file, setFile] = useState('');

    const { user, uploadImg, progress } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await uploadImg(file);
            console.log(file);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div> {user &&
                <div id="profile-upper">
                    <div id="profile-banner-image">
                        <img src="https://source.unsplash.com/random" alt="profile-pic" />
                    </div>
                    <div id="profile-d">
                        <div id="profile-pic">
                            <img src={user.photoURL} alt="profile=pic" />
                        </div>
                        <div id="u-name">{user.displayName} </div>
                        <div className="tb" id="m-btns">
                            <div className="td">
                                <div className="m-btn"><span>Edit Profile</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            }</div>
            <div className='upload'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="formFileSm" className="form-label">Upload profile pic</label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={(e) => {
                            setFile(e.target.files[0])
                        }} />
                        <button type='submit'>Send</button>
                        <h3>{progress}</h3>
                    </div>
                </form>
            </div>
            <div>
                {/* <UserMovies /> */}
            </div>
        </div>
    )
}

export default Profile