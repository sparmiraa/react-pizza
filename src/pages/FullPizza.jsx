import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          "https://690399efd0f10a340b250ab6.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Такой пиццы нету");
        navigate("/");
      }
    }
    getPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="." />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h4>{pizza.price}</h4>
    </div>
  );
}
