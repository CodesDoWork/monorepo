<script lang="ts">
    import Icon from "@iconify/svelte";
    import { ContentArea } from "../../components/content-area";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { currentRoute, texts, contact } = data;
</script>

<ContentArea>
    <div class="grid grid-cols-1 py-16 lg:grid-cols-2 lg:py-24">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
            <h1
                class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                {texts.title}
            </h1>
            <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                {$currentRoute.welcomeText}
            </p>
            <dl class="mt-10 space-y-4 text-base/7 text-gray-600 dark:text-gray-300">
                <div class="flex gap-x-4">
                    <dt class="flex-none pt-1">
                        <Icon icon="humbleicons:location" class="size-6 text-gray-400" />
                    </dt>
                    <dd>
                        {contact.name}<br />{contact.addressLine1}<br />{contact.addressLine2}
                    </dd>
                </div>
                <div class="group flex w-fit gap-x-4">
                    <dt class="flex-none pt-1">
                        <Icon
                            icon="ri:phone-line"
                            class="size-6 text-gray-400 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </dt>
                    <dd>
                        <a
                            class="transition-colors group-hover:text-gray-900 dark:group-hover:text-white"
                            href={`tel:${contact.tel}`}>{contact.tel}</a>
                    </dd>
                </div>
                <div class="group flex w-fit gap-x-4">
                    <dt class="flex-none pt-1">
                        <Icon
                            icon="material-symbols:mail-outline"
                            class="size-6 text-gray-400 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </dt>
                    <dd>
                        <a
                            class="transition-colors group-hover:text-gray-900 dark:group-hover:text-white"
                            href={`mailto:${contact.email}`}>{contact.email}</a>
                    </dd>
                </div>
            </dl>
        </div>
        <form action="#" method="POST" class="self-center pt-20">
            <div class="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
                <div class="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:gap-y-6">
                    <div>
                        <label
                            for="firstName"
                            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                            >{texts.firstName}</label>
                        <div class="mt-2.5">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autocomplete="given-name"
                                class="focus:outline-primary-600 block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-0 dark:bg-white/5 dark:text-white dark:outline-white/10" />
                        </div>
                    </div>
                    <div>
                        <label
                            for="lastName"
                            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                            >{texts.lastName}</label>
                        <div class="mt-2.5">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autocomplete="family-name"
                                class="focus:outline-primary-600 block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-0 dark:bg-white/5 dark:text-white dark:outline-white/10" />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label
                            for="email"
                            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                            >{texts.email}</label>
                        <div class="mt-2.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autocomplete="email"
                                class="focus:outline-primary-600 block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-0 dark:bg-white/5 dark:text-white dark:outline-white/10" />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label
                            for="message"
                            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
                            >{texts.message}</label>
                        <div class="mt-2.5">
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                class="focus:outline-primary-600 block w-full rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:ring-0 dark:bg-white/5 dark:text-white dark:outline-white/10"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <button
                        type="submit"
                        class="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >{texts.send}</button>
                </div>
            </div>
        </form>
        <div class="mt-20 lg:col-span-2">
            <h2
                class="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {texts.findUs}
            </h2>
            <div class="mt-6 w-full border">
                <p class="py-48 text-center">Map</p>
            </div>
        </div>
    </div>
</ContentArea>
