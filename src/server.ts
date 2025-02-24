// Start express server
import app from "./app";
import dotenv from "dotenv"

dotenv.config();

// Load env variables
const PORT = process.env.PORT || 4001;// Pull this from the env file

// Liston on port
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))