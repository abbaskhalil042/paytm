import mongoose, { Document, Types } from "mongoose";

interface IAccount extends Document {
  id: Types.ObjectId;
  balance: number;
}

const accountSchema = new mongoose.Schema<IAccount>({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: { type: Number, required: true, default: 0 },
});

const Account = mongoose.model<IAccount>("Account", accountSchema);
export default Account;
