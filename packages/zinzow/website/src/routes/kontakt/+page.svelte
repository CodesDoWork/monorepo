<script lang="ts">
    import type { PageData } from "./$types";
    import { PageContent } from "../../components/content-area";
    import { H1, H2 } from "../../components/heading";
    import { Icons } from "../../components/icons";
    import { Paragraphs, TextWithIcon } from "../../components/text";

    interface Props {
        // const center = [13.5461344, 53.7128988];
        data: PageData;
    }

    const { data }: Props = $props();
    const { texts, contact } = data;
</script>

<PageContent class="isolate">
    <div
        class="
        grid grid-cols-1
        lg:grid-cols-2
    ">
        <div
            class="
            mx-auto max-w-2xl
            lg:mx-0 lg:max-w-lg
        ">
            <H1>{texts.title}</H1>
            <Paragraphs text={texts.intro} />
            <dl class="mt-10 space-y-4">
                <TextWithIcon
                    href={`#${texts.findUs}`}
                    icon={Icons.Location}
                    iconContainerClass="pt-1">
                    {contact.name}<br />{contact.addressLine1}<br />{contact.addressLine2}
                </TextWithIcon>
                <TextWithIcon
                    href={`tel:${contact.tel}`}
                    icon={Icons.Phone}
                    iconContainerClass="pt-1">
                    {contact.tel}
                </TextWithIcon>
                <TextWithIcon
                    href={`mailto:${contact.email}`}
                    icon={Icons.Email}
                    iconContainerClass="pt-1">
                    {contact.email}
                </TextWithIcon>
            </dl>
        </div>
        <form action="#" method="POST" class="self-center pt-20">
            <div
                class="
                mx-auto max-w-2xl
                lg:mr-0 lg:max-w-lg
            ">
                <div
                    class="
                    grid grid-cols-1 gap-x-8 gap-y-3
                    sm:grid-cols-2
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
                                  block w-full rounded-md border-0 bg-white
                                  px-3.5 py-2 text-base text-gray-900 outline
                                  outline-1 -outline-offset-1 outline-gray-300
                                  focus:ring-0 focus:outline-2
                                  focus:-outline-offset-2
                                  focus:outline-(--primary)
                                  dark:bg-white/5 dark:text-white
                                  dark:outline-white/10
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
                                  block w-full rounded-md border-0 bg-white
                                  px-3.5 py-2 text-base text-gray-900 outline
                                  outline-1 -outline-offset-1 outline-gray-300
                                  focus:ring-0 focus:outline-2
                                  focus:-outline-offset-2
                                  focus:outline-(--primary)
                                  dark:bg-white/5 dark:text-white
                                  dark:outline-white/10
                                " />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
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
                                  block w-full rounded-md border-0 bg-white
                                  px-3.5 py-2 text-base text-gray-900 outline
                                  outline-1 -outline-offset-1 outline-gray-300
                                  focus:ring-0 focus:outline-2
                                  focus:-outline-offset-2
                                  focus:outline-(--primary)
                                  dark:bg-white/5 dark:text-white
                                  dark:outline-white/10
                                " />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
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
                                  block w-full rounded-md border-0 bg-white
                                  px-3.5 py-2 text-base text-gray-900 outline
                                  outline-1 -outline-offset-1 outline-gray-300
                                  focus:ring-0 focus:outline-2
                                  focus:-outline-offset-2
                                  focus:outline-(--primary)
                                  dark:bg-white/5 dark:text-white
                                  dark:outline-white/10
                                "></textarea>
                        </div>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <button
                        type="submit"
                        class="
                          rounded-md bg-(--primary) px-3.5 py-2.5 text-center
                          text-sm font-semibold text-white shadow-sm
                          hover:bg-(--primary-400)
                          focus-visible:outline focus-visible:outline-2
                          focus-visible:outline-offset-2
                          focus-visible:outline-(--primary)
                          dark:hover:bg-(--primary-600)
                        ">
                        {texts.send}
                    </button>
                </div>
            </div>
        </form>
        <div
            class="
            mt-20
            lg:col-span-2
        "
            id={texts.findUs}>
            <H2>{texts.findUs}</H2>
            <div class="w-full border">
                <p class="py-48 text-center">Map</p>
            </div>
        </div>
    </div></PageContent>
