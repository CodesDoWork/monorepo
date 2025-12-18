<script lang="ts">
    import type { LatLngExpression, MapOptions, MarkerOptions, TileLayerOptions } from "leaflet";
    import type { Component, Snippet } from "svelte";
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import { onMount } from "svelte";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { CheckboxWithLabel, InputWithLabel } from "../../components/form";
    import TextareaWithLabel from "../../components/form/TextareaWithLabel.svelte";
    import { H1, H2 } from "../../components/heading";
    import { Icons } from "../../components/icons";
    import { Paragraphs, TextWithIcon } from "../../components/text";
    import { normalizeAnchor } from "../../lib/common/normalize-anchor";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const {
        texts,
        name,
        addressLine1,
        addressLine2,
        tel,
        email,
        acceptPrivacyPolicy,
        coordinates,
        contactPhoto,
    } = $derived(data);

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
            sm:grid-cols-2 sm:grid-rows-[min-content_min-content_1fr_min-content]
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
                row-span-2 mx-auto w-full max-w-2xl pt-12
                lg:col-span-1 lg:mr-0 lg:max-w-lg
            ">
            <div
                class="
                    xs:grid-cols-2
                    grid grid-cols-1 gap-x-8 gap-y-3
                    lg:gap-y-6
                ">
                <InputWithLabel
                    id="firstName"
                    name="firstName"
                    required
                    type="text"
                    autocomplete="given-name"
                    label={texts.firstName} />
                <InputWithLabel
                    id="lastName"
                    name="lastName"
                    required
                    type="text"
                    autocomplete="family-name"
                    label={texts.lastName} />
                <InputWithLabel
                    id="email"
                    name="email"
                    required
                    type="email"
                    autocomplete="email"
                    label={texts.email}
                    class="xs:col-span-2" />
                <TextareaWithLabel
                    id="message"
                    name="message"
                    required
                    rows={7}
                    label={texts.message}
                    class="xs:col-span-2" />
                <CheckboxWithLabel id="privacy" name="privacy" class="xs:col-span-2">
                    {@html acceptPrivacyPolicy}
                </CheckboxWithLabel>
                <InputWithLabel
                    id="attachments"
                    name="attachments"
                    type="file"
                    label="Anhang"
                    multiple />
                <button
                    type="submit"
                    class={clsx(
                        stylesMap.button,
                        `
                            xs:col-start-2 xs:-mt-4
                            place-self-end
                        `,
                    )}>
                    {texts.send}
                </button>
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
