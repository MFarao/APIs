import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const CardList = () => {
  const [posts, setPosts] = useState([]); //{id: body: title:}
  const URL = "https://jsonplaceholder.typicode.com/posts/"; // `https://jsonplaceholder.typicode.com/posts/${postId}`

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos: ", error);
      });
  }, []);

  return (
    <>
      <h1>Publicaciones</h1>
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
    </>
  );
};

export default CardList;

// localStorage.setItem('jwtToken', data.token)
// const token  = localStorage.getItem('jwtToken')
// const [name, setName] = useState("");
// const [description, setDescription] = useState("");
// const [products, setProducts] = useState([]);
// const [token, setToken] = useState("");
// const URL = "localhost:8080/products";
// const datosAEnviar ={
//     name: name,
//     description: description
// }

// const options = {
//   method: "POST",
//   header: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify(datosAEnviar),
// };

// useEffect(() => {
//   fetch(URL, options)
//     .then((response) => response.json())
//     .then((data) => {
//       setProducts([...products, {data}]);
//     })
//     .catch((error) => {
//         console.error("Error al obtener los datos: ", error);
//       });
// }, [products]);
