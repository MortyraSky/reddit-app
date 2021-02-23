import React from 'react';
import './card.css';

const Card = ({ imageSource, title, isVideo, media, preview, addToFavorite, isFavorite, deleteFromFavorite }) => {
    return (
        <div className="card-block">
            <div className="header-block">
                <div className="posted-info"></div>
                <h3 className="title">{title}</h3>
            </div>
            <hr />
            <div className="img-block">
                {
                    isVideo ? (
                        <video poster={preview} controls className="video-player">
                            <source src={media.reddit_video.fallback_url} />
                        </video>
                    ) :
                        (
                            <img src={`${imageSource}`} alt="post image" height="600px" width="500px" />
                        )
                }
            </div>
            <hr />
            <div className="favorite-block">
                {!isFavorite
                    ? (
                        <button
                            className="favorite-button"
                            onClick={() => {
                                console.log('added to favorite');
                                addToFavorite();
                            }}
                        >
                            <i className="bi bi-heart-fill"></i>
                        </button>)
                    : (
                        <button
                            className="favorite-button"
                            onClick={() => {
                                console.log('deleted from favorite');
                                deleteFromFavorite();
                            }}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default Card;