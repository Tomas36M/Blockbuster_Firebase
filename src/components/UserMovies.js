import React from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import Card from './Movie'

const UserMovies = () => {

    const { userMovies } = useUserAuth();

    return (
        <div className='container'>
            {userMovies &&
                <div className='row'>
                    {userMovies && userMovies.map((element) => (
                        <div className='col-xs-12 col-sm-6 col-md-3' key={element.id}>
                        <Card 
                            id={element.id}
                            title={element.title}
                            description={element.description}
                            img={element.img}
                            likes={element.likes}
                            link={element.link}
                            postBy={element.postBy}
                            uid={element.uid}
                        />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default UserMovies