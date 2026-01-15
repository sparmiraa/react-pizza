import { useEffect, useState } from "react";
import { Pizza } from "./AdminPizzaTypes";
import { AdminPizzaService } from "../../../api/services/adminPizzaService";

export function useAdminPizzas() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPizzas = async () => {
      try {
        const data = await AdminPizzaService.getAll();
        setPizzas(data);
      } catch {
        setError("Ошибка загрузки пицц");
      } finally {
        setLoading(false);
      }
    };

    loadPizzas();
  }, []);

  return {
    pizzas,
    loading,
    error,
  };
}