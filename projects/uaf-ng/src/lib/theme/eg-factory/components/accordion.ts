import type { AccordionDesignTokens } from '@primeng/themes/types/accordion';

 export default {
    root: {
        transitionDuration: "{transition.duration}"
    },
    panel: {
        borderWidth: "1px",
        borderColor: "transparent"
    },
    
    header: {
        background: "{content.background}",
        hoverBackground: "{content.background}",
        activeBackground: "{content.background}",
        activeHoverBackground: "{content.background}",
        color: "{text.color}",
        hoverColor: "{text.color}",
        activeColor: "{text.color}",
        padding: "1.125rem",
        fontWeight: "600",
        focusRing: {
            width: "{focus.ring.width}",
            style: "{focus.ring.style}",
            color: "{focus.ring.color}",
            offset: "{focus.ring.offset}",
            shadow: "{focus.ring.shadow}"
        },
        toggleIcon: {
            color: "{text.muted.color}",
            hoverColor: "{text.color}",
            activeColor: "{text.color}",
            activeHoverColor: "{text.color}"
        }
    },
    
    content: {
        background: "{content.background}",
        color: "{content.color}",
        padding: "0 1.125rem 1.125rem 1.125rem"
    }
} satisfies AccordionDesignTokens;