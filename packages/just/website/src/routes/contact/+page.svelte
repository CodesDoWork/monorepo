<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { animationDelay } from "../../shared/animationDelay";

    interface Props {
        data: PageData;
        form: ActionData;
    }

    const { data, form }: Props = $props();
    const { socials } = data;

    const inputClass = clsx(
        "rounded p-2 shadow focus:shadow-md focus:outline-2",
        "outline outline-1 outline-stone-200 dark:outline-0 dark:outline-slate-500 dark:focus:outline-1",
        "placeholder:text-slate-400 dark:placeholder:text-slate-300",
        "bg-white transition dark:bg-opacity-10",
    );
</script>

<div class="grid grid-cols-1 gap-12 xl:gap-16 2xl:grid-cols-2">
    <div class="animate-fadeInSubtle opacity-0">
        <Heading level="h2">Let's Connect</Heading>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {#each socials as social, idx (idx)}
                <Card
                    style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`}
                    class="group border-l-4 border-[var(--hover-color)] outline-0 hover:border-l-8 hover:outline-0">
                    <Link
                        noStyle
                        class="grid w-full grid-cols-[auto_1fr] p-4 transition-all hover:pb-5 hover:pt-3 sm:p-5 sm:hover:pb-7 md:h-20 md:p-6 md:hover:pt-4 lg:hover:pt-3"
                        href={social.href}
                        title={social.title}>
                        <Icon
                            class="row-span-2 mr-4 h-8 w-8 transition-colors group-hover:text-[var(--hover-color)] sm:h-10 sm:w-10"
                            icon={social.icon} />
                        <Heading
                            commandStyle={false}
                            class="!mb-0 cursor-pointer !text-black group-hover:!text-[var(--hover-color)] dark:!text-white"
                            level="h5">{social.platform}</Heading>
                        <p
                            class="text-0 transition-fontSize h-0 text-slate-600 sm:group-hover:text-sm xl:group-hover:text-base dark:text-slate-300">
                            {social.name}
                        </p>
                    </Link>
                </Card>
            {/each}
        </div>
    </div>
    <div class="animate-fadeInSubtle flex flex-col opacity-0" style={animationDelay(2)}>
        <Heading level="h2">Send Message</Heading>
        <form
            action="?/mail"
            class="grid grow grid-cols-2 grid-rows-[auto_1fr_auto] gap-4"
            method="post"
            use:enhance>
            <input
                class={clsx(inputClass)}
                name="name"
                placeholder="Name"
                required
                type="text"
                value={form?.data?.name || ""} />
            <input
                class={clsx(inputClass)}
                name="email"
                placeholder="Email"
                required
                type="email"
                value={form?.data?.email || ""} />
            <textarea
                class={clsx(inputClass, "col-span-2 min-h-24")}
                name="message"
                placeholder="Message"
                required>{form?.data?.message || ""}</textarea>
            <button
                class={clsx(
                    inputClass,
                    "col-span-2 !bg-[var(--page-color)] text-white !outline-0 active:brightness-75",
                )}
                type="submit">
                Send
            </button>
            {#if form}
                <p class={clsx("col-span-2", form.success ? "text-green-500" : "text-error-500")}>
                    {form.msg}
                </p>
            {/if}
        </form>
    </div>
</div>
