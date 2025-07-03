import type { VirtualScrollerDesignTokens } from '@primeng/themes/types/virtualscroller';

 export default {
    loader: {
        mask: {
            background: "{content.background}",
            color: "{text.muted.color}"
        },
        icon: {
            size: "2rem"
        }
    }
} satisfies VirtualScrollerDesignTokens;