const express = require('express');

const app = express();
const PORT = 3333;  

app.get('/course', (request, response) => {
  return response.json([
    {curso1: 'curso1'},
    {curso2: 'curso2'},
    {curso3: 'curso3'},
    {curso4: 'curso4'},
  ])
});


app.post('/course', (request, response) => {
  return response.json([
    {curso1: 'curso1'},
    {curso2: 'curso2'},
    {curso3: 'curso3'},
    {curso4: 'curso4'},
  ])
});

app.put('/course/:id', (request, response) => {
  
  return response.json([
    {curso1: 'curso1'},
    {curso2: 'curso2'},
    {curso3: 'curso3'},
    {curso4: 'curso4'},
  ])
});


app.listen(PORT, () => console.log(`🚀 Server up !🚀\nhttp://localhost:${PORT}`));