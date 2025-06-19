import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
     title: {
        type: String,
        required: true
        },
    author: {
        type: String,
        required: true        
        },
     genre: {
         type: String,            
        },        
       publishYear: {
          type:Number,
          required: true,
        },         
        },
    {
        timestamps: true,
    }

);
export const book = mongoose.model('book', bookSchema);
