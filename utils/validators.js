module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
        errors.email = 'email must not be empty'
    
    // else{
    //     const regEx = "\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$;"

    //     if (!email.match(regEx)) {
    //         errors.email = "email address not valid dog"
    //     }
    // }
    }
    if (password.trim() === '') {
        errors.password = 'password must not be empty'
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = "passwords must match"
    }

    return{ errors, 
        valid: Object.keys(errors).length < 1
    }
    
}