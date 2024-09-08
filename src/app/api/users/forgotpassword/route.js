import {NextResponse} from 'next/server';
import userdb from '../../../../models/userSchema';
import Connection from '@/db/connection.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

Connection();

export const POST = async (request) => {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        const userCheck = await userdb.findOne({ email });
        console.log('usercheckdata', userCheck);

        if (!userCheck) {
            return NextResponse.json({ message: 'Email does not exist' }, { status: 400 });
        }

        const tokenData = {
            email: userCheck.email,
            id: userCheck._id,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });
        console.log('tokenData', token);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pawan30jul@gmail.com',
                pass: 'mmtluglxgobizaku',
            }
        });

        var mailOptions = {
            from: 'pawan13jul@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `http://localhost:3000/resetpassword/${userCheck._id}/${token}`,
        };

         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error);
                return NextResponse.json({
                    success: false,
                    message: 'Email could not be sent, please try again.',
                }, { status: 500 });
            } else {
                return NextResponse.json({
                    success: true,
                    message: 'Email sent successfully.',
                }, { status: 200 });
            }
        });

    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
};
