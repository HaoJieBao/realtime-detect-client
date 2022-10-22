import { Route, Routes } from "react-router-dom";
import { useOnSocketConnect } from "./hooks/useOnSocketConnect";
import MainLayout from "./layout/MainLayout";
import { FeaturePage } from "./pages/FeaturePage";
import { HomePage } from "./pages/HomePage";
import { MonitorPage } from "./pages/MonitorPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { StreamPage } from "./pages/StreamPage";
import { useStore } from "./store/useStore";

function App() {
  const setReceiver = useStore((state) => state.setReceiver);
  const wsStream = useStore((store) => store.socketStream);
  const wsMonitor = useStore((store) => store.socketMonitor);

  useOnSocketConnect(wsStream, ({ server }) => {
    console.log({ server });
    setReceiver(server);
  });

  useOnSocketConnect(wsMonitor, ({ server }) => {
    console.log({ server });
    setReceiver(server);
  });

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/stream" element={<StreamPage />} />
        <Route path="/monitor" element={<MonitorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
