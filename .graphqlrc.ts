export default {
    projects: {
        "zinzow-website-graphql-default": {
            schema: ["packages/zinzow/website/src/graphql/default/generated/graphql.schema.json"],
            documents: ["packages/zinzow/website/src/**/*.default.graphql"],
        },
        "zinzow-website-graphql-system": {
            schema: ["packages/zinzow/website/src/graphql/system/generated/graphql.schema.json"],
            documents: ["packages/zinzow/website/src/**/*.system.graphql"],
        },
    },
};
