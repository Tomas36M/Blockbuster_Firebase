import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';

const Card = ({
    id,
    title,
    description,
    img,
    link,
    likes,
    postBy,
    uid
}) => {

    const { deleteMovie, updateLikes, user } = useUserAuth();

    const componentDisplay = (component) => {
        if (uid === user.id) return component
        else return false
    }

    return (
        <>
            <div className='container-image'>
                <img src={img} alt="movie-img" />
                <div className='conteiner-hover'>
                    <div className='text-container'>
                        <h4>{title}</h4>
                        <h6>Publish By: {postBy}</h6>
                        <br />
                        <p>{description}</p>
                    </div>
                    <div className="conteiner-hover-button">
                        {componentDisplay((<button></button>))}
                        {user && uid !== user.uid ? (<button type="button" className="btn btn-danger" onClick={() => { deleteMovie(id) }}>Delete</button>) : <p>.</p>}
                        <button type="button" className="btn btn-primary" onClick={() => {
                            const like = { likes: likes + 1 };
                            updateLikes(id, like)
                        }}>Like {likes}</button>
                        <a rel="noreferrer" target='_blank' href={link}><button type="button" className="btn btn-primary">Watch</button></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card