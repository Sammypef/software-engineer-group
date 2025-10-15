import { pool } from "../server/supabaseClient.js";

export const Register = async(req, res) => {
    //Get info from frontend
    const {email, password} = req.body;
    //run query
    const AddO_user = await pool.query("INSERT INTO user VALUES ($1, $2) RETURNING *", [email, password]); // SQL query to insert user data into the database
    //Return status and data
    res.status(200).json(AddO_user.rows[0]); 
}


export const Login = async(req, res) => {
    //Get info from frontend
    const {email, password} = req.body;
    //run query
    const Check_user = await pool.query("SELECT * FROM user WHERE email = $1 AND password = $2", [email, password]); // SQL query to check user credentials
    //Return status and data
    if(Check_user.rows.length > 0){
        res.status(200).json(Check_user.rows[0]);
    } else {
        res.status(401).json({message: "Invalid email or password"});
    }
}

//Validate structure 
//UID,Code

export const Validate_mail = async(req, res) => { // Don't use this function for now
    //Get info from frontend 
    const {code} = req.body;
    const Check_code = await pool.query("SELECT * FROM Valdate WHERE code = $1", [code]);
    UID = Check_code.rows[0].uid;
    if(UID){
        const Delete_code = await pool.query("DELETE FROM Valdate WHERE code = $1", [code]);
        const Update_Status = await pool.query("UPDATE user SET status = true WHERE uid = $1", [UID]);
        res.status(200).json({message: "Validation successful"});
    }
}

export const Song_Play = async (req, res) => {
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
