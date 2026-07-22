const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { createUser, getUserByEmail, getUserById, updateUserProfile ,
    updateResume, getResumePath, deleteResume,updateResumeScore} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { extractResumeText, analyzeResume } = require("../services/aiService");
const { verifyEmail } = require("../models/userModel");
const{sendVerificationEmail} = require("../services/emailServices");


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const verificationExpires =
        new Date(Date.now() + 24 * 60 * 60 * 1000);

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Store User
        createUser(
            name,
            email,
            hashedPassword,
            verificationToken,
            verificationExpires,
            async (err, result) => {
            if (err) {
                
                // Duplicate Email
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Email already exists"
                    });
                }
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            try {

                await sendVerificationEmail(
                    email,
                    verificationToken
                );

            } catch (error) {

                return res.status(500).json({
                    message: "Failed to send verification email"
                });

            }

            return res.status(201).json({

                success: true,

                message: "Registration successful. Please verify your email.",

                userId: result.insertId

            });

        }
    );


    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};


const loginUser = (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        getUserByEmail(email, async (err, result) => {

            try {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message: "Database Error"
                    });

                }

                // User does not exist
                if (result.length === 0) {

                    return res.status(401).json({
                        message: "Invalid Credentials"
                    });

                }

                const user = result[0];


                // Check Password
                const isMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isMatch) {

                    return res.status(401).json({
                        message: "Invalid Credentials"
                    });

                }


                // Check Email Verification
                if (!user.is_verified) {

                    return res.status(403).json({
                        message: "Please verify your email before logging in."
                    });

                }


                // Generate JWT only after all checks pass
                const token = jwt.sign(

                    {
                        id: user.id,
                        email: user.email
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    }

                );


                // Successful Login
                return res.status(200).json({

                    message: "Login Successful",

                    token,

                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }

                });

            }
            catch (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Server Error"
                });

            }

        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};


const getProfile = (req, res) => {
    getUserById(req.user.id, (err, result) => {

        if (err) {
            
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user: result[0]
        });
    });
};


const updateProfile = (req, res) => {

    const { name, college, branch, graduation_year , career_goal} = req.body;

    if (!name || !college || !branch || !graduation_year || !career_goal) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    updateUserProfile(
        req.user.id,
        name,
        college,
        branch,
        graduation_year,
        career_goal,
        (err) => {

            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            getUserById(req.user.id, (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                return res.status(200).json({
                    message: "Profile Updated Successfully",
                    user: result[0]
                });

            });

        }
    );

};



const uploadResume = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "Please upload a PDF resume"
        });
    }
    const resumePath = req.file.path;
    updateResume(req.user.id, resumePath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }
        return res.status(200).json({
            message: "Resume uploaded successfully",
            resume: resumePath
        });
    });
};



const removeResume = (req, res) => {

    getResumePath(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0 || !result[0].resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        const resumePath = result[0].resume;
        fs.unlink(resumePath, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Unable to delete file"
                });
            }
            deleteResume(req.user.id, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Database Error"
                    });
                }
                return res.status(200).json({
                    message: "Resume deleted successfully"
                });
            });
        });
    });
};


const analyzeResumeController = (req, res) => {

    getResumePath(req.user.id, async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0 || !result[0].resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        try {

            const resumeText = await extractResumeText(result[0].resume);

            const analysis = await analyzeResume(resumeText);

            const score = analysis.overallScore;
            
            console.log("Score:", score);

            updateResumeScore(
                req.user.id,
                score,
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Database Error"
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        analysis
                    });

                }
            );

        } catch (error) {


            return res.status(500).json({
                message: error.message
            });

        }

    });

};


const verifyEmailController = (req, res) => {

    const token = req.params.token;

    verifyEmail(token, (err, result) => {

        if (err) {


            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Invalid or Expired Token"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully"
        });

    });

};



module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    uploadResume,
    removeResume,
    analyzeResumeController,
    verifyEmailController
};

