const Controller = require('egg').Controller;
const crypto = require('crypto');
const schema = require('../schema/schema');
const graphql = require('graphql');

class UserController extends Controller{
    async index() {
        // this.ctx.body = [
        //     {
        //         username: 'niu'
        //     }
        // ];// await this.ctx.service.user.getUserList();
    }

    async graphql() {
        console.log(this.ctx.request.body.params);
        graphql.graphql(schema, this.ctx.request.body.params).then(result => {
            this.ctx.body = result
        });
    }
    async graphql2() {
        console.log(this.ctx.query.query);
        graphql.graphql(schema, this.ctx.query.query).then(result => {
            this.ctx.body = result
        });
    }
}

module.exports = UserController;