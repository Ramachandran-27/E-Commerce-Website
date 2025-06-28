import bcrypt from 'bcrypt';
class UserController {
    constructor(UserModel)
    {
        this.UserModel = UserModel;
    }
    async registerUser(req, res)
    {
        try {
            const {name,email,password} = req.body;
            console.log("Registering user:", name, email, password);
            if (!name || !email || !password) 
            {
                return res.status(400).json({ error: 'Name, email, and password are required' });
            }

            const existingUser = await this.UserModel.getUserByEmail(email);
            if (existingUser)
            {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password,saltRounds);
            const userData = {
                name:name,
                email:email,
                password:passwordHash
            };
            const newUser = await this.UserModel.createUser(userData);
            res.status(201).json(newUser);
        }
        catch (error)
        {
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    async loginUser(req, res)
    {
        try
        {
            const { email, password } = req.body;
            if (!email || !password)
            {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            // Check if user exists
            const user = await this.UserModel.getUserByEmail(email);
            if (!user)
            {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password,user.password_hash)
            if(!isMatch)
            {
                return res.status(401).json({error: 'Invalid email or password'});
            }
            const { password_hash, ...userWithoutPassword } = user; // Exclude password from response
            res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
        }
        catch (error)
        {
            console.log("Error logging in user:", error);
            res.status(500).json({ message: 'Error logging in user' });
        }
    }

    async getUserProfile(req,res)
    {
        try
        {
            const userId = req.params.id;
            if (!userId)
            {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const user = await this.UserModel.getUserById(userId);
            const { password_hash, ...userWithoutPassword } = user; // Exclude password from response
            if (!user)
            {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(userWithoutPassword);
        }
        catch (error)
        {
            res.status(500).json({ error: 'Error fetching user profile' });
        }
    }

    async updateUserProfile(req, res)
    {
        try
        {
            const userId = req.params.id;
            const { name, email, password } = req.body;

            if (!userId || !name || !email || !password)
            {
                return res.status(400).json({ error: 'User ID, name, email, and password are required' });
            }

            // Check if user exists
            const existingUser = await this.UserModel.getUserByEmail(email);
            console.log("Existing user:", existingUser, "User ID:", userId);
            if (existingUser && existingUser.id != userId)
            {
                return res.status(400).json({ error: 'Email already in use by another user' });
            }

            // Check if user exists by userID
            const user = await this.UserModel.getUserById(userId);
            if (!user) 
            {
                return res.status(404).json({ error: 'User not found' });
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password,saltRounds);
            const userData = {
                name:name,
                email:email,
                password:passwordHash
            };
            const updatedUser = await this.UserModel.updateUser(userId,userData);
            if (!updatedUser)
            {
                return res.status(500).json({ error: 'Error updating user profile' });
            }
            const { password_hash, ...userWithoutPassword } = updatedUser; // Exclude password from response
            res.status(200).json(userWithoutPassword);
        }
        catch (error)
        {
            res.status(500).json({ error: 'Error updating user profile' });
        }
    }
    
    async deleteUser(req, res)
    {
        try
        {
            const userId = req.params.id;
            if (!userId)
            {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const user = await this.UserModel.getUserById(userId);
            if (!user)
            {
                return res.status(404).json({ error: 'User not found' });
            }

            await this.UserModel.deleteUser(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error)
        {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}

export default UserController;