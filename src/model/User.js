import db from '../config/db.js';

// create a user model class to interact with the database
class User { 

    // constructor for user objects
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // create new user function
    static async create(username, email, password) {
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, password]
        );

        return new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password);
    }

    // find user by email function
    static async findByEmail(email) {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]); 

        return result.rows.length > 0 ? new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password) : null;
    }

    // find user by id function
    static async findById(id) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);   

        return result.rows.length > 0 ? new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password) : null;
    }

}

export default User;