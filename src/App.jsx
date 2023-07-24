import { useEffect, useState } from "react";


function App() {
  const [posts, setposts] = useState([])
  const pagesArr = [];
  const [issortAlphabet, setSortAlphabet] = useState(false)
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
  const titleNames = []
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/?_page=${currpage}&_limit=10`)
    .then(res => res.json())
    .then((data) => {
      
      setposts(data)
    })
  }, [currpage])
  for(let i = 0; i < posts.length; i++){
    
    titleNames.push(posts[i].title)

  }
  titleNames.sort()
  function sorted(){
    const arr = []
    for(let i = 0; i < posts.length; i++){
      arr.push(posts[i].title)
      
      
    }
    arr.sort()
    return arr
  }
  sorted()
  for(let i = 1; i <= posts.length; i++){
    pagesArr.push(i)
  }
  function setSorted(){
    setSortAlphabet(!issortAlphabet)
  }
  return (
    <div>
      <h1>
        {currpage}
      </h1>
      <button onClick={() => setSorted()}>
        Сортировать по алфавиту
      </button>
      {
        posts.map((name) => (
          <p>
            {name.id}
          </p>
        ))
      }
      { issortAlphabet === false ? posts.map((name) => (
        <div key={name.id}>
          <h1>{name.title}</h1>
        </div>
      )) : titleNames.map((name, i) => (
        <div key={i}>
          <h1>
            {name}
          </h1>
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
