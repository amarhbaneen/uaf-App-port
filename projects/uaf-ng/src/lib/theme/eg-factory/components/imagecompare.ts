import type { ImageCompareDesignTokens } from '@primeng/themes/types/imagecompare';

 export default {
    handle: {
        size: "15px",
        hoverSize: "30px",
        background: "rgba(255,255,255,0.3)",
        hoverBackground: "rgba(255,255,255,0.3)",
        borderColor: "unset",
        hoverBorderColor: "unset",
        borderWidth: "0",
        borderRadius: "50%",
        transitionDuration: "{transition.duration}",
        focusRing: {
            width: "{focus.ring.width}",
            style: "{focus.ring.style}",
            color: "rgba(255,255,255,0.3)",
            offset: "{focus.ring.offset}",
            shadow: "{focus.ring.shadow}"
        }
    }
} satisfies ImageCompareDesignTokens;