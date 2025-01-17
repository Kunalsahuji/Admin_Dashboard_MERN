module.exports.sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken()
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // secure:true
    }
    res.status(statusCode)
        .cookie("token", token, option)
        .json(
            {
                success: true,
                id: user._id,
                role: user.role,
                user,
                token,
            }
        )
}


