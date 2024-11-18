<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import Page from "../../components/Page.svelte";
    import Heading from "../../components/Heading.svelte";
    import Card from "../../components/Card.svelte";
    import Link from "../../components/Link.svelte";
    import { enhance } from "$app/forms";
    import { clsx } from "clsx";
    import Icon from "@iconify/svelte";
    import { animationDelay } from "../../helpers/animationDelay";

    export let data: PageData;
    export let form: ActionData;

    const { siteInfo, routes } = data;
    const { socials } = siteInfo;

    const inputClass = clsx(
        "p-2 rounded shadow focus:shadow-md focus:outline-2",
        "outline outline-1 outline-stone-200 dark:outline-slate-500 dark:outline-0 dark:focus:outline-1",
        "placeholder:text-slate-400 dark:placeholder:text-slate-300",
        "bg-white dark:bg-opacity-10 transition",
    );
</script>

<Page routes={routes} siteInfo={siteInfo} title={{title: "Contact", small: true}}>
    <div class="grid grid-cols-1 2xl:grid-cols-2 gap-12 xl:gap-16">
        <div class="animate-fadeInSubtle opacity-0">
            <Heading level="h2">Let's Connect</Heading>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {#each socials as social, idx (idx)}
                    <Card style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`}
                          class="group border-l-4 hover:border-l-8 border-[var(--hover-color)] outline-0 hover:outline-0">
                        <Link
                            noStyle
                            class="p-4 sm:p-5 md:p-6 md:h-20 w-full hover:pt-3 hover:pb-5 sm:hover:pb-7 md:hover:pt-4 lg:hover:pt-3 transition-all grid grid-cols-[auto_1fr]"
                            href={social.href}
                            title={social.title}>
                            <Icon
                                class="w-8 h-8 sm:w-10 sm:h-10 row-span-2 mr-4 transition-colors group-hover:text-[var(--hover-color)]"
                                icon={social.icon} />
                            <Heading commandStyle={false}
                                     class="cursor-pointer !mb-0 !text-black dark:!text-white group-hover:!text-[var(--hover-color)]"
                                     level="h5">{social.platform}</Heading>
                            <p class="text-0 h-0 text-slate-600 dark:text-slate-300 sm:group-hover:text-sm xl:group-hover:text-base transition-fontSize">{social.name}</p>
                        </Link>
                    </Card>
                {/each}
            </div>
        </div>
        <div class="animate-fadeInSubtle opacity-0 flex flex-col" style={animationDelay(2)}>
            <Heading level="h2">Send Message</Heading>
            <form action="?/mail"
                  class="grid grid-cols-2 gap-4 grow grid-rows-[auto_1fr_auto]"
                  method="post"
                  use:enhance>
                <input class={clsx(inputClass)}
                       name="name"
                       placeholder="Name"
                       required
                       type="text"
                       value={form?.data?.name || ""} />
                <input class={clsx(inputClass)}
                       name="email"
                       placeholder="Email"
                       required
                       type="email"
                       value={form?.data?.email || ""} />
                <textarea class={clsx(inputClass, "col-span-2 min-h-24")}
                          name="message"
                          placeholder="Message"
                          required>{form?.data?.message || ""}</textarea>
                <button
                    class={clsx(inputClass, "col-span-2 !bg-[var(--page-color)] !outline-0 text-white active:brightness-75")}
                    type="submit">Send
                </button>
                {#if form}
                    <p class={clsx("col-span-2", form.success ? "text-green-500" : "text-error-500" )}>{form.msg}</p>
                {/if}
            </form>
        </div>
    </div>
</Page>
