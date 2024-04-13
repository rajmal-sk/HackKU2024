import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor',
    },
    },
    {
      timestamps: true,
    }
)

const doctorSchema = mongoose.Schema(
{
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    specialization: 
    {
        ID: { type: Number, required: true },
        name: { type: String, required: true },
    },
    hospitalAffiliation: {
        type: String,
        required: true,
    },
    slotesBooked: [{
        type: Date,
    }],
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Doctor = mongoose.model('Doctor', doctorSchema)

export default Doctor