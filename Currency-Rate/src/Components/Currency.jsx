import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function Currency() {
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleConvert = async () => {
        if (!amount || isNaN(amount)) {
            setError("Please enter a valid amount.");
            return;
        }

        try {
            const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_XVCVRbL3IdVRrTd72SmXSaRhOfH04Qum4XXe2T7U&base_currency=${fromCurrency}`;
            const response = await axios.get(apiUrl);
            const rate = response.data.data[toCurrency];
            const conversionResult = (amount * rate).toFixed(2);
            setResult(`${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch exchange rates. Please try again.");
            setResult(null);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="container d-flex flex-row justify-content-center align-items-center vh-100 gap-4">
                <div className="cevrilecek p-4 shadow-lg rounded bg-light">

                    <h3 className="mb-3 text-primary">Currency Converter</h3>
                    <select className="form-select mb-2" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="TRY">TRY</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Amount of cash"
                        aria-label="Amount"
                        aria-describedby="basic-addon1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="mb-3 text-primary bg-light display-3 fw-bold p-3 rounded shadow-sm">to</div>

                <div className="cevrilecek p-4 shadow-lg rounded bg-light">

                    <select className="form-select mb-2" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        <option value="USD">USD</option>
                        <option value="TRY">TRY</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <button className="btn btn-success p-2 fw-bold" onClick={handleConvert}>Convert</button>

                {result && (
                    <div className="mt-3 p-4 shadow-lg rounded bg-success text-white text-center">
                        <h4 className="fw-bold">Conversion Result</h4>
                        <p className="display-6">{result}</p>
                    </div>
                )}

                {error && (
                    <div className="mt-3 p-4 shadow-lg rounded bg-danger text-white text-center">
                        <h4 className="fw-bold">Error</h4>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Currency;