import * as SQLite from 'expo-sqlite';

// Open a database connection
export const getDatabaseConnection = async () => {
  console.log('📦 Trying to open database...');
  try {
    const db = await SQLite.openDatabaseAsync('to-do-list-data.db');
    console.log('✅ Database opened successfully');
    return db;
  } catch (error) {
    console.error('❌ Failed to open database:', error);
    throw error;
  }
};

// Create ToDos table
export const createToDosTable = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS TODOLIST (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      details TEXT NOT NULL,
      isDone INTEGER NOT NULL DEFAULT 0
    );
  `;
  try {
    await db.execAsync(query);
    console.log('✅ ToDo table created');
  } catch (error) {
    console.error('❌ Error creating ToDo table:', error);
    throw error;
  }
};

// Insert a ToDo item
export const insertToDo = async (db, { title, details, isDone = 0 }) => {
  const query = `
    INSERT INTO TODOLIST (title, details, isDone)
    VALUES (?, ?, ?);
  `;
  try {
    await db.runAsync(query, [title, details, isDone]);
    console.log('✅ ToDo inserted');
  } catch (error) {
    console.error('❌ Error inserting ToDo:', error);
    throw error;
  }
};

// Retrieve all ToDo items
export const getAllToDos = async (db) => {
  const query = 'SELECT * FROM TODOLIST;';
  try {
    const results = await db.getAllAsync(query);
    return results;
  } catch (error) {
    console.error('❌ Error fetching ToDos:', error);
    throw error;
  }
};

// Delete a ToDo item by ID
export const deleteToDo = async (db, id) => {
  const query = 'DELETE FROM TODOLIST WHERE id = ?;';
  try {
    await db.runAsync(query, [id]);
    console.log('✅ ToDo deleted');
  } catch (error) {
    console.error('❌ Error deleting ToDo:', error);
    throw error;
  }
};

// Create Accounts table
export const createAccountsTable = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ACCOUNTS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  try {
    await db.execAsync(query);
    console.log('✅ Accounts table created');
  } catch (error) {
    console.error('❌ Error creating Accounts table:', error);
    throw error;
  }
};

// Insert an account
export const insertAccount = async (db, username, password) => {
  const query = `
    INSERT INTO ACCOUNTS (username, password)
    VALUES (?, ?);
  `;
  try {
    await db.runAsync(query, [username, password]);
    console.log('✅ Account inserted');
  } catch (error) {
    console.error('❌ Error inserting account:', error);
    throw error;
  }
};

// Find an account by username
export const findAccountByUsername = async (db, username) => {
  const query = 'SELECT * FROM ACCOUNTS WHERE username = ?;';
  try {
    const results = await db.getAllAsync(query, [username]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('❌ Error finding account:', error);
    throw error;
  }
};

// Update password by username
export const updatePasswordbyUsername = async (db, username, newPassword) => {
  const query = `
    UPDATE ACCOUNTS
    SET password = ?
    WHERE username = ?;
  `;
  try {
    await db.runAsync(query, [newPassword, username]);
    console.log('✅ Password updated');
  } catch (error) {
    console.error('❌ Error updating password:', error);
    throw error;
  }
};