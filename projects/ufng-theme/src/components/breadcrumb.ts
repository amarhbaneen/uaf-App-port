import type { BreadcrumbDesignTokens } from '@primeng/themes/types/breadcrumb';

 export default {
    root: {
        padding: "1rem",
        background: "{content.background}",
        gap: "0.5rem",
        transitionDuration: "{transition.duration}"
    },
    item: {
        color: "{text.muted.color}",
        hoverColor: "{text.color}",
        borderRadius: "{content.border.radius}",
        gap: "{navigation.item.gap}",
        icon: {
            color: "{navigation.item.icon.color}",
            hoverColor: "{navigation.item.icon.focus.color}"
        },
        focusRing: {
            width: "{focus.ring.width}",
            style: "{focus.ring.style}",
            color: "{focus.ring.color}",
            offset: "{focus.ring.offset}",
            shadow: "{focus.ring.shadow}"
        }
    },
    separator: {
        color: "{navigation.item.icon.color}"
    }
} satisfies BreadcrumbDesignTokens;