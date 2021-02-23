const getPosts = async (after = '') => {
    let url = ''
    if (after) {
        url = `https://www.reddit.com/r/cats/hot.json?after=${after}&raw_json=1`;
    } else {
        url = 'https://www.reddit.com/r/cats/hot.json?raw_json=1';
    }
    let response = await fetch(url)
    const data = await response.json();
    return data;
};

export default getPosts;