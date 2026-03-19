import { Toaster } from "react-hot-toast";
import Routers from "./Components/Routes/Routers.tsx";

function App() {
  return (
    <>
      <Routers />
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 }
        }}
      />
    </>
  );
}

export default App;