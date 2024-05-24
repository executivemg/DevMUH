const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "passwords is required"],
            minlength: [6, "Minimum length of password is 6 characters"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],

        },
    },
    {
        timestamps: true,
    }
)


const User = mongoose.models.Users || mongoose.model("Users", UserSchema)

export default User