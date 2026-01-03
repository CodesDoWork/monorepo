<script lang="ts">
    import type { ActionData, PageData } from "./$types";
    import { enhance } from "$app/forms";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { H2, Link, P } from "../../components/texts";
    import SocialCards from "./SocialCards.svelte";

    interface Props {
        data: PageData;
        form: ActionData;
    }

    const { data, form }: Props = $props();
    const { socials, texts, privacyPolicyRoute, jsonLdThings } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));
    const { false: mainSocials, true: seeMoreSocials } = $derived(
        Object.groupBy(socials, s => s.isSeeMore.toString()),
    );

    const inputClass = clsx(
        `
            rounded-md border-0 bg-white p-2 shadow outline outline-stone-200 transition
            placeholder:text-slate-400
            focus:shadow-md focus:outline-2
            dark:bg-white/10 dark:outline-0 dark:outline-slate-500 dark:placeholder:text-slate-300
            dark:focus:outline-1
        `,
    );
</script>

<div
    class="
        grid grid-cols-1 gap-12
        xl:gap-16
        2xl:grid-cols-2
    ">
    <div class="row-span-2">
        <section class="animate-fadeInSubtle opacity-0">
            <H2>{texts.letsConnect}</H2>
            <SocialCards socials={mainSocials} />
        </section>
        <section class="animate-fadeInSubtle opacity-0">
            <H2>{texts.seeMore}</H2>
            <SocialCards socials={seeMoreSocials} />
        </section>
    </div>
    <section class="animate-fadeInSubtle flex flex-col opacity-0" style={animationDelay(2)}>
        <H2>{texts.sendMessage}</H2>
        <form
            action="?/mail"
            class="grid grow grid-cols-2 grid-rows-[auto_1fr_auto] gap-4"
            method="post"
            use:enhance>
            <input
                class={clsx(
                    inputClass,
                    `
                        col-span-2
                        sm:col-span-1
                    `,
                )}
                name="name"
                placeholder={texts.name}
                required
                type="text"
                value={form?.data?.name || ""} />
            <input
                class={clsx(
                    inputClass,
                    `
                        col-span-2
                        sm:col-span-1
                    `,
                )}
                name="email"
                placeholder={texts.email}
                required
                type="email"
                value={form?.data?.email || ""} />
            <textarea
                class={clsx(inputClass, "col-span-2")}
                rows="9"
                name="message"
                placeholder={texts.message}
                required>{form?.data?.message || ""}</textarea>
            <div class="col-span-2">
                <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    class={clsx(inputClass, "focus:ring-0 focus:ring-offset-0")}
                    value={form?.data?.privacy || false}
                    required />
                <label for="privacy" class="ml-1">
                    {texts.acceptPrivacy}
                    <Link
                        title={privacyPolicyRoute.shortDescription}
                        href={privacyPolicyRoute.route}>
                        {privacyPolicyRoute.name}
                    </Link>{texts.acceptPrivacyTail}
                </label>
            </div>
            <button
                class={clsx(
                    `
                        bg-pageColor col-span-2 cursor-pointer rounded-md p-2 text-white shadow-sm
                        transition-[background,box-shadow]
                        hover:bg-pageColor-600 hover:shadow-md
                        active:brightness-75
                    `,
                )}
                type="submit">
                {texts.send}
            </button>
            {#if form}
                <P class={clsx("col-span-2", form.success ? "text-green-500!" : "text-error-500!")}>
                    {form.msg}
                </P>
            {/if}
        </form>
    </section>
</div>
