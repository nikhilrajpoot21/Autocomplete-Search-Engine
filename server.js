const express = require('express');
const path = require('path');
const app = express();
const {Trie} = require('./TrieDS');
const randomData = require('./data')

const trie = new Trie();


for(let i of randomData){
    trie.insert(i);
}

app.use(express.static(__dirname));

app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname,'Ui.html'))
});
app.get("/home", (req, res) => {
  const word = req.query.query;
  console.log("Search prefix:", word);

  if (!word) {
    return res.status(400).send("No query received");
  }

  const suggestions = trie.startsWith(word);
  if (suggestions.length > 0) {
    res.status(200).json(suggestions); 
  } else{
    res.json([])
  }
});


const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Backend is running on http://localhost:${PORT}`);
}); 