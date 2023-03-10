import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';

/*
  Instructions:
    Refactor `useFetch` to use `useReducer` instead of
    `useState`.
*/
function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetch':
      return {
        ...state,
        loading: true,
      };
    case 'success':
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        ...state,
        error: 'Error fetching data. Try again',
        loading: false,
      };
    default:
      throw new Error("That action type isn't supported");
  }
}

function useFetch(url) {
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: true,
    data: null,
    error: null,
  });

  React.useEffect(() => {
    dispatch({ type: 'fetch' });

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'success', data });
      })
      .catch((e) => {
        console.warn(e.message);
        dispatch({ type: 'error' });
      });
  }, [url]);

  return state;
}

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function UseFetch() {
  const [index, setIndex] = React.useState(0);

  const {
    loading,
    data: post,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postIds[index]}`);

  const incrementIndex = () => {
    setIndex((i) => (i === postIds.length - 1 ? i : i + 1));
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1 ? (
        <p>No more posts</p>
      ) : (
        <button onClick={incrementIndex}>Next Post</button>
      )}
    </div>
  );
}

export default UseFetch;
