const bcrypt = require("bcrypt");
const user = require("../Models/ user");
//signup
exports.signup = async (req, res) => {
    try {
        console.log("hello");
        
        //fetch data from body
        const { name, email, password, role } = req.body;
      
        //check if email already exist or not 
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                status: false,
                message: "Email already exist"
            })
        }

        //hash password

        let hashedpassword;

        try {
            hashedpassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(502).json({
                status: false,
                message: "not hashed"
            })
        }

        const User = await user.create({
            name,
            email,
            password: hashedpassword,
            role,
        })
        return res.status(201).json({
            status: true,
            message: "Entry Successfull"
        })
    }
    catch (err) {
        console.log(err.message);
    }
};

//Login handler
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                status: false,
                message: "Enter all fields"
            })
        }

        const user0 = await user.findOne({ email });
        if (!user0) {
            res.status(403).json({
                status: false,
                message: "No Account Found"
            });
        }
        if (await bcrypt.compare(password, user0.password)) {
            // if password match
         res.status(202).json({
            success:true,
            message:"Logged in successfully"
         });
        }
        else
        {
            return res.status(403).json({
                success:false,
                message:"Wrong Password"
            });
        }
    }
    catch (err) {
      console.log(err.message);
    }
};
