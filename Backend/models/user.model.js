import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    refreshTokenHash: {
      type: String,
      select: false
    },

    lastLogin: Date
  },
  { timestamps: true }
);

/* Password hash */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

/* Compare password */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

/* Hash refresh token */
userSchema.methods.hashToken = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export default mongoose.model("User", userSchema);
