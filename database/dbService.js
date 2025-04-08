import * as SQLite from 'expo-sqlite';

export const getDatabaseConnection = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('to-do-list-data.db');
    return db;
  } catch (error) {
    throw error;
  }
};

// to do related
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
  } catch (error) {
    throw error;
  }
};

export const insertToDo = async (db, { title, details, isDone = 0 }) => {
  const query = `
    INSERT INTO TODOLIST (title, details, isDone)
    VALUES (?, ?, ?);
  `;
  try {
    await db.runAsync(query, [title, details, isDone]);
  } catch (error) {
    throw error;
  }
};

export const getAllToDos = async (db) => {
  const query = 'SELECT * FROM TODOLIST;';
  try {
    const results = await db.getAllAsync(query);
    return results;
  } catch (error) {
    throw error;
  }
};

export const deleteToDo = async (db, id) => {
  const query = 'DELETE FROM TODOLIST WHERE id = ?;';
  try {
    await db.runAsync(query, [id]);
  } catch (error) {
    throw error;
  }
};


// account related
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
  } catch (error) {
    throw error;
  }
};

export const insertAccount = async (db, username, password) => {
  const query = `
    INSERT INTO ACCOUNTS (username, password)
    VALUES (?, ?);
  `;
  try {
    await db.runAsync(query, [username, password]);
  } catch (error) {
    throw error;
  }
};

export const findAccountByUsername = async (db, username) => {
  const query = 'SELECT * FROM ACCOUNTS WHERE username = ?;';
  try {
    const results = await db.getAllAsync(query, [username]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordbyUsername = async (db, username, newPassword) => {
  const query = `
    UPDATE ACCOUNTS
    SET password = ?
    WHERE username = ?;
  `;
  try {
    await db.runAsync(query, [newPassword, username]);
  } catch (error) {
    throw error;
  }
};