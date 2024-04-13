import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cron from 'node-cron'
import colors from 'colors'
import asyncHandler from 'express-async-handler'

import connectDB from './db.js'
import Doctor from './doctorModel.js'

dotenv.config()

connectDB()

const app = express()


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json())


app.get('/hospital', (req, res) => {
    res.send('hospital API is running')
})


//CRUD operations
const registerDoctor = asyncHandler(async (req, res) => {
    const {name, email, password, dateOfBirth, gender, phoneNumber, specialization, hospitalAffiliation} = req.body
  
    const doctorExists = await Doctor.findOne({ email })
  
    if (doctorExists) {
      res.status(400)
      throw new Error('Doctor already exists')
    }
  
    const doctor = await Doctor.create({
        name, 
        email, 
        password, 
        dateOfBirth, 
        gender, 
        phoneNumber, 
        specialization, 
        hospitalAffiliation
    })
  
    if (doctor) {
      res.status(201).json({
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        dateOfBirth: doctor.dateOfBirth, 
        gender: doctor.gender, 
        phoneNumber: doctor.phoneNumber, 
        specialization:doctor.specialization, 
        hospitalAffiliation: doctor.hospitalAffiliation
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
})

const getDoctors = asyncHandler( async(req, res) => {
    const doctors = await Doctor.find({})
    res.json(doctors)
})

const updateDoctorProfile = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
  
    if (doctor) {
        doctor.name = req.body.name || doctor.name
        doctor.email = req.body.email || doctor.email
        doctor.dodateOfBirth = req.body.dateOfBirth || doctor.dateOfBirth, 
        doctor.gender = req.body.gender || doctor.gender, 
        doctor.phoneNumber = req.body.phoneNumber || doctor.phoneNumber, 
        doctor.specialization = req.body.specialization || doctor.specialization, 
        doctor.hospitalAffiliation = req.body.hospitalAffiliation || doctor.hospitalAffiliation

        if (req.body.password) {
            doctor.password = req.body.password
        }
    
        const updatedDoctor = await doctor.save()
    
        res.json({
            _id: updatedDoctor._id,
            name: updatedDoctor.name,
            email: updatedDoctor.email,
            dateOfBirth: updatedDoctor.dateOfBirth, 
            gender: updatedDoctor.gender, 
            phoneNumber: updatedDoctor.phoneNumber, 
            specialization: updatedDoctor.specialization, 
            hospitalAffiliation: updatedDoctor.hospitalAffiliation
        })
        } else {
        res.status(404)
        throw new Error('User not found')
        }
})

const getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
  
    if (doctor) {
      res.json(doctor)
    } else {
      res.status(404)
      throw new Error('Doctor not found')
    }
})

const deleteDoctor = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)
  
    if (doctor) {
      await doctor.deleteOne()
      res.json({ message: 'Doctor removed' })
    } else {
      res.status(404)
      throw new Error('Doctor not found')
    }
})

const updateAvailability = asyncHandler(async(req, res) => {
  const result = await Doctor.updateOne({_id: req.params._id, 'availability.date': req.body.date},{
    $pull: {
      'availability.$.timeSlotes': time
    }
  })

  if(result.nModified > 0) {
    console.log('Successfully updated');
  }
  else {
    console.log('Not updated');
  }

  if(result) {

  }
  else {
    throw new Error('Not found specific day')
  }  
})
  
//CRUD
app.post('/hospital/doctor', registerDoctor)
app.get('/hospital/doctor', getDoctors)
app.put('/hospital/doctor/:id', updateDoctorProfile)
app.get('/hospital/doctor/:id', getDoctorById)
app.delete('/hospital/doctor/:id', deleteDoctor)
app.put('/hospital/doctor/:id', updateAvailability)

const addAvailability = asyncHandler(async(req, res) => {
  const doctor = Doctor.findOne(req.params._id)

  let availability = doctor.availability

  const newTimes = {
    //doctorId: doctor._id,
    date: Date.now(),
    timeSlots: ['12:30PM', '1:00PM']
  }

  console.log(availability);
  console.log(newTimes);

  //availabilty.append(newTimes);

  doctor.availability = availability

  //doctor.save();

  res.json({
    availability: doctor.availability
  })
})
app.put('/hospital/doctor_time/:id', addAvailability) 

const PORT = process.env.PORT || 8000

app.listen(PORT, 
    console.log( `Server running on port ${PORT}`.yellow.bold)
)