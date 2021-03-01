import React, { useMemo, useState, useEffect } from 'react';
import Header from '../shared/Header';
import axios from 'axios';

const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';
  const [data, setData] = useState([]);
  const posts = useMemo(() => data, [data]);

  useEffect(() => {
    axios.get(APILINK)
         .then(resp => {
           setData(resp.data);
         });
  }, []);

  // const filter = event => {
  //   event.persist();
  //   const value = event.target.value;
    
  //   if (value.length === 0) {
  //     setData([...dataSet]);
  //   } else if (isNaN(value)) {
  //     const regex = new RegExp(value);
  //     setData([...dataSet.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))]);
  //   } else {
  //     const num = Number(value);
  //     setData([...dataSet.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))]);
  //   }
  // };

  const sort = event => {
    event.persist();
    const { name, type } = event.target.dataset;
    // const [sortedColumn, setSortedColumn] = useState(null);
    
    let sorted;
    console.log(type);
    if (type === "int")
      sorted = data.sort((a, b) => Number(a[name]) - Number(b[name]));
    else
      sorted = data.sort((a, b) => {
        if (a[name].toLowerCase() < b[name].toLowerCase()) return -1;
        if (a[name].toLowerCase() > b[name].toLowerCase()) return 1;
        return 0;
      });

    // if (order) {
    //   sorted = sorted.reverse();
    //   setOrder(false);
    // } else {
    //   setOrder(true);
    // }

    setData([...sorted]);
  };

  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data"/>
      </div>

      <div className="container">
        <h2>Data Table</h2>
        <hr/>
        
        <div className="row my-3 align-items-center justify-content-end">
          <div className="col-auto">
            <label htmlFor="filter" className="col-form-label">Filter</label>
          </div>

          <div className="col-auto">
            <input type="text" name="filter" className="form-control"/>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <td data-name="data.userId" data-type="int" onClick={sort}>
                {/* <button type="button" onClick={() => sort}>
                  <h3>User Id</h3>
                </button> */}
                <h3>User Id</h3>
              </td>
              <td data-name="id" data-type="int" onClick={sort}>
                <h3>Post Id</h3>
              </td>
              <td data-name="title" data-type="text" onClick={sort}>
                <h3>Title</h3>
              </td>
              <td data-name="body" data-type="text" onClick={sort}>
                <h3>Body</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={i}>
                <td>
                  <p>{post.userId}</p>
                </td>
                <td>
                  <p>{post.id}</p>
                </td>
                <td>
                  <p>{post.title}</p>
                </td>
                <td>
                  <p>{post.body}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
 
export default Data;