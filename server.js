require("dotenv").config();
// niche wala jo app file hai wo inche inport kr rha q ki wahi pr express js ( jisame  api wagera banati hai )
const app = require("./src/app");  

// yha pr connectDB foler ke andar file hai use import kr rha taki mera env file me port and mongo url don laga sake 
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});



