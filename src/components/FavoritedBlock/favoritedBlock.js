import React from 'react';
import Card from '../Card/card';
import './favoritedBlock.css';

const FavoritedBlock = ({ posts, deleteFromFavorite, isLoaded }) => {
    return (
        <>
            {isLoaded ? (
                <div className="favorited-block" >
                    <h4>В избранном сейчас {posts.length}</h4>
                    {
                        posts?.map((post, index) => {
                            return (
                                <Card
                                    key={post.data.id}
                                    imageSource={post.data.url}
                                    title={post.data.title}
                                    isVideo={post.data.is_video}
                                    media={post.data.media}
                                    preview={post.data.preview?.images[0].source.url}
                                    deleteFromFavorite={() => deleteFromFavorite(index)}
                                    isFavorite={true}
                                />
                            )
                        })

                    }
                </div >
            ) : null}
        </>
    )
};

export default FavoritedBlock;