import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { ThemeProvider } from "./context/ThemeContext";
import AuthContextProvider from "./context/UserStateContext";
import { SignIn, SignUp } from "./pages/auth";
import { Dmca, PrivacyPolicy, TermsOfService } from "./pages/legal";
import { Account, ChapterManga, DetailManga, Home } from "./pages/main";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider initialTheme="dark">
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <div className=" flex flex-col min-h-screen ">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />

              <Route path="/komik">
                <Route path=":title" element={<DetailManga />} />
                <Route path=":title/:chapterId" element={<ChapterManga />} />
              </Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/term-of-services" element={<TermsOfService />} />
              <Route path="/dmca" element={<Dmca />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
            <Footer />
          </div>
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
