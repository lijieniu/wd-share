const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString
} = require('graphql');

let count = 0;
let product = {
    '1': {
        id: '1',
        productName: '洗发水',
        brandName: '资生堂',
        price: '50'
    },
    '2': {
        id: '2',
        productName: '防晒霜',
        brandName: '资生堂',
        price: '20'
    }
};
let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            count: {
                type: GraphQLInt,
                resolve: function() {
                    return count;
                }
            }
        }
    })
});

let ItemType = new GraphQLObjectType({
    name: 'item',
    description: 'item',
    fields: {
        id: {
            type: GraphQLString,
            description: 'item id'
        },
        brandName: {
            type: GraphQLString,
            description: 'item brand'
        },
        productName: {
            type: GraphQLString,
            description: 'item name'
        },
        price: {
            type: GraphQLInt,
            description: 'item price'
        }
    }
});
let ItemSchema = new GraphQLSchema({
    query: new GraphQLObjectType ({
        name: 'ItemQuery',
        description: 'query item',
        fields: {
            item: {
                type: ItemType,
                description: 'item',
                args: {
                    id: {
                        type: GraphQLInt,
                        required: false
                    }
                },
                resolve: function(_, args) {
                    console.log(args);
                    return product[args.id];
                }
            }
        }
    })
});

module.exports = ItemSchema;