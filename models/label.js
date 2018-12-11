const mongoose = require('mongoose');

const { Schema } = mongoose;

const labelSchema = new Schema({
    name: { type: String, required: true, unique: true },
    verified: { type: Boolean },
    description: { type: String, default: '' },
    artists: [{ type: String, default: [] }],
    genre: [{ type: String, default: [] }],
    country: { type: String, default: [] }
});

module.exports = mongoose.model('Label', labelSchema)
