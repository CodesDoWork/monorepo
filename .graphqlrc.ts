export default {
    projects: {
        "just-website-graphql-default": {
            schema: ["packages/just/website/src/graphql/default/generated/graphql.schema.json"],
            documents: ["packages/just/website/src/**/*.default.graphql"],
        },
        "just-website-graphql-system": {
            schema: ["packages/just/website/src/graphql/system/generated/graphql.schema.json"],
            documents: ["packages/just/website/src/**/*.system.graphql"],
        },
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
