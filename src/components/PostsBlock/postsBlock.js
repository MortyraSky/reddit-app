import React from 'react';
import Card from '../Card/card';

const PostsBlock = ({posts, isLoaded, addToFavorite}) => {
    return (
        <div>
            {
                isLoaded ? (
                    posts?.map((item, index) => {
                        return (
                            <Card
                                key={item.data.id}
                                imageSource={item.data.url}
                                title={item.data.title}
                                isVideo={item.data.is_video}
                                media={item.data.media}
                                preview={item.data.preview?.images[0].source.url}
                                addToFavorite={() => addToFavorite(index)}
                            />
                        )
                    })
                ) : (<div>...Loaded</div>)
            }
        </div>
    )
};

export default PostsBlock;