import expess from 'express';
import { supabase } from '../my-react-app/server/supabaseClient.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = expess();
const port = process.env.PORT
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});