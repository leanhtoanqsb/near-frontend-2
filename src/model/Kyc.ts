import mongoose from "mongoose";

export interface KycInfo {
  _id: string;
  identifyId: string;
  accountId: string;
  isApproved: boolean;
  hasProof: boolean;
  kycInfo: string[];
  proof: string[];
}
/* PetSchema will correspond to a collection in your MongoDB database. */
const KycSchema = new mongoose.Schema<KycInfo>({
  identifyId: String,
  accountId: { type: String, unique: true, require: true },
  isApproved: { type: Boolean, default: false },
  hasProof: { type: Boolean, default: false },
  kycInfo: { type: [String], default: [] },
  proof: { type: [String], default: [] },
});

export default mongoose.models.Kyc || mongoose.model("Kyc", KycSchema);
