<template>
    <div v-if="discount > 0" class="discount-badge" :class="badgeClass">
        <div class="discount-badge__content">
            <Icon name="zap" size="16px" />
            <span>%{{ discount }} İNDİRİM</span>
        </div>
        <div v-if="timeLeft" class="discount-badge__timer">
            <Icon name="clock" size="14px" />
            <span>{{ formatTimeLeft(timeLeft) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
interface DiscountBadgeProps {
    discount: number;
    timeLeft?: number; // seconds
    variant?: 'default' | 'hot' | 'limited';
}

const props = withDefaults(defineProps<DiscountBadgeProps>(), {
    variant: 'default'
});

const badgeClass = computed(() => ({
    [`discount-badge--${props.variant}`]: true,
    'discount-badge--animated': props.variant === 'hot'
}));

const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}s ${minutes}d`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.discount-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    border-radius: 12px;
    overflow: hidden;
    backdrop-filter: blur(10px);
    
    &--default {
        background: linear-gradient(135deg, $success 0%, #059669 100%);
    }
    
    &--hot {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        animation: pulse 2s infinite;
    }
    
    &--limited {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }

    &__content {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__timer {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 12px;
        background: rgba(0, 0, 0, 0.2);
        color: white;
        font-size: 0.625rem;
        font-weight: 600;
    }

    &--animated {
        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ef4444);
            background-size: 400% 400%;
            border-radius: 14px;
            z-index: -1;
            animation: gradient 3s ease infinite;
        }
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>