import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { CreateReportPage } from "./pages/create-report-page/CreateReportPage";
import { EditReportPage } from "./pages/edit-report-page/EditReportPage";
import { Navbar } from "./components/Navbar";
import { PageContainer } from "./components/PageContainer";

// App with routing
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reports/new" element={<CreateReportPage />} />
          <Route path="/reports/:id" element={<EditReportPage />} />
        </Routes>
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;
