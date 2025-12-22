<script lang="ts">
    import type { JsonLdContext } from "@cdw/monorepo/shared-utils/svelte/contexts/jsonld";
    import type { BreadcrumbList, Thing } from "schema-dts";
    import type { Snippet } from "svelte";
    import type { NavigationContext } from "../contexts/navigation";
    import type { LayoutData } from "./$types";
    import {
        setJsonLdContext,
        stringifyJsonLd,
    } from "@cdw/monorepo/shared-utils/svelte/contexts/jsonld";
    import { Footer } from "../components/footer";
    import { Header } from "../components/header";
    import { setNavigationContext } from "../contexts/navigation";
    import { createColors, createCssVariables } from "../utils/css";
    import "../tailwind.css";

    interface Props {
        data: LayoutData;
        children?: Snippet;
    }

    const { data, children }: Props = $props();
    const { baseUrl, routes, settings, currentRoute, layoutJsonLd } = $derived(data);

    const nav: NavigationContext = {
        get currentRoute() {
            return currentRoute;
        },
    };
    setNavigationContext(nav);

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
    <meta content="https://agrarservicenordost.de" property="og:url" />
    <meta name="theme-color" content="light-dark(white, black);" />
    {#if nav.currentRoute}
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
        bg-bg relative grid min-h-screen grid-rows-[min-content_1fr_min-content] overflow-x-hidden
        dark:bg-bg-950 dark:text-white
    ">
    <Header {routes} {currentRoute} />
    <main>
        {@render children?.()}
    </main>
    <Footer
        {currentRoute}
        copyright={settings.copyright}
        footerSections={data.footerSections}
        projectDescription={settings.projectDescription}
        socialMedias={data.socialMedias} />
</div>
