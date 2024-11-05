import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AudioCorrectPage from "./pages/audio-correct/audio-correct-page"

function App() {
  return (
    <>
      <AudioCorrectPage />
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App
