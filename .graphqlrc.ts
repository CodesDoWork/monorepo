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
        "just-cms-dashboard-config-graphql-default": {
            schema: [
                "packages/just/cms/dashboard-config/src/graphql/default/generated/graphql.schema.json",
            ],
            documents: ["packages/just/cms/dashboard-config/src/**/*.default.graphql"],
        },
        "just-cms-dashboard-config-graphql-system": {
            schema: [
                "packages/just/cms/dashboard-config/src/graphql/system/generated/graphql.schema.json",
            ],
            documents: ["packages/just/cms/dashboard-config/src/**/*.system.graphql"],
        },
        "just-music-marketplace-graphql-default": {
            schema: [
                "packages/just/music/marketplace/src/graphql/default/generated/graphql.schema.json",
            ],
            documents: ["packages/just/music/marketplace/src/**/*.default.graphql"],
        },
        "just-music-marketplace-graphql-system": {
            schema: [
                "packages/just/music/marketplace/src/graphql/system/generated/graphql.schema.json",
            ],
            documents: ["packages/just/music/marketplace/src/**/*.system.graphql"],
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
