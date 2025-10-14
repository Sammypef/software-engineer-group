import { pool } from "pg";

export const Register = async(req, res) => {
    //Get info from frontend
    const {username, password} = req.body;
    //run query
    const AddO_user = await pool.query("INSERT INTO user VALUES ($1, $2) RETURNING *", [username, password]); // SQL query to insert user data into the database
    //Return status and data
    res.status(200).json(AddO_user.rows[0]); 
}

//Validate structure 
//UID,Code

export const Validate_mail = async(req, res) => {
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

export async function test(req, res) {

}