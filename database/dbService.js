import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

export const getDatabaseConnection = async () => {
    console.log("📦 Trying to open database...");
  
    try {
        const db = await SQLite.openDatabase({ name: ':memory:', location: 'default' });

      console.log("✅ Database opened successfully");
      return db;
    } catch (error) {
      console.error("❌ Failed to open database:", error);
      throw error;
    }
  };
// to do related
export const createToDosTable = async (db) => {
    const query = `CREATE TABLE IF NOT EXISTS TODOLIST (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        details TEXT NOT NULL,
        isDone INTEGER NOT NULL DEFAULT 0,
    )`
    try {
        await db.executeSql(query);
    } catch (error) {
        console.error("Error creating table", error);
    }
}

export const getAllToDos = async (db) => {
    try {
        const results = await db.executeSql(`SELECT * FROM TODOLIST`);
        return results[0].rows.raw(); // first result set
    } catch (error) {
        console.error("Error selecting all todos", error);
        throw error;
    }
}

export const insertToDo = async (db, todo) => {
    const { title, details, isDone } = todo;
    try {
        await db.executeSql(`INSERT INTO TODOLIST (title, details, isDone) VALUES (?, ?, ?)`, [title, details, isDone]);
    } catch (error) {
        console.error("Error inserting todo", error);
        throw error;
    }
}

export const deleteToDo = async (db, id) => {
    try {
        await db.executeSql(`DELETE FROM TODOLIST WHERE id = ?`, [id]);
    } catch (error) {
        console.error("Error deleting todo", error);
        throw error;
    }
}

// account related
export const createAccountsTable = async (db) => {
    const query = `CREATE TABLE IF NOT EXISTS ACCOUNTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
    )`
    try {
        await db.executeSql(query);
    } catch (error) {
        console.error("Error creating table", error);
    }
}

export const findAccountByUsername = async (db, username) => {
    try {
        const results = await db.executeSql(`SELECT * FROM ACCOUNTS WHERE username = ?`, [username]);
        console.log(results);
        if (results.length > 0){
            
            return results[0].rows.item(0); // first result set first row (item(0))
        }
        return null;
    } catch (error) {
        console.error("Error finding account by username", error);
        throw error;
    }
}

export const updatePasswordbyUsername = async (db, username, newPassword) => {
    try {
        await db.executeSql(`UPDATE ACCOUNTS SET password = ? WHERE username = ?`, [newPassword, username]);
    } catch (error) {
        console.error("Error updating password", error);
        throw error;
    }
}

export const insertAccount = async (db, username, password)=>{
    try {
        await db.executeSql(`INSERT INTO ACCOUNTS (username, password) VALUES (?, ?)`, [username, password]);
    } catch (error) {
        console.error("Error inserting account", error);
        throw error;
    } 
}