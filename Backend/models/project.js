import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gitUrl: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String], // Array of strings for multiple technologies
    required: true,
  },
  users: {
    type: [mongoose.Types.ObjectId],
    ref: 'users',
    required: true,
  },
  chatUrl: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: true,
  },
  isApplicationOpen: {
    type: Boolean,
    default: true, // Default to true, but can be changed later
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
