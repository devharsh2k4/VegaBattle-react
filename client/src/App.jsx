import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "../src/scenes/homePage";
import LoginPage from "../src/scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import ContestPage from "../src/scenes/contestPage";
import UserPage from "../src/scenes/userPage";
import OpportunityPage from "../src/scenes/opportunityPage";
import UserPathsPage from "../src/scenes/pathPage";


function App() {

const mode = useSelector((state)=> state.mode);
const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
const isAuth = Boolean(useSelector((state)=>state.token));

  return (
    <div className="app">

      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
           <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route 
            path="/contest" 
            element={<ContestPage/>}
            />
            <Route 
            path="/userpage" 
            element={<UserPage/>}
            />
            <Route 
            path="/opportunity"
            element={<OpportunityPage/>}
            />
            <Route 
            path="/path"
            element={<UserPathsPage/>}
            />

        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
