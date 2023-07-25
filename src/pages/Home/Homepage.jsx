import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function HomePage() {
    const [posts, setposts] = useState([])
    const pagesArr = [];
    const [issortAlphabet, setSortAlphabet] = useState(false)
    const [currpage, setPage] = useState(1)
    const [searchedPages, setSearchedPages] = useState([])
    
    function nextPage() {
        if (currpage >= 10) {
        setPage(1)
        }
        else {
        setPage(currpage + 1)
        }
    }
    function previousPage() {
        if (currpage <= 1) {
        setPage(10)
        }
        else {
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
    
    function onSearch(event) {
        fetch(`https://jsonplaceholder.typicode.com/posts/?title_like=${event.target.value}&_page=${currpage}&_limit=10`)
        .then(res => res.json())
        .then((data) => {
            setposts(data)
        })
    }
    for (let i = 0; i < posts.length; i++) {

        titleNames.push(posts[i].title)

    }
    titleNames.sort()
    for (let i = 1; i <= posts.length; i++) {
        pagesArr.push(i)
    }
    function setSorted() {
        setSortAlphabet(!issortAlphabet)
    }
    return (
        <div>
            <input type="text" onChange={onSearch}/>
            <button onClick={() => setSorted()}>
                Сортировать по алфавиту
                </button>
            <div className="content">
                <h1>
                {currpage}
                </h1>
                
                <ul>
                {
                    posts.map((name) => (
                        <li key={name.id} >
                        {name.id}
                        </li>
                    ))
                }
                </ul>
                <ul>
                {issortAlphabet === false ? posts.map((name) => (
                    <li key={name.id}>
                    {name.title}
                    </li>
                )) : titleNames.map((name, i) => (
                    <li key={i}>
                    {name}
                    </li>
                ))}
                </ul>
            </div>
            <button onClick={previousPage}>
                Предыдущее
            </button>
            {pagesArr.map((name) => (
                <Link key={name} to={`/${name}`} onClick={() => setPage(name)} className="pagination-button">
                    <button>{name}</button>
                </Link>
            ))}
            <button onClick={nextPage}>
                Далее
            </button>

        </div>
    );
}