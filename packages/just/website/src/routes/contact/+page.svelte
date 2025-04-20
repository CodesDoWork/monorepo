<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import { enhance } from "$app/forms";
    import { clsx } from "clsx";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { addJsonLdThings } from "../../contexts/jsonld";
    import { animationDelay } from "../../shared/animationDelay";
    import SocialCards from "./SocialCards.svelte";

    interface Props {
        data: PageData;
        form: ActionData;
    }

    const { data, form }: Props = $props();
    const { socials, texts, privacyPolicyRoute, jsonLdThings } = data;
    addJsonLdThings(jsonLdThings);
    const socialGroups = Object.groupBy(socials, s => s.isSeeMore.toString());
    const mainSocials = socialGroups.false;
    const seeMoreSocials = socialGroups.true;

    const inputClass = clsx(
        "border-0",
        "rounded p-2 shadow focus:shadow-md focus:outline-2",
        "outline outline-1 outline-stone-200 dark:outline-0 dark:outline-slate-500 dark:focus:outline-1",
        "placeholder:text-slate-400 dark:placeholder:text-slate-300",
        "bg-white transition dark:bg-opacity-10",
    );
</script>

<div class="grid grid-cols-1 gap-12 xl:gap-16 2xl:grid-cols-2">
    <section class="animate-fadeInSubtle opacity-0">
        <Heading level="h2">{texts.letsConnect}</Heading>
        <SocialCards socials={mainSocials} />
    </section>
    <section class="row-start-2 animate-fadeInSubtle opacity-0">
        <Heading level="h2">{texts.seeMore}</Heading>
        <SocialCards socials={seeMoreSocials} />
    </section>
    <section class="animate-fadeInSubtle flex flex-col opacity-0" style={animationDelay(2)}>
        <Heading level="h2">{texts.sendMessage}</Heading>
        <form
            action="?/mail"
            class="grid grow grid-cols-2 grid-rows-[auto_1fr_auto] gap-4"
            method="post"
            use:enhance>
            <input
                class={clsx(inputClass)}
                name="name"
                placeholder={texts.name}
                required
                type="text"
                value={form?.data?.name || ""} />
            <input
                class={clsx(inputClass)}
                name="email"
                placeholder={texts.email}
                required
                type="email"
                value={form?.data?.email || ""} />
            <textarea
                class={clsx(inputClass, "col-span-2 min-h-24")}
                name="message"
                placeholder={texts.message}
                required>{form?.data?.message || ""}</textarea>
            <div>
                <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    class={clsx(inputClass, "focus:ring-0 focus:ring-offset-0")}
                    value={form?.data?.privacy || false}
                    required />
                <label for="privacy" class="ml-1">
                    {texts.acceptPrivacy}
                    <Link title={privacyPolicyRoute.description} href={privacyPolicyRoute.route}>
                        {privacyPolicyRoute.name}
                    </Link>{texts.acceptPrivacyTail}
                </label>
            </div>
            <button
                class={clsx(
                    inputClass,
                    "col-span-2 !bg-[var(--page-color)] text-white !outline-0 active:brightness-75",
                )}
                type="submit">
                {texts.send}
            </button>
            {#if form}
                <p class={clsx("col-span-2", form.success ? "text-green-500" : "text-error-500")}>
                    {form.msg}
                </p>
            {/if}
        </form>
    </section>
</div>
