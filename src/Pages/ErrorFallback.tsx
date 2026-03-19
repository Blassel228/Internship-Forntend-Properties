import React from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../Components/Ui/AppButton.tsx";

export default function ErrorFallback() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Something has broken.</h2>
      <p>It happened on our side.</p>
      <AppButton onClick={() => navigate(-1)}>Back</AppButton>
      &nbsp;
      <AppButton onClick={() => navigate("/")}>To main page</AppButton>
    </div>
  );
}