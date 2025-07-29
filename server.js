const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("hello its working")
})

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Backend is running on http://localhost:${PORT}`);
}); 