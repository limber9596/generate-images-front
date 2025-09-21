import ClipLoader from "react-spinners/ClipLoader";
import { useLoading } from "../context/LoadingContext";

export const Loader = () => {
  const { loading } = useLoading();
  if (!loading) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.4)", // mucho más sutil
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        pointerEvents: "none", // opcional, deja interactuar con la página si quieres
      }}
    >
      <ClipLoader color="#000" loading={true} size={50} />
    </div>
  );
};
