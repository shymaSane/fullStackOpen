import mongoose from "mongoose";

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  number: { type: String, required: true },
});

personSchema.virtual("url").get(function () {
  return `/api/persons/${this._id}`;
});

//because mongoose id is an object so to import in frontend needed it to be string
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Person", personSchema);
