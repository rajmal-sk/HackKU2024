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

const doctorAvailabilitySchema = new mongoose.Schema({
  // doctorId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Doctor'
  // },
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  timeSlots: {
    type: [String],
    required: true,
  }
});

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
    //availability: [doctorAvailabilitySchema],
    availability:[{
      date: {type: String,
      default:"2024-15-30"},
      timeSlots: {type: [String],
      default:["12:00PM","12.45PM"]}
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