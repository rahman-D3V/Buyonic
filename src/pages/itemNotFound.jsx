import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemNotFound = () => {
  const [timer, setTimer] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer <= 0) {
      navigate("/");
      return;
    }

    const id = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [timer, navigate]);

  return (
    <div className="pt-24 text-center">
      <h1 className="text-2xl font-semibold mb-2">Item Not Found</h1>
      <p className="text-gray-600 mb-1">Redirecting to Home Page...</p>
      <p className="text-lg font-medium">{timer}</p>
    </div>
  );
};

export default ItemNotFound;
