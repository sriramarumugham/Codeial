import '../styles/App.css';
import {getPosts} from '../api/index'

import { useEffect, useState} from 'react'
import {Home} from '../pages/index';
import {Loader , Navbar}from './index';
import '../styles/index.css';


function App() {
  const [posts , setPosts] =useState([]);
  const [spinner , setSpinner]=useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if(response.success){
      setPosts(response.data.posts);
      console.log('response', response.data.posts);
      setSpinner(false);
      }
    };

    fetchPosts();
  }, []);
   
  if(spinner){
    return (
      <Loader/>
    )
  }

  return (
    <div className="App">
     <Navbar/>
     <Home posts={posts}/>
    </div>
  );
}


export default App;
