const express = require('express');

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/course', (request, response) => {
  const query = request.query;

  console.log(query);
  return response.json([
    {curso: 'curso1'},
    {curso: 'curso2'},
    {curso: 'curso3'},
    {curso: 'curso4'},
  ]);
});


app.post('/course', (request, response) => {
  const body = request.body;

  console.log(body);
  return response.json([
    {curso: 'curso1'},
    {curso: 'curso2'},
    {curso: 'curso3'},
    {curso: 'curso4'},
  ]);
});

app.put('/course/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);
  return response.json([
    {curso: 'curso1'},
    {curso: 'curso2'},
    {curso: 'curso3'},
    {curso: 'curso4'},
  ]);
});

app.patch('/course/:id', (request, response) => {
  return response.json([
    {curso: 'curso1'},
    {curso: 'curso2'},
    {curso: 'curso3'},
    {curso: 'curso4'},
  ])
});

app.delete('/course/:id', (request, response) => {
  return response.json([
    {curso: 'curso1'},
    {curso: 'curso2'},
    {curso: 'curso3'},
    {curso: 'curso4'},
  ])
});



app.listen(PORT, () => console.log(`🚀 Server up !🚀\nhttp://localhost:${PORT}`));