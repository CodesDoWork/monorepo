import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                onPrimary: colors.white,
                error: colors.red,
            },
        },
    },
};
