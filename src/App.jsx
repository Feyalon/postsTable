import { useEffect, useState } from "react";


function App() {
  const [posts, setposts] = useState([])
  const pages = 10;
  const pagesArr = [];
  for(let i = 1; i <= pages; i++){
    pagesArr.push(i)
  }
  const [currpage, setPage] = useState(1)
  function nextPage(){
    if(currpage >= 10){
      setPage(1)
    }
    else{
      setPage(currpage + 1)
    }
  }
  function previousPage(){
    if(currpage <= 1){
      setPage(10)
    }
    else{
      setPage(currpage - 1)
    }
  }
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/?_page=${currpage}&_limit=10`)
    .then(res => res.json())
    .then((data) => {
      setposts(data)
    })
  }, [currpage])
  return (
    <div>
      <h1>
        {currpage}
      </h1>
      {posts.map((name) => (
        <div key={name.id}>
          
          <h1>

            {name.id} {name.title}
          </h1>
          <p>
            {name.body}
          </p>
        </div>
      ))}
      <button onClick={previousPage}>
        Предыдущее
      </button>
      {pagesArr.map((name) => (
        <button key={name} onClick={() => setPage(name)}>
          {name}
        </button>
      ))}
      <button onClick={nextPage}>
        Далее
      </button>
      
    </div>    
  );
}

export default App;
