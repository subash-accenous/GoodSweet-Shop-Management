import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  role: { type: String,
     enum: ["user", "admin"],
     default: "user" 
    }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("SwUser", userSchema);
