const crypto = require('crypto');
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {      
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    
    if(process.env.NODE_ENV === 'production') cookieOptions.secure= true;
    
    res.cookie('jwt', token, cookieOptions)
    
    // remove the pasword form the output
    user.password = undefined;
    
    res.status(statusCode).json({
        status:'success',
        token,
        data: {
            user
        }
    })
}


exports.signup = catchAsync(async (req,res,next) => {
  
    const newUser = await User.create(req.body);
    
    createSendToken(newUser,201,res); 
    
});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    
    //1)check if eamil and password exits
    if(!email || !password) {
       return next(new AppError('Please provide email and password!', 400));
    }
    
    // 2) check if user exists && password is correct
    const user = await User.findOne({email}).select('+password');
    
    
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }
    
    
    //3) if everything ok, send token to client
    createSendToken(user,200,res); 

});

exports.protect = catchAsync( async (req,res,next) => {
    let token;
    // 1) Getting the token and check of it's there
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token) {
        return next(new AppError('Your are not login! Please login to get access', 401));
    }
    //2) Verification token 
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
   
    // 3)  Check if user still exists
    const currentUser = await User.findById(decode.id);
    if(!currentUser) {
        return next(
            new AppError('The User belong to this token does no longer exits', 401)
        )
    }
    
    // 4) Check user change password after the token was issued
    if(currentUser.changedPasswordAfter(decode.iat)) {
        return next(new AppError('User recently changed passwrod! Please log in again', 401))
    };
    
    //Grant access to protected route
    req.user = currentUser;
    next();
})


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles['admin', 'lead-guide']. roles = 'user'
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        
        next();
    }
}

exports.forgotPassword =catchAsync(async (req, res, next) => {
    //1) Get user based on POSTed email
    const user = await User.findOne({email: req.body.email});
    
    if(!user) {
        return next(new AppError('There is no user with email token', 404));
    }
    
    //2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
     
    //3)Send it to user's mail
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \nIf your didn't forget your password, please ignore this email!`
    
    
    
    try {
        
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (Valid for 10 min)',
            message
        });
        // console.log(`---------${process.env.EMAIL_PASS}, ------${process.env.EMAIL_PASS}`)
        
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        })
        
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});
        
        return next(
            new AppError('There was an error seading the email. Try again later!', 500)
        )
        
    }
   
    
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    //1 =) Get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    
    console.log(hashedToken);
        
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now() }})
    console.log(user);    
    //2) if token has not expired and there is user set the new password
    if(!user) {
        return next(new AppError('Token is invalid or has expires', 400));
    }
    
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined; 
    await user.save();
    
    //3) Update changedPasswordAt property the user
    //4 log the user in, send JWT
    createSendToken(user,201,res); 
    
})


exports.updatePassword = catchAsync(async (req, res, next) => {
    
    
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');
    
    
    //2) Check if Posted current password is correc
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next( new AppError('Your current password is wrong', 401));
    }
    
    
    //3) if so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    //User.findbyidandUpdate will not work as intend;
    
    
    //4) Log user in send JWt
    createSendToken(user,201,res); 
    
    
})


