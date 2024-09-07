import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    prompt: String,
    correctSolution: String,
  });
  
  const Question = mongoose.model('Question', questionSchema);

    export default Question;