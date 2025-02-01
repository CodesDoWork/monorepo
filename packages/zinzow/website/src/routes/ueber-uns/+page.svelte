<script lang="ts">
    import { AboutImage } from "../../components/about/about-image";
    import { ContentArea } from "../../components/content-area";
    import { H1, H2, H4 } from "../../components/heading";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { texts, about } = data;

    const images1 = about.images.slice(0, about.images.length / 2);
    const images2 = about.images.slice(about.images.length / 2, about.images.length);
</script>

<ContentArea class="isolate">
    <div class="py-16 lg:py-24">
        <div class="relative -z-10 overflow-hidden">
            <div
                class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:justify-between">
                <div class="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                    <H1>{about.title}</H1>
                    <p
                        class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                        {about.aboutText}
                    </p>
                </div>
                <div
                    class="mr-8 mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                    <div
                        class="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none">
                        {#each images1 as image}
                            <AboutImage src={image} />
                        {/each}
                    </div>
                    <div class="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-0">
                        {#each images2 as image}
                            <AboutImage src={image} />
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Content section -->
        <div class="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:mt-8">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <H2>{texts.ourMission}</H2>
                <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                    <div class="lg:w-full lg:max-w-2xl lg:flex-auto">
                        <p class="text-xl/8 text-gray-600">
                            {about.missionText}
                        </p>
                    </div>
                    <div class="lg:flex lg:flex-auto lg:justify-center">
                        <dl class="w-64 space-y-8 xl:w-80">
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base/7 text-gray-600">
                                    Transactions every 24 hours
                                </dt>
                                <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                                    44 million
                                </dd>
                            </div>
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base/7 text-gray-600">Assets under holding</dt>
                                <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                                    $119 trillion
                                </dd>
                            </div>
                            <div class="flex flex-col-reverse gap-y-4">
                                <dt class="text-base/7 text-gray-600">New users annually</dt>
                                <dd class="text-5xl font-semibold tracking-tight text-gray-900">
                                    46,000
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image section -->
        <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
            <img
                src={about.bannerImage}
                alt=""
                class="aspect-[5/2] w-full object-cover xl:rounded-3xl" />
        </div>

        <!-- Values section -->
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <H2>{texts.ourValues}</H2>
                <p class="mt-6 text-lg/8 text-gray-600">
                    {about.valuesText}
                </p>
            </div>
            <dl
                class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div>
                    <dt class="font-semibold text-gray-900">Be world-class</dt>
                    <dd class="mt-1 text-gray-600">
                        Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et
                        magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et.
                        Aliquid velit porro vero.
                    </dd>
                </div>
                <div>
                    <dt class="font-semibold text-gray-900">Share everything you know</dt>
                    <dd class="mt-1 text-gray-600">
                        Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci
                        illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur.
                        Quia quaerat minima.
                    </dd>
                </div>
                <div>
                    <dt class="font-semibold text-gray-900">Always learning</dt>
                    <dd class="mt-1 text-gray-600">
                        Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga
                        error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem
                        totam.
                    </dd>
                </div>
                <div>
                    <dt class="font-semibold text-gray-900">Be supportive</dt>
                    <dd class="mt-1 text-gray-600">
                        Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit
                        impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium
                        rerum error deserunt harum.
                    </dd>
                </div>
                <div>
                    <dt class="font-semibold text-gray-900">Take responsibility</dt>
                    <dd class="mt-1 text-gray-600">
                        Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur
                        dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas
                        perspiciatis error.
                    </dd>
                </div>
                <div>
                    <dt class="font-semibold text-gray-900">Enjoy downtime</dt>
                    <dd class="mt-1 text-gray-600">
                        Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut
                        quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur
                        distinctio.
                    </dd>
                </div>
            </dl>
        </div>

        <!-- Logo cloud -->
        <div class="relative isolate -z-10 mt-32 sm:mt-48">
            <div
                class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                <svg class="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
                    <defs>
                        <pattern
                            id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                            width="200"
                            height="200"
                            x="50%"
                            y="50%"
                            patternUnits="userSpaceOnUse"
                            patternTransform="translate(-100 0)">
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="50%" class="overflow-visible fill-gray-50">
                        <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" stroke-width="0" />
                    </svg>
                    <rect
                        width="100%"
                        height="100%"
                        stroke-width="0"
                        fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
                </svg>
            </div>
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 class="text-center text-lg/8 font-semibold text-gray-900">
                    Trusted by the world’s most innovative teams
                </h2>
                <div
                    class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img
                        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
                        alt="Transistor"
                        width="158"
                        height="48" />
                    <img
                        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
                        alt="Reform"
                        width="158"
                        height="48" />
                    <img
                        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
                        alt="Tuple"
                        width="158"
                        height="48" />
                    <img
                        class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
                        alt="SavvyCal"
                        width="158"
                        height="48" />
                    <img
                        class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
                        alt="Statamic"
                        width="158"
                        height="48" />
                </div>
            </div>
        </div>

        <!-- Team section -->
        <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <H2>{texts.ourTeam}</H2>
                <p class="mt-6 text-lg/8 text-gray-600">
                    {about.teamText}
                </p>
            </div>
            <ul
                role="list"
                class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
                <li>
                    <img
                        class="mx-auto size-24 rounded-full"
                        src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                        alt="" />
                    <H4 class="mt-6">Michael Foster</H4>
                    <p class="text-sm/6 text-gray-600">Co-Founder / CTO</p>
                </li>

                <!-- More people... -->
            </ul>
        </div>
    </div>
</ContentArea>
