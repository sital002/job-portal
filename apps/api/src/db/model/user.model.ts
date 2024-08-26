import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    role: 'admin' | 'user';
    profileUrl?: string;
    firstName?: string;
    lastName?: string;
    status: 'active' | 'inactive' | 'suspended';
}

// Define the schema
const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    profileUrl: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "active"
    }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Create the model from the schema
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
