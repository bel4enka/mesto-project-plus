import mongoose from 'mongoose';
import { ICard } from '../services/interface';

const cardsSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  text: {
    type: String,
    minlength: 2,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model('cards', cardsSchema);
