<template>
    <div class="stats-card">
        <div class="stats-card__icon">
            <Icon :name="icon" size="24px" />
        </div>
        <div class="stats-card__content">
            <h3 class="stats-card__value">{{ value }}</h3>
            <p class="stats-card__label">{{ label }}</p>
            <div v-if="change" class="stats-card__change" :class="changeClass">
                <Icon :name="changeIcon" size="16px" />
                <span>{{ change }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface StatsCardProps {
    icon: string;
    value: string | number;
    label: string;
    change?: string;
    changeType?: 'positive' | 'negative';
}

const props = defineProps<StatsCardProps>();

const changeClass = computed(() => ({
    'stats-card__change--positive': props.changeType === 'positive',
    'stats-card__change--negative': props.changeType === 'negative',
}));

const changeIcon = computed(() => 
    props.changeType === 'positive' ? 'trending-up' : 'trending-down'
);
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.stats-card {
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        border-color: rgba(99, 102, 241, 0.3);
    }

    &__icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin-bottom: 16px;
    }

    &__value {
        font-size: 2rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin: 0 0 4px 0;
    }

    &__label {
        color: $text-medium-emphasis-color;
        font-size: 0.875rem;
        margin: 0 0 8px 0;
    }

    &__change {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.75rem;
        font-weight: 600;

        &--positive {
            color: $success;
        }

        &--negative {
            color: $danger;
        }
    }
}
</style>