interface Translations {
    title: string;
    heading: string;
    description: string;
}

function setTexts(t: Translations) {
    const heading = document.getElementsByTagName("h1")[0];
    const description = document.getElementsByTagName("p")[0];
    document.title = t.title;
    heading && (heading.textContent = t.heading);
    description && (description.textContent = t.description);
}

const texts: Record<string, Translations> = {
    de: {
        title: "Wartungsarbeiten",
        heading: "🚧 Wir sind in Kürze zurück!",
        description: `
            Wir führen derzeit Wartungsarbeiten durch. Die Seite wird bald wieder verfügbar sein.
            Vielen Dank für Ihre Geduld!
        `,
    },
};

(function () {
    const lang = Object.keys(texts).find(navigator.language.startsWith);
    if (lang && texts[lang]) {
        setTexts(texts[lang]);
    }
})();
