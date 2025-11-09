import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const Register = (pool) => async (req, res) => {
    //Get info from frontend
    const {email, password} = req.body;
    console.log('Register endpoint called for email:', email);
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
      // Check if user already exists
      const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      console.log('Existing user query result rows:', existingUser?.rows?.length);
      if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: "User with this email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert new user with hashed password
      // Use RETURNING * to adapt to different schemas (some DBs use uid/user_id instead of id)
      const newUserResult = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword]
      );
      let newUser = newUserResult.rows[0];

      // Create initial progression record for the new user
      await pool.query(
        "INSERT INTO progression (user_id, level, exp) VALUES ($1, 1, 0)",
        [newUser.user_id]
      );

      // Remove password before sending to client if present
      if (newUser && newUser.password) {
        const { password: _pw, ...rest } = newUser;
        newUser = rest;
      }

      // Return the new user (without the password)
      res.status(201).json({ user: newUser });
    } catch (error) {
      // Provide more detailed logging to help diagnose DB/schema errors without exposing sensitive data
      console.error('Register error message:', error && error.message);
      console.error('Register error code:', error && error.code);
      console.error('Register error stack:', error && error.stack);
      res.status(500).json({ message: "Server error during registration.", error: error.message });
    }
}


export const Login = (pool) => async (req, res) => {
    //Get info from frontend
    const {email, password} = req.body;
    //run query
    try {
      const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (userResult.rows.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Avoid redeclaring `password` (it was destructured from req.body above)
        const { password: _hashedPassword, ...userWithoutPassword } = user;
        res.status(200).json({ user: userWithoutPassword });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login.", error: error.message });
    }
}

//Validate structure 
//UID,Code

export const Validate_mail = (pool) => async(req, res) => { // Don't use this function for now
    //Get info from frontend 
    const {code} = req.body;
    const Check_code = await pool.query("SELECT * FROM Valdate WHERE code = $1", [code]);
    UID = Check_code.rows[0].uid;
    if(UID){
        const Delete_code = await pool.query("DELETE FROM Valdate WHERE code = $1", [code]);
        const Update_Status = await pool.query("UPDATE users SET status = true WHERE uid = $1", [UID]);
        res.status(200).json({message: "Validation successful"});
    }
}

export const Song_Play = (pool) => async (req, res) => {
  try {
    const { id } = req.params;

    // Query the song path
    const result = await pool.query(
      "SELECT song_file_path FROM song WHERE song_id = $1",
      [id]
    );

    // Check if song exists
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Return the song URL
    const songUrl = result.rows[0].song_file_path;
    res.status(200).json({ url: songUrl });

    } catch (error) {
    console.error("Error playing song:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
