<script lang="ts">
    import type { LatLngExpression, MapOptions, MarkerOptions, TileLayerOptions } from "leaflet";
    import type { Component, Snippet } from "svelte";
    import type { ActionData, PageData } from "./$types";
    import { enhance } from "$app/forms";
    import { clsx } from "clsx";
    import { onMount } from "svelte";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { CheckboxWithLabel, InputWithLabel } from "../../components/form";
    import FileInputWithLabel from "../../components/form/FileInputWithLabel.svelte";
    import TextareaWithLabel from "../../components/form/TextareaWithLabel.svelte";
    import { H1, H2 } from "../../components/heading";
    import { Icons } from "../../components/icons";
    import { Paragraphs, TextWithIcon } from "../../components/text";
    import { normalizeAnchor } from "../../lib/common/normalize-anchor";
    import { stylesMap } from "../../lib/common/styles";

    interface Props {
        data: PageData;
        form?: ActionData;
    }

    const { data, form }: Props = $props();
    const {
        texts,
        title,
        intro,
        name,
        addressLine1,
        addressLine2,
        tel,
        email,
        acceptPrivacyPolicy,
        findUs,
        coordinates,
        contactPhoto,
    } = $derived(data);

    const mapAnchor = $derived(normalizeAnchor(findUs));

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

    const attachmentsId = "attachments";
    let mailLoading = $state(false);
</script>

<WidthBox class="isolate">
    <div
        class="
            xs:grid-cols-[65%_35%]
            grid grid-cols-1
            sm:grid-cols-2 sm:grid-rows-[min-content_min-content_1fr_min-content]
        ">
        <H1 class="xs:col-span-2">{title}</H1>
        <div class="lg:max-w-lg">
            <Paragraphs text={intro} />
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
            action="?/mail"
            method="POST"
            enctype="multipart/form-data"
            onsubmit={() => (mailLoading = true)}
            use:enhance={() => {
                return async ({ update, formData }) => {
                    await update();
                    mailLoading = false;
                    const files = formData.getAll(attachmentsId) as File[];
                    const e = document.getElementById(attachmentsId) as HTMLInputElement;
                    const dt = new DataTransfer();
                    if (!form?.success) {
                        files.forEach(file => dt.items.add(file));
                    }
                    e.files = dt.files;
                    e.dispatchEvent(new Event("change", { bubbles: true }));
                };
            }}
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
                    label={texts.firstName}
                    value={form?.data?.firstName}
                    errors={form?.errors?.firstName?.errors} />
                <InputWithLabel
                    id="lastName"
                    name="lastName"
                    required
                    type="text"
                    autocomplete="family-name"
                    label={texts.lastName}
                    value={form?.data?.lastName}
                    errors={form?.errors?.lastName?.errors} />
                <InputWithLabel
                    id="email"
                    name="email"
                    required
                    type="email"
                    autocomplete="email"
                    label={texts.email}
                    class="xs:col-span-2"
                    value={form?.data?.email}
                    errors={form?.errors?.email?.errors} />
                <TextareaWithLabel
                    id="message"
                    name="message"
                    required
                    rows={7}
                    label={texts.message}
                    value={form?.data?.message}
                    errors={form?.errors?.message?.errors}
                    class="xs:col-span-2" />
                <CheckboxWithLabel
                    id="privacy"
                    name="privacy"
                    class="xs:col-span-2"
                    required
                    checked={form?.data?.privacy}
                    errors={form?.errors?.privacy?.errors}>
                    {@html acceptPrivacyPolicy}
                </CheckboxWithLabel>
                <FileInputWithLabel
                    id={attachmentsId}
                    name={attachmentsId}
                    label="Anhang"
                    multiple
                    chooseText={texts.chooseFiles}
                    fileChosenText={texts.fileChosen}
                    filesChosenText={texts.filesChosen}
                    dropFilesText={texts.dropFiles}
                    errors={form?.errors?.attachments?.errors} />
                <button
                    type="submit"
                    disabled={mailLoading}
                    class={clsx(
                        stylesMap.button,
                        mailLoading &&
                            `
                                bg-primary-400
                                dark:bg-primary-600
                            `,
                        `
                            xs:col-start-2 xs:-mt-4
                            place-self-end
                        `,
                    )}>
                    {mailLoading ? texts.sending : texts.send}
                </button>
                {#if form?.success}
                    <p
                        class="
                            xs:col-span-2
                            font-semibold text-green-600
                        ">
                        {texts.messageSent}
                    </p>
                {/if}
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
            <H2>{findUs}</H2>
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
