import type { CardDesignTokens } from '@primeng/themes/types/card';

export default {
    root: {
        background: "{content.background}",
        // background: "{colors.surface.card}",
        borderRadius: "{border.radius.xl}",
        // borderRadius: "{spacing.3}",
        color: "{content.color}",
        // color: "{colors.text.primary}",
        // shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
        shadow: '0 0 0 1px #d1d5db, 0 2px 6px rgba(0,0,0,0.1)',
        // using global shadow tokens
        // shadow: "{shadows.sm}"
    },
    body: {
        padding: "1.25rem",
        // padding: "{spacing.5}",
        gap: "0.5rem"
        // gap: "{spacing.2}"
    },
    caption: {
        gap: "0.5rem"
        // gap: "{spacing.2}"
    },
    title: {
        fontSize: "1.25rem",
        // fontSize: "{typography.fontSize.xl}",
        fontWeight: "500"
        // fontWeight: "{typography.fontWeight.medium}",
    },
    subtitle: {
        color: "{text.muted.color}"
        // color: "{colors.text.secondary}"
    }
} satisfies CardDesignTokens;
