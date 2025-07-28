require('dotenv').config(); //configuring dotenv
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();

//middleware
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>res.send("Api is running"));//dummy api call

///connecting to mongodb
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Mongodb successfully connected"))
   .catch(err=>console.log(err));

  const PORT=process.env.PORT || 5005; 
  app.listen(PORT,()=>console.log(`Server is running on Port: ${PORT}`))





