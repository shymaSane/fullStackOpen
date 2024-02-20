import mongoose from 'mongoose'

const Schema = mongoose.Schema

const personSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d+/.test(v)
      },
      message: ({ value }) => `${value} isn't a valid phone number!`,
    },
    required: [true, 'User phone number required!'],
    minLength: 8,
  },
})

personSchema.virtual('url').get(function () {
  return `/api/persons/${this._id}`
})

//because mongoose id is an object so to import in frontend needed it to be string
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Person', personSchema)
