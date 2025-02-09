const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin-Model');
const User = require('../models/user-model');
async function updatePasswords() {
    try {
        // Connect to your local MongoDB
        await mongoose.connect('mongodb://localhost:27017/test');

        // New password to set for both admins
        const newPassword = 'admin123';
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update first admin (Juan Reyes with asdf@gmail.com)
        const admin1 = await Admin.findOneAndUpdate(
            { email: 'asdf@gmail.com' },
            { password: hashedPassword },
            { new: true }
        );

        // Update second admin (Juan Reyes with juanreyes@gmail.com)
        const admin2 = await Admin.findOneAndUpdate(
            { email: 'juanreyes@gmail.com' },
            { password: hashedPassword },
            { new: true }
        );

        console.log('Password reset results:');
        console.log('Admin 1:', admin1 ? admin1.email : 'not found');
        console.log('Admin 2:', admin2 ? admin2.email : 'not found');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

//updatePasswords();



async function resetUserPassword() {
    try {
        // Connect to your local MongoDB
        await mongoose.connect('mongodb://localhost:27017/test');

        // New password to set
        const newPassword = 'user123';
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user password
        const result = await User.findOneAndUpdate(
            { email: 'juanreyes@gmail.com' },
            { password: hashedPassword },
            { new: true }
        );

        if (result) {
            console.log('Password reset successful for user:', result.email);
            console.log('New password is: user123');
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

resetUserPassword();