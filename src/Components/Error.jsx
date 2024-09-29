import React from "react";

function Error({ message }) {
  return <div style={{ color: "red", fontSize: ".9rem" }}>Erro: {message}</div>;
}

export default Error;
