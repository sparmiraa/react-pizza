import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PIZZA } from "../api";
import { FullPizzaDto } from "../types/FullPizzaDto";

export default function FullPizza() {
  const [pizza, setPizza] = React.useState<FullPizzaDto | null>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get<FullPizzaDto>(`${API_PIZZA}/` + id);
        setPizza(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            toast.error("Такой пиццы нет 😕");
            navigate("/");
          } else {
            toast.error("Ошибка сервера. Попробуйте позже.");
          }
        }
      }
    }
    getPizza();
  }, []);

  if (!pizza) {
    return <div className="container full-pizza__loading">Загрузка...</div>;
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
