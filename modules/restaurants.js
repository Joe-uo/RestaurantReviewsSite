
/** @module Restaurants */

import sqlite from 'sqlite-async'

/**
 * Restaurants
 * ES6 module that manages the restaurants.
 */

class Restaurants {
	/**
   * Create an account object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS restaurants(\
				id INTEGER PRIMARY KEY AUTOINCREMENT,\
				userid INTEGER,\
				photo TEXT,\
				name TEXT NOT NULL,\
				address TEXT NOT NULL,\
				FOREIGN KEY(userid) REFERENCES users(id)\
			);'
			await this.db.run(sql)
			return this
		})()
	}

	/**
	 * retrieves all restaurants in the system
	 * @returns {Array} returns an array containing all the restaurants in the database 
	 */
	async all() {
		const sql = 'SELECT users.user, restaurants.* FROM restaurants, users\
					WHERE restaurants.userid = users.id;'
		const restaurants = await this.db.all(sql)
		for(const index in restaurants){
			const badAddress = new String(restaurants[index].address)
			const formatAddress = badAddress.split(",").join("<br />")
			restaurants[index].address = formatAddress
		}
		return restaurants
	}
}

export default Restaurants