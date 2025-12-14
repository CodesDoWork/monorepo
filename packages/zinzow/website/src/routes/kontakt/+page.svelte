<script lang="ts">
    import type { LatLngExpression, MapOptions, MarkerOptions, TileLayerOptions } from "leaflet";
    import type {} from "sveaflet";
    import type { Component, Snippet } from "svelte";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H1, H2 } from "../../components/heading";
    import { Icons } from "../../components/icons";
    import { Paragraphs, TextWithIcon } from "../../components/text";
    import { normalizeAnchor } from "../../lib/common/normalize-anchor";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { texts, name, addressLine1, addressLine2, tel, email, coordinates, contactPhoto } =
        $derived(data);

    const mapAnchor = $derived(normalizeAnchor(texts.findUs));

    let Map: Component<{ options: MapOptions; children?: Snippet }> | null = $state(null);
    let TileLayer: Component<{ url: string; options: TileLayerOptions }> | null = $state(null);
    let Marker: Component<{ latLng: LatLngExpression; options?: MarkerOptions }> | null =
        $state(null);

    onMount(async () => {
        const sveaflet = await import("sveaflet");
        Map = sveaflet.Map;
        TileLayer = sveaflet.TileLayer;
        Marker = sveaflet.Marker;
    });
</script>

<WidthBox class="isolate">
    <div
        class="
            xs:grid-cols-[65%_35%]
            grid grid-cols-1
            sm:grid-cols-2
        ">
        <H1 class="xs:col-span-2">{texts.title}</H1>
        <div class="lg:max-w-lg">
            <Paragraphs text={texts.intro} />
            <dl class="mt-10 space-y-4">
                <TextWithIcon
                    href={`#${mapAnchor}`}
                    icon={Icons.Location}
                    iconContainerClass="pt-1">
                    {name}<br />{addressLine1}<br />{addressLine2}
                </TextWithIcon>
                <TextWithIcon href={`tel:${tel}`} icon={Icons.Phone} iconContainerClass="pt-1">
                    {tel}
                </TextWithIcon>
                <TextWithIcon href={`mailto:${email}`} icon={Icons.Email} iconContainerClass="pt-1">
                    {email}
                </TextWithIcon>
            </dl>
        </div>
        <form
            action="#"
            method="POST"
            class="
                xs:col-span-2
                row-span-2 pt-12
                lg:col-span-1
            ">
            <div
                class="
                    mx-auto max-w-2xl
                    lg:mr-0 lg:max-w-lg
                ">
                <div
                    class="
                        xs:grid-cols-2
                        grid grid-cols-1 gap-x-8 gap-y-3
                        lg:gap-y-6
                    ">
                    <div>
                        <label
                            for="firstName"
                            class="
                                block text-sm/6 font-semibold text-gray-900
                                dark:text-white
                            ">
                            {texts.firstName}
                        </label>
                        <div class="mt-2.5">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autocomplete="given-name"
                                class="
                                    block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base
                                    text-gray-900 outline -outline-offset-1 outline-gray-300
                                    focus:ring-0 focus:outline-2 focus:-outline-offset-2
                                    focus:outline-(--primary)
                                    dark:bg-white/5 dark:text-white dark:outline-white/10
                                " />
                        </div>
                    </div>
                    <div>
                        <label
                            for="lastName"
                            class="
                                block text-sm/6 font-semibold text-gray-900
                                dark:text-white
                            ">
                            {texts.lastName}
                        </label>
                        <div class="mt-2.5">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autocomplete="family-name"
                                class="
                                    block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base
                                    text-gray-900 outline -outline-offset-1 outline-gray-300
                                    focus:ring-0 focus:outline-2 focus:-outline-offset-2
                                    focus:outline-(--primary)
                                    dark:bg-white/5 dark:text-white dark:outline-white/10
                                " />
                        </div>
                    </div>
                    <div class="xs:col-span-2">
                        <label
                            for="email"
                            class="
                                block text-sm/6 font-semibold text-gray-900
                                dark:text-white
                            ">
                            {texts.email}
                        </label>
                        <div class="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autocomplete="email"
                                class="
                                    block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base
                                    text-gray-900 outline -outline-offset-1 outline-gray-300
                                    focus:ring-0 focus:outline-2 focus:-outline-offset-2
                                    focus:outline-(--primary)
                                    dark:bg-white/5 dark:text-white dark:outline-white/10
                                " />
                        </div>
                    </div>
                    <div class="xs:col-span-2">
                        <label
                            for="message"
                            class="
                                block text-sm/6 font-semibold text-gray-900
                                dark:text-white
                            ">
                            {texts.message}
                        </label>
                        <div class="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                class="
                                    block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base
                                    text-gray-900 outline -outline-offset-1 outline-gray-300
                                    focus:ring-0 focus:outline-2 focus:-outline-offset-2
                                    focus:outline-(--primary)
                                    dark:bg-white/5 dark:text-white dark:outline-white/10
                                "></textarea>
                        </div>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <button
                        type="submit"
                        class="
                            rounded-md bg-(--primary) px-3.5 py-2.5 text-center text-sm
                            font-semibold text-white shadow-sm
                            hover:bg-(--primary-400)
                            focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-(--primary)
                            dark:hover:bg-(--primary-600)
                        ">
                        {texts.send}
                    </button>
                </div>
            </div>
        </form>
        <DirectusImage
            img={contactPhoto}
            imgClass="rounded-lg shadow-md"
            class="
                xs:col-2 xs:row-2 xs:mt-20 xs:h-40
                mx-auto mt-16 aspect-square h-56
                sm:mt-16 sm:h-48
                md:mx-0 md:mt-8 md:h-56
                lg:col-auto lg:row-auto lg:mt-16 lg:h-80
            " />
        <div
            class="
                xs:col-span-2
                mt-20
            "
            id={mapAnchor}>
            <H2>{texts.findUs}</H2>
            <div class="h-160 max-h-[75vh] w-full overflow-hidden rounded-lg shadow-md">
                {#if Map}
                    <Map options={{ center: coordinates, zoom: 15 }}>
                        <TileLayer
                            url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                            options={{
                                minZoom: 7,
                                maxZoom: 18,
                                maxNativeZoom: 18,
                                attribution:
                                    "© <a href='https://www.openstreetmap.org/copyright' target='_blank' rel='noopener noreferrer'>OpenStreetMap contributors</a>",
                            }} />
                        <Marker latLng={coordinates} />
                    </Map>
                {/if}
            </div>
        </div>
    </div>
</WidthBox>
