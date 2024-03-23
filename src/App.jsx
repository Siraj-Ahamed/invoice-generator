import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {Container} from "react-bootstrap"
import InvoiceForm from "./components/InvoiceForm";

function App() {
    return (
        <div className="App d-flex flex-column align-items-center justify-content-center w-100">
            <Container>
                <InvoiceForm />
            </Container>
        </div>
    );
}

export default App;
