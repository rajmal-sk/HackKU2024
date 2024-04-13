import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const doctorSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    ehrID: {
        type: String,
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
    specialization: [
        {
            type: String,
            required: true,
        }
    ],
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User