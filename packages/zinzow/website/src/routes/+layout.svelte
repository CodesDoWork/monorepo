<script lang="ts">
    import type { JsonLdContext } from "@cdw/monorepo/shared-svelte-contexts";
    import type { BreadcrumbList, Thing } from "schema-dts";
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";
    import { setJsonLdContext, stringifyJsonLd } from "@cdw/monorepo/shared-svelte-contexts";
    import { createColors, createCssVariables } from "@cdw/monorepo/shared-utils/css/colors";
    import { clsx } from "clsx";
    import { blur } from "svelte/transition";
    import { Footer } from "../components/footer";
    import { Header } from "../components/header";
    import "../tailwind.css";

    interface Props {
        data: LayoutData;
        children?: Snippet;
    }

    const { data, children }: Props = $props();
    const { baseUrl, routes, settings, currentRoute, layoutJsonLd } = $derived(data);

    const colors = $derived(
        createColors({
            primary: settings.projectColor,
            logoBg: settings.logoBackgroundColor,
            bg: settings.backgroundColor,
        }),
    );

    const pageTitle = $derived(
        !currentRoute || currentRoute.name === "Home"
            ? settings.projectName
            : `${currentRoute.name} | ${settings.projectName}`,
    );
    const currentRouteUrl = $derived(currentRoute ? `${baseUrl}${currentRoute.path}` : undefined);
    const jsonLdContext = $state<JsonLdContext>({ things: [] });
    setJsonLdContext(jsonLdContext);
    const jsonLdGraph = $derived.by(() => {
        const websiteThings: Thing[] = [];
        if (currentRoute) {
            websiteThings.push({
                "@type": "WebSite",
                name: currentRoute.name,
                url: currentRouteUrl,
                inLanguage: "de",
            });

            const currentPath = currentRoute.path;
            const parentPath =
                currentPath.lastIndexOf("/") > 0
                    ? routes.find(r => r.path === currentPath.split("/").slice(0, -1).join("/"))
                    : null;

            const breadcrumbList: BreadcrumbList = {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: baseUrl,
                    },
                ],
            };

            if (currentPath !== "/") {
                (breadcrumbList.itemListElement as Thing[]).push({
                    "@type": "ListItem",
                    position: 2,
                    name: parentPath ? parentPath.name : currentRoute.name,
                    item: parentPath ? `${baseUrl}${parentPath.path}` : currentRouteUrl,
                });
            }

            if (parentPath) {
                (breadcrumbList.itemListElement as Thing[]).push({
                    "@type": "ListItem",
                    position: 3,
                    name: currentRoute.name,
                    item: currentRouteUrl,
                });
            }

            websiteThings.push(breadcrumbList);
        }

        return {
            ...layoutJsonLd,
            "@graph": [...layoutJsonLd["@graph"], ...websiteThings, ...jsonLdContext.things],
        };
    });
</script>

<svelte:head>
    <title>{pageTitle}</title>
    <meta name="robots" content={currentRoute ? "index,follow" : "noindex"} />
    <meta content="" name="keywords" />
    <meta content={baseUrl} property="og:url" />
    <meta name="theme-color" content="light-dark(white, black);" />
    {#if currentRoute}
        <link rel="canonical" href={currentRouteUrl} />
        <meta name="description" content={currentRoute.description} />
        <meta name="keywords" content={currentRoute.keywords.join(" ")} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={currentRoute.description} />
        <meta property="og:url" content={currentRouteUrl} />
        <meta property="og:site_name" content={settings.projectName} />
        {@html stringifyJsonLd(jsonLdGraph)}
    {/if}
</svelte:head>

<div
    style={createCssVariables(colors)}
    class="
        bg-bg
        dark:bg-bg-950
        relative grid min-h-screen grid-cols-1 grid-rows-[min-content_1fr_min-content]
        overflow-x-hidden
        dark:text-white
    ">
    <Header {routes} {currentRoute} />
    {#key currentRoute?.name}
        <main
            in:blur={{ duration: 100, opacity: 0, delay: 100 }}
            out:blur={{ duration: 100, opacity: 0 }}
            class={clsx(currentRoute?.isHero && `row-span-2 row-start-1`, "w-screen")}>
            {@render children?.()}
        </main>
    {/key}
    <Footer
        {currentRoute}
        copyright={settings.copyright}
        footerSections={data.footerSections}
        projectDescription={settings.projectDescription}
        socialMedias={data.socialMedias} />
</div>
