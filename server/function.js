import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const Register = (pool) => async (req, res) => {
    //Get info from frontend
    const {email, password} = req.body;
    try {
      // Check if user already exists
      const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: "User with this email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert new user with hashed password
      const newUserResult = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at", [email, hashedPassword]);
      const newUser = newUserResult.rows[0];

      // Return the new user (without the password)
      res.status(201).json({ user: newUser });
    } catch (error) {
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
        const { password, ...userWithoutPassword } = user;
        res.status(200).json({ user: userWithoutPassword });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
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
