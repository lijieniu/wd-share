'use strict';
const Base = require('./base');
module.exports = class MySQLDB extends Base {
    constructor(db) {
        super(db);
        this.db = db;
    }
    async getPager(name, query) {
        // console.log(query);
        // let result = await this.db.select(name);
        console.log(query);
        let sql = `select * from ${name}`;
        if(Object.keys(query.like).length > 0) {
            sql += ` where `;
            Object.keys(query.like).forEach((item, index) => {
                sql += `${item} like '%${query.like[item]}%'`;
                if(index !== (Object.keys(query.like).length - 1)) {
                    sql += ' and ';
                }
            });
        }
        sql += ` order by ${query.orderByField} ${query.orderBy}`;
        sql += ` limit ${(query._pageIndex - 1) * query._pageSize}, ${query._pageSize}`;
        console.log(sql);
        
        let result = await this.db.query(sql);
        return result;
    }
    async add(name, entity) {
        let result = await this.db.insert(name, entity);
        return result.affectedRows === 1;
    }
    async query(name, query) {
        let result = await this.db.get(name, query.where);
        return result;
    }
    async update(name, where, entity) {
        let result = await this.db.update(name, entity, {where: where});
        return result.affectedRows === 1;
    }
    async get(name) {
        let result = await this.db.select(name);
        return result;
    }
    async delete(name, field) {
        let result = await this.db.delete(name, field);
        return result;
    }
};
