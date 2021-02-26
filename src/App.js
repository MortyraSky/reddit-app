import React from 'react';
import PostsBlock from './components/PostsBlock/postsBlock';
import FavoritedBlock from './components/FavoritedBlock/favoritedBlock';
import debounce from './helpfullFunctions/debounce';
import getPosts from "./ApiServices/getPosts";
import useLocalStorage from './hooks/useLocalStorage';
import cats from './cats.png';
import './App.css';

const App = () => {
  const [posts, setPosts] = React.useState([]);
  const [after, setAfter] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [favoritedPosts, setFavoritedPosts] = useLocalStorage('favorite');

  React.useEffect(() => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    getPosts()
      .then((res) => {
        let buff = res.data.children.filter((item) => {
          if (item.data.url_overridden_by_dest && !item.data.url.includes('gallery')) {
            return true;
          }
          return false;
        });
        console.log('after filter', buff);
        setPosts(buff);
        setAfter(res.data.after);
        setIsLoaded(true);
      }).catch((err) => console.log(err));
  }, []);
   
  React.useEffect(() => {
    let debouncedScroll = debounce(infinityScroll, 500);
    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll)
  }, []);

  const infinityScroll = () => {
    let block = document.querySelector('.App');
    let contentHeight = block.offsetHeight;      // 1) высота блока контента вместе с границами
    let yOffset = window.pageYOffset;      // 2) текущее положение скролбара
    let window_height = window.innerHeight;      // 3) высота внутренней области окна документа
    let y = Math.ceil(yOffset + window_height);
    // console.log('ch', contentHeight, ' : ', 'yOffset', yOffset);
    // console.log('wh', window_height, ' : ', 'y', y);

    // если пользователь достиг конца
    if (y >= contentHeight - 600) {
      //загружаем новое содержимое в элемент
      console.log('подгружаем новые посты');
      getPosts(after)
        .then((res) => {
          console.log(res.data.children);
          let buffResp = res.data.children.filter((item) => {
            if (item.data.url_overridden_by_dest && !item.data.url.includes('gallery')) {
              return true;
            }
            return false;
          });
          let buff = [...posts, ...buffResp];
          setPosts(buff);
          setAfter(res.data.after);
        }).catch((err) => console.log(err));
    }
  };

  const addToFavorite = (index) => {
    console.log(index);
    let buff = [...favoritedPosts];
    let inFavoritedPos = favoritedPosts?.findIndex((item) => {
      return item.data.id === posts[index].data.id
    });
    if (inFavoritedPos === -1) {
      buff.push(posts[index]);
      setFavoritedPosts(buff);
    }
  };

  const deleteFromFavorite = (index) => {
    let buff = [...favoritedPosts];
    buff.splice(index, 1);
    setFavoritedPosts(buff);
    // let buff = [...favoritedPosts];
    // buff.splice(index, 1);
    // setFavoritedPost(buff);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src={cats} className="App-logo" alt="logo" />
          <div className="header-description">
            <h4 className="header-text">
              Cats
            </h4>
            <div className="header-subbredit">r/cats</div>
          </div>
        </div>
      </header>
      <div className="content-block">
        <PostsBlock posts={posts} isLoaded={isLoaded} addToFavorite={addToFavorite} />
        <FavoritedBlock posts={favoritedPosts} deleteFromFavorite={deleteFromFavorite} isLoaded={isLoaded} />
      </div>
    </div>
  );
}

export default App;
