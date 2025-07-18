import type { CardDesignTokens } from '@primeng/themes/types/card';

export default {
    root: {
        background: "{content.background}",
        borderRadius: "{border.radius.xl}",
        color: "{content.color}",
        // shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
        shadow: '0 0 0 1px #d1d5db, 0 2px 6px rgba(0,0,0,0.1)',
    },
    body: {
        padding: "1.25rem",
        gap: "0.5rem"
    },
    caption: {
        gap: "0.5rem"
    },
    title: {
        fontSize: "1.25rem",
        fontWeight: "500"
    },
    subtitle: {
        color: "{text.muted.color}"
    }
} satisfies CardDesignTokens;
